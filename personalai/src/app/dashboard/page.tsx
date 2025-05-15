"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
// import BallPits from "@/components/ui/ball-pits-background"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatbotCard } from "@/components/dashboard/chatbot-card"
import { MoodDetectorCard } from "@/components/dashboard/mood-detector-card"
import  MusicRecommenderCard  from "@/components/dashboard/music-recommender-card"
import BookRecommenderCard from "@/components/dashboard/book-recommender-card"
import MovieRecommenderCard from "@/components/dashboard/movie-card"
import RoutineGenerator from "@/components/dashboard/daily-scheduler-card"
import AuroraBackground from "@/components/aurora-back"

export default function Dashboard() {
  const [, setActiveTab] = useState("all")
  const [, setScrolled] = useState(false)

  // Handle scroll effect for the "all" tab
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Aurora Background */}
      {/* <BallPits ballCount={60} ballSize={15} /> */}
      {/* Floating Particles */}
      <AuroraBackground></AuroraBackground>

      <div className="relative z-10 px-4 py-6 md:px-8">
        <div className="mx-auto w-full max-w-7xl space-y-8">
          {/* Header with floating effect */}
          <motion.div
            className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-3xl font-bold tracking-tight md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
              animate={{
                scale: [1, 1.02, 1],
                filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              Dashboard
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="self-end sm:self-auto"
            >
              {/* Theme toggle placeholder */}
            </motion.div>
          </motion.div>

          {/* Tabs with glow effect */}
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TabsList className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-7 bg-background/50 backdrop-blur-sm border border-purple-500/20 shadow-lg">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="chat"
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300"
                >
                  Chat
                </TabsTrigger>
                <TabsTrigger
                  value="mood"
                  className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-700 dark:data-[state=active]:text-pink-300"
                >
                  Mood
                </TabsTrigger>
                <TabsTrigger
                  value="music"
                  className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-700 dark:data-[state=active]:text-green-300"
                >
                  Music
                </TabsTrigger>
                <TabsTrigger
                  value="books"
                  className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-700 dark:data-[state=active]:text-amber-300"
                >
                  Books
                </TabsTrigger>
                <TabsTrigger
                  value="movies"
                  className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-700 dark:data-[state=active]:text-red-300"
                >
                  Movies
                </TabsTrigger>
                <TabsTrigger
                  value="schedule"
                  className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-700 dark:data-[state=active]:text-cyan-300"
                >
                  Schedule
                </TabsTrigger>
              </TabsList>
            </motion.div>

            {/* All Tabs with scroll sections */}
            <AnimatePresence mode="wait">
              <TabsContent value="all" className="space-y-16 pb-20">
                {/* Chat Section */}
                <motion.section
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-400">Chat Assistant</h2>
                  <div className="grid grid-cols-1">
                    <ChatbotCard />
                  </div>
                </motion.section>

                {/* Mood Section */}
                <motion.section
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-semibold text-pink-600 dark:text-pink-400">Mood Analysis</h2>
                  <div className="grid grid-cols-1">
                    <MoodDetectorCard />
                  </div>
                </motion.section>

                {/* Music Section */}
                <motion.section
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400">Music Recommendations</h2>
                  <div className="grid grid-cols-1">
                    <MusicRecommenderCard />
                  </div>
                </motion.section>

                {/* Books Section */}
                <motion.section
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400">Book Recommendations</h2>
                  <div className="grid grid-cols-1">
                    <BookRecommenderCard />
                  </div>
                </motion.section>

                {/* Movies Section (Replaced Fashion) */}
                <motion.section
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400">Movie Recommendations</h2>
                  <div className="grid grid-cols-1">
                    <MovieRecommenderCard />
                  </div>
                </motion.section>

                {/* Schedule Section */}
                <motion.section
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-semibold text-cyan-600 dark:text-cyan-400">Daily Schedule</h2>
                  <div className="grid grid-cols-1">
                    <RoutineGenerator />
                  </div>
                </motion.section>
              </TabsContent>
            </AnimatePresence>

            {/* Individual Tabs */}
            <TabsContent value="chat">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1"
              >
                <ChatbotCard fullWidth />
              </motion.div>
            </TabsContent>

            <TabsContent value="mood">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1"
              >
                <MoodDetectorCard fullWidth />
              </motion.div>
            </TabsContent>

            <TabsContent value="music">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1"
              >
                <MusicRecommenderCard/>
              </motion.div>
            </TabsContent>

            <TabsContent value="books">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1"
              >
                <BookRecommenderCard />
              </motion.div>
            </TabsContent>

            <TabsContent value="movies">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1"
              >
                <MovieRecommenderCard fullWidth />
              </motion.div>
            </TabsContent>

            <TabsContent value="schedule">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1"
              >
                <RoutineGenerator/>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
