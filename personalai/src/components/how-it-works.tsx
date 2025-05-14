"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MessageSquare, Music, BookOpen, ShoppingBag, Calendar } from "lucide-react"
import AuroraBackground from "@/components/aurora-back"
import FloatingParticles from "@/components/floating-part"

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-indigo-400" />,
      title: "Mood Detection",
      description:
        "Our AI analyzes your conversations to understand your emotional state and provide personalized recommendations.",
    },
    {
      icon: <Music className="h-10 w-10 text-purple-400" />,
      title: "Music Recommendations",
      description: "Get Spotify playlists curated to match your current mood and help you feel your best.",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-pink-400" />,
      title: "Book Suggestions",
      description: "Discover reading material that resonates with how you're feeling or helps shift your perspective.",
    },
    {
      icon: <ShoppingBag className="h-10 w-10 text-indigo-400" />,
      title: "Style Recommendations",
      description: "Receive clothing suggestions that complement your mood and help you express yourself.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-purple-400" />,
      title: "Personalized Routines",
      description:
        "Get AI-generated daily schedules optimized for your school or work commitments and current emotional state.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
      },
    },
  }

  return (
    <section ref={ref} className="relative z-20 bg-gray-900 py-24">
      <AuroraBackground />
      <FloatingParticles />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">How It Works</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            PersonalAI uses advanced machine learning to understand you better and enhance your daily life.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="rounded-xl border border-gray-800 bg-gray-800/50 p-6 backdrop-blur-sm transition-all hover:border-purple-500/30 hover:bg-gray-800/70"
            >
              <div className="mb-4 rounded-full bg-gray-700/50 p-3 w-fit">{feature.icon}</div>
              <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-gray-800/30 p-1 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
            <div className="relative rounded-lg bg-gray-900/80 p-6 sm:p-8">
              <h3 className="mb-4 text-center text-2xl font-bold text-white">Powered by Gemini AI</h3>
              <p className="text-center text-gray-400">
                Our platform leverages Google&apos;s Gemini AI to provide intelligent, context-aware recommendations that
                adapt to your unique personality and preferences over time.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
