'use client'

import * as React from 'react'
import { Bell, Book, Home, Timer, Trophy, Wrench, MapPin, Heart, Award, Filter, TrendingUp, Star, Zap, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import Auth from "../components/Auth";
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ChallengeCardProps {
  title: string
  description: string
  reward: number
  participants: number
  image: string
}

interface NotificationItemProps {
  id: number
  type: 'xp' | 'badge' | 'achievement' | 'challenge'
  title: string
  description: string
  time: string
  icon: React.ElementType
}

export default function Component() {
  return (
    <div className="bg-background min-h-screen">
      <div>
      <Auth />
    </div>
      {/* Profile Header */}
      <div className="p-4 flex items-center gap-4 border-b">
        <Avatar className="h-12 w-12">
          <div className="size-full rounded-full bg-gradient-to-br from-primary/50 to-primary/30" />
        </Avatar>
        <div>
          <h2 className="font-semibold">Carlos Hernández</h2>
          <p className="text-sm text-muted-foreground">Level 4: 1343 XP</p>
        </div>
      </div>

      {/* Desktop Tabs */}
      <Tabs defaultValue="home" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          <DesktopHomeContent />
        </TabsContent>
        <TabsContent value="challenges">
          <ChallengesContent />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationsContent />
        </TabsContent>
      </Tabs>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around p-3 md:hidden">
        <button className="flex flex-col items-center gap-1">
          <Home className="size-5" />
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <Book className="size-5" />
          <span className="text-xs">Challenges</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <Bell className="size-5" />
          <span className="text-xs">Notifications</span>
        </button>
      </div>
    </div>
  )
}

function DesktopHomeContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div>
        <CurrentProgress />
        <Achievements />
      </div>
      <div>
        <WeeklyRanking />
      </div>
    </div>
  )
}

function CurrentProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Current Challenge: Water Quality Basics</CardTitle>
        <p className="text-sm text-muted-foreground">Track your progress in the current challenge.</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm">
          <Timer className="size-4" />
          <span>50% Complete</span>
        </div>
        <div className="mt-2">
          <Progress value={50} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}

function Achievements() {
  return (
    <div className="p-4 border rounded-lg mb-6">
      <h3 className="font-semibold mb-3">Your Achievements</h3>
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-1">
          <div className="size-16 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">115 x 115</span>
          </div>
          <span className="text-xs">Basic</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="size-16 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
            <Trophy className="size-8 text-amber-600 dark:text-amber-400" />
          </div>
          <span className="text-xs">Advanced</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="size-16 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
            <Wrench className="size-8 text-green-600 dark:text-green-400" />
          </div>
          <span className="text-xs">First Timer</span>
        </div>
      </div>
    </div>
  )
}

function WeeklyRanking() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="size-5" />
          Top 5 Weekly XP Ranking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topUsers.slice(0, 5).map((user, index) => (
            <div key={user.id} className="flex items-center gap-3">
              <div className="font-semibold text-muted-foreground w-5">{index + 1}</div>
              <Avatar className="h-8 w-8">
                <div className="w-full h-full rounded-full bg-primary/10" />
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-muted-foreground">Level {user.level}</div>
              </div>
              <div className="font-semibold text-primary">{user.xp} XP</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ChallengesContent() {
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

function NotificationsContent() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} {...notification} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

function NotificationItem({ type, title, description, time, icon: Icon }: NotificationItemProps) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border bg-card text-card-foreground">
      <div className={`rounded-full p-2 ${getNotificationColor(type)}`}>
        <Icon className="h-4 w-4 text-white" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  )
}

function getNotificationColor(type: NotificationItemProps['type']) {
  switch (type) {
    case 'xp':
      return 'bg-green-500'
    case 'badge':
      return 'bg-blue-500'
    case 'achievement':
      return 'bg-purple-500'
    case 'challenge':
      return 'bg-orange-500'
    default:
      return 'bg-gray-500'
  }
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
    reward: 300,
    participants: 543,
    image: "/images/challenges/community-outreach.jpg",
  },
 
]

const topUsers = [
  { id: 1, name: "Emma Johnson", level: 8, xp: 2345, avatar: "/placeholder.svg?height=32&width=32" },
  { id: 2, name: "Liam Wilson", level: 7, xp: 2210, avatar: "/placeholder.svg?height=32&width=32" },
  { id: 3, name: "Olivia Davis", level: 7, xp: 2150, avatar: "/placeholder.svg?height=32&width=32" },
  { id: 4, name: "Noah Martinez", level: 6, xp: 1980, avatar: "/placeholder.svg?height=32&width=32" },
  { id: 5, name: "Ava Taylor", level: 6, xp: 1875, avatar: "/placeholder.svg?height=32&width=32" },
  { id: 6, name: "Ethan Brown", level: 5, xp: 1760, avatar: "/placeholder.svg?height=32&width=32" },
  { id: 7, name: "Sophia Anderson", level: 5, xp: 1690, avatar: "/placeholder.svg?height=32&width=32" },
  { id: 8, name: "Mason Thomas", level: 5, xp: 1620, avatar: "/placeholder.svg?height=32&width=32" },
  { id: 9, name: "Isabella White", level: 4, xp: 1550, avatar: "/placeholder.svg?height=32&width=32" },
  { id: 10, name: "William Lee", level: 4, xp: 1490, avatar: "/placeholder.svg?height=32&width=32" },
]

const notifications: NotificationItemProps[] = [
  {
    id: 1,
    type: 'xp',
    title: 'XP Gained',
    description: 'You earned 100 XP for completing the Water Quality Basics challenge!',
    time: '2 hours ago',
    icon: Zap,
  },
  {
    id: 2,
    type: 'badge',
    title: 'New Badge Unlocked',
    description: 'Congratulations! You\'ve earned the "Water Warrior" badge.',
    time: '1 day ago',
    icon: Award,
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Weekly Achievement',
    description: 'You\'ve completed 5 challenges this week. Keep up the great work!',
    time: '3 days ago',
    icon: Trophy,
  },
  {
    id: 4,
    type: 'challenge',
    title: 'New Challenge Available',
    description: 'The "Advanced Water Treatment" challenge is now open for participation.',
    time: '4 days ago',
    icon: Target,
  },
  {
    id: 5,
    type: 'xp',
    title: 'Level Up!',
    description: 'Congratulations! You\'ve reached Level 5. New challenges await!',
    time: '1 week ago',
    icon: Star,
  },
]