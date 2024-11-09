'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function NotificationsContent() {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No new notifications</p>
        </CardContent>
      </Card>
    </div>
  )
} 