"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import LoginModal from "@/components/login"
import SignupModal from "@/components/signup"
import HowItWorks from "@/components/how-it-works"
import About from "@/components/about"
import AuroraBackground from "@/components/aurora-back"
import FloatingParticles from "@/components/floating-part"
import Image from 'next/image';



// Main Home Component
export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative bg-gray-900">
      
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        <AuroraBackground />
        <FloatingParticles />

        <div className="z-20 flex flex-col items-center justify-center px-4 text-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={200}
            className="bg-white rounded-xl p-2 shadow-lg"
          />

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ willChange: "opacity, transform" }}
            className="mb-4 text-5xl font-extrabold tracking-tight text-green-400 md:text-7xl"
          >
            DailyMate
            <span className="block text-3xl font-bold text-pink-300 md:text-4xl">Your Smart Lifestyle Companion</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ willChange: "opacity, transform" }}
            className="mb-8 max-w-2xl text-xl text-white/80 drop-shadow-md"
          >
            Talk. Feel. Watch. Plan. Listen. All in one.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ willChange: "transform, opacity" }}
            >
              <Link href="/dashboard">
                <Button className="w-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 text-lg font-bold text-white shadow-lg transition-all hover:shadow-pink-500/20 sm:w-auto">
                  Get Started
                </Button>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ willChange: "transform, opacity" }}
            >
              <Button
                variant="outline"
                onClick={() => setShowLoginModal(true)}
                className="w-full rounded-full border-purple-400 px-8 text-lg font-bold text-purple-300 backdrop-blur-sm hover:bg-purple-500/10 sm:w-auto"
              >
                Login
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ willChange: "transform, opacity" }}
            >
              <Button
                variant="outline"
                onClick={() => setShowSignupModal(true)}
                className="w-full rounded-full border-pink-400 px-8 text-lg font-bold text-pink-300 backdrop-blur-sm hover:bg-pink-500/10 sm:w-auto"
              >
                Sign Up
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <HowItWorks />
      <About />

      <AnimatePresence>{showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}</AnimatePresence>

      <AnimatePresence>{showSignupModal && <SignupModal onClose={() => setShowSignupModal(false)} />}</AnimatePresence>
    </div>
  )
}
