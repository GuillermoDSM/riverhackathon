'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Filter, MapPin, Heart, Award } from "lucide-react"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ChallengeCardProps {
  id: number
  title: string
  description: string
  reward: number
  participants: number
  image: string
}

export function ChallengesContent() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Challenges & Courses</h2>
        <div className="w-full md:w-auto">
          <Input placeholder="Search challenges..." className="w-full md:w-64" />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          All
        </Button>
        <Button variant="outline" size="sm">
          <MapPin className="mr-2 h-4 w-4" />
          Near You
        </Button>
        <Button variant="outline" size="sm">
          <Heart className="mr-2 h-4 w-4" />
          Liked
        </Button>
        <Button variant="outline" size="sm">
          <Award className="mr-2 h-4 w-4" />
          Most Rewarded
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} {...challenge} />
        ))}
      </div>
    </div>
  )
}

function ChallengeCard({ id, title, description, reward, participants, image }: ChallengeCardProps) {
  const router = useRouter()
  
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <Image 
          src={image} 
          alt={title} 
          fill
          className="object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
          {reward} XP
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <div className="w-full h-full rounded-full bg-primary/10" />
            </Avatar>
            <span className="text-sm text-muted-foreground">{participants} participants</span>
          </div>
          <Button size="sm" onClick={() => router.push(`/challenge/${id}`)}>
            Start Challenge
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const challenges = [
  {
    id: 1,
    title: "Water Quality Basics",
    description: "Learn the fundamentals of water quality monitoring and analysis.",
    reward: 100,
    participants: 1234,
    image: "/images/challenges/water-quality-basics.png",
  },
  
  {
    id: 2,
    title: "Community Outreach Program",
    description: "Learn how to engage local communities in water quality initiatives.",
    reward: 500,
    participants: 543,
    image: "/images/challenges/community-outreach.jpg",
  },
  
] 