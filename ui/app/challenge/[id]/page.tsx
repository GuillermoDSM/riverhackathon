'use client'

import * as React from 'react'
import { ArrowLeft, ArrowRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface ChallengeContentProps {
  type: 'text' | 'image' | 'video'
  content: string
}

export default function ChallengePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = React.useState(0)
  const totalPages = 5 // Example total pages

  const content = [
    { type: 'text', content: 'Welcome to the Water Quality Basics challenge...' },
    { type: 'image', content: '/images/challenges/water-quality-diagram.jpg' },
    { type: 'video', content: 'https://youtube.com/embed/example' },
    // Add more content pages
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex items-center justify-center">
        <ChallengeContent {...content[currentPage]} />
      </div>

      {/* Navigation */}
      <div className="border-t p-4">
        <div className="max-w-2xl mx-auto">
          <Progress value={(currentPage + 1) / totalPages * 100} className="mb-4" />
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
              disabled={currentPage === totalPages - 1}
            >
              Next
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
      return (
        <div className="aspect-video w-full max-w-2xl">
          <iframe
            src={content}
            className="w-full h-full rounded-lg"
            allowFullScreen
          />
        </div>
      )
    default:
      return null
  }
} 