'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Filter, Bell, Clock, Star } from "lucide-react"

export function NotificationsContent() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Notifications</h2>
        <div className="w-full md:w-auto">
          <Input placeholder="Search notifications..." className="w-full md:w-64" />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          All
        </Button>
        <Button variant="outline" size="sm">
          <Bell className="mr-2 h-4 w-4" />
          Unread
        </Button>
        <Button variant="outline" size="sm">
          <Clock className="mr-2 h-4 w-4" />
          Recent
        </Button>
        <Button variant="outline" size="sm">
          <Star className="mr-2 h-4 w-4" />
          Important
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id}>
            <CardContent className="p-4 flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-medium">{notification.title}</h3>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </div>
              {notification.unread && (
                <Badge variant="default" className="bg-primary text-primary-foreground">
                  New
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

const notifications = [
  {
    id: 1,
    title: "Challenge Completed",
    message: "You've successfully completed Water Quality Basics!",
    time: "2 hours ago",
    unread: true
  },
  {
    id: 2,
    title: "New Achievement",
    message: "You've earned the 'First Timer' badge",
    time: "5 hours ago",
    unread: true
  },
  {
    id: 3,
    title: "Weekly Progress",
    message: "You're in the top 10% this week!",
    time: "1 day ago",
    unread: false
  }
] 