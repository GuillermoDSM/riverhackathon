'use client'

import * as React from 'react'
import { ArrowLeft, ArrowRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// Mock challenges data
const challenges = [
  {
    id: 1,
    title: "Water Quality Basics",
    description: "Learn the fundamentals of water quality testing",
    content: [
      {
        type: "text" as const,
        content: "Welcome to Water Quality Basics. In this challenge, you'll learn how to test water quality effectively."
      },
      {
        type: "image" as const,
        content: "/images/water-testing.jpg"
      },
      {
        type: "text" as const,
        content: "Congratulations! You've successfully completed the Water Quality Basics challenge. You've learned valuable skills in water quality testing and analysis."
      },
      {
        type: "button" as const,
        content: "Mint Achievement NFT"
      }
    ]
  },
  {
    id: 2,
    title: "Community Challenge",
    description: "Learn the fundamentals of water quality testing",
    content: [
      {
        type: "text" as const,
        content: "Welcome to Water Quality Basics. In this challenge, you'll learn how to test water quality effectively."
      },
      {
        type: "video" as const,
        content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" // Replace with your actual YouTube video URL
      },
      {
        type: "text" as const,
        content: "Congratulations! You've successfully completed the Water Quality Basics challenge. You've learned valuable skills in water quality testing and analysis."
      },
      {
        type: "button" as const,
        content: "Mint Achievement NFT"
      }
    ]
  },
  // Add more challenges as needed
]

interface Challenge {
  id: number
  title: string
  description: string
  content: {
    type: 'text' | 'image' | 'video' | 'button'
    content: string
  }[]
}

export default function ChallengePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = React.useState(0)
  const [challenge, setChallenge] = React.useState<Challenge | null>(null)

  React.useEffect(() => {
    const challengeData = challenges.find(c => c.id === parseInt(params.id))
    if (!challengeData) {
      console.warn(`Challenge with id ${params.id} not found`)
      router.push('/challenges') // Redirect to challenges page if not found
      return
    }
    setChallenge(challengeData)
  }, [params.id, router])

  if (!challenge) return null

  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b p-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Challenges
        </Button>
        <h1 className="text-2xl font-bold mt-2">{challenge.title}</h1>
      </div>

      <div className="flex-1 p-6 flex items-center justify-center">
        <ChallengeContent {...challenge.content[currentPage]} />
      </div>

      <div className="border-t p-4">
        <div className="max-w-2xl mx-auto">
          <Progress 
            value={(currentPage + 1) / challenge.content.length * 100} 
            className="mb-4" 
          />
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === challenge.content.length - 1}
            >
              {currentPage === challenge.content.length - 2 ? 'Complete' : 'Next'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChallengeContent({ type, content }: ChallengeContentProps) {
  switch (type) {
    case 'text':
      return <div className="prose max-w-2xl">{content}</div>
    case 'image':
      return (
        <Image 
          src={content} 
          alt="Challenge content"
          width={672}
          height={378}
          className="max-w-2xl rounded-lg"
        />
      )
    case 'video':
      const videoId = content.split('v=')[1]
      const embedUrl = `https://www.youtube.com/embed/${videoId}`
      return (
        <div className="aspect-video w-full max-w-2xl">
          <iframe
            src={embedUrl}
            className="w-full h-full rounded-lg"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      )
    case 'button':
      return (
        <Button 
          size="lg" 
          className="mt-4"
          onClick={() => console.log('Minting NFT...')}
        >
          {content}
        </Button>
      )
    default:
      return null
  }
} 