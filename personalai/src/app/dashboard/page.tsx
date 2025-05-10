"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModeToggle } from "@/components/mode-toggle"
import { ChatbotCard } from "@/components/dashboard/chatbot-card"
import { MoodDetectorCard } from "@/components/dashboard/mood-detector-card"
import { MusicRecommenderCard } from "@/components/dashboard/music-recommender-card"
import { BookRecommenderCard } from "@/components/dashboard/book-recommender-card"
import { FashionTryOnCard } from "@/components/dashboard/fashion-try-on-card"
import { DailySchedulerCard } from "@/components/dashboard/daily-scheduler-card"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background/80 to-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold tracking-tight md:text-4xl"
          >
            PersonalAI Dashboard
          </motion.h1>
          <ModeToggle />
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-7">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="mood">Mood</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="fashion">Fashion</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ChatbotCard />
              <MoodDetectorCard />
              <MusicRecommenderCard />
              <BookRecommenderCard />
              <FashionTryOnCard />
              <DailySchedulerCard />
            </div>
          </TabsContent>

          <TabsContent value="chat" className="mt-6">
            <ChatbotCard fullWidth />
          </TabsContent>

          <TabsContent value="mood" className="mt-6">
            <MoodDetectorCard fullWidth />
          </TabsContent>

          <TabsContent value="music" className="mt-6">
            <MusicRecommenderCard fullWidth />
          </TabsContent>

          <TabsContent value="books" className="mt-6">
            <BookRecommenderCard fullWidth />
          </TabsContent>

          <TabsContent value="fashion" className="mt-6">
            <FashionTryOnCard fullWidth />
          </TabsContent>

          <TabsContent value="schedule" className="mt-6">
            <DailySchedulerCard fullWidth />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}