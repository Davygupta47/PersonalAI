"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
//import { ThemeToggle } from "@/components/mode=toggle"
import { ChatbotCard } from "@/components/dashboard/chatbot-card"
import { MoodDetectorCard } from "@/components/dashboard/mood-detector-card"
import { MusicRecommenderCard } from "@/components/dashboard/music-recommender-card"
import  BookRecommenderCard  from "@/components/dashboard/book-recommender-card"
import { FeatureCard } from "@/components/dashboard/fashion-try-on-card"
import  RoutineGenerator from "@/components/dashboard/daily-scheduler-card"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background/80 to-background px-4 py-6 md:px-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight md:text-4xl"
          >
            PersonalAI Dashboard
          </motion.h1>
          {/* <div className="self-end sm:self-auto">
            <ThemeToggle />
          </div> */}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-7">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="mood">Mood</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="fashion">Fashion</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          {/* All Tabs */}
          <TabsContent value="all">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ChatbotCard />
              <MoodDetectorCard />
              <MusicRecommenderCard />
              <BookRecommenderCard />
              <FeatureCard>
                <div>Fashion Try-On Feature</div>
              </FeatureCard>
              <RoutineGenerator />
            </div>
          </TabsContent>

          {/* Individual Tabs */}
          <TabsContent value="chat">
            <div className="grid grid-cols-1">
              <ChatbotCard fullWidth />
            </div>
          </TabsContent>

          <TabsContent value="mood">
            <div className="grid grid-cols-1">
              <MoodDetectorCard fullWidth />
            </div>
          </TabsContent>

          <TabsContent value="music">
            <div className="grid grid-cols-1">
              <MusicRecommenderCard fullWidth />
            </div>
          </TabsContent>

          <TabsContent value="books">
            <div className="grid grid-cols-1">
              <BookRecommenderCard />
            </div>
          </TabsContent>

          <TabsContent value="fashion">
            <div className="grid grid-cols-1">
              <FeatureCard>
                <div>Fashion Try-On Feature</div>
              </FeatureCard>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <div className="grid grid-cols-1">
              <RoutineGenerator/>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
