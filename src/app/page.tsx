'use client'

import * as React from 'react'
import { Bell, Book, Home } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProtectedLayout from '../components/ProtectedLayout'
import { UserProfile } from '../components/UserProfile'
import { DesktopHomeContent } from "@/components/DesktopHomeContent"
import { ChallengesContent } from "@/components/ChallengesContent"
import { NotificationsContent } from "@/components/NotificationsContent"

export default function Component() {
  return (
    <ProtectedLayout>
      <div className="bg-background min-h-screen">
        <div className="p-4 flex items-center gap-4 border-b">
          <UserProfile />
        </div>
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
    </ProtectedLayout>
  )
}