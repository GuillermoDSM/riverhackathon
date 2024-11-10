'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar } from "@/components/ui/avatar"
import { Trophy, Wrench, TrendingUp } from "lucide-react"

export function DesktopHomeContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="space-y-6">
        <CurrentProgress />
        <Achievements />
      </div>
      <div className="space-y-6">
        <WeeklyRanking />
      </div>
    </div>
  )
}

function CurrentProgress() {
  return (
    <div className="p-4 border rounded-lg mb-6">
      <h3 className="font-semibold mb-2">Current Challenge: Water Quality Basics</h3>
      <p className="text-sm text-muted-foreground mb-4">Track your progress in the current challenge.</p>
      <Progress value={50} className="h-2" />
      <p className="text-sm text-muted-foreground mt-2">50% Complete</p>
    </div>
  )
}



function Achievements() {
  return (
    <div className="p-4 border rounded-lg">
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
          Weekly XP Ranking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topUsers.map((user, index) => (
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

const topUsers = [
  { id: 1, name: "Emma Johnson", level: 8, xp: 2345 },
  { id: 2, name: "Liam Wilson", level: 7, xp: 2210 },
  { id: 3, name: "Olivia Davis", level: 7, xp: 2150 },
  { id: 4, name: "Noah Martinez", level: 6, xp: 1980 },
  { id: 5, name: "Ava Taylor", level: 6, xp: 1875 }
] 