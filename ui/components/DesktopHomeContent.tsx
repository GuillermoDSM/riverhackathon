'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"

export function DesktopHomeContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Daily Goals</span>
                <span>75%</span>
              </div>
              <Progress value={75} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Weekly Goals</span>
                <span>45%</span>
              </div>
              <Progress value={45} />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Top Contributors</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            {topUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-4 mb-4">
                <Avatar>
                  <div className="size-full rounded-full bg-gradient-to-br from-primary/50 to-primary/30" />
                </Avatar>
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">Level {user.level} • {user.xp} XP</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

const topUsers = [
  { id: 1, name: "Emma Johnson", level: 8, xp: 2345 },
  { id: 2, name: "Liam Wilson", level: 7, xp: 2210 },
  { id: 3, name: "Olivia Davis", level: 7, xp: 2150 },
  { id: 4, name: "Noah Martinez", level: 6, xp: 1980 },
  { id: 5, name: "Ava Taylor", level: 6, xp: 1875 }
] 