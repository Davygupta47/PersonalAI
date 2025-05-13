"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Aurora Background Component
function AuroraBackground() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      <div className="absolute -inset-[100px] opacity-50">
        <div className="absolute top-1/2 left-0 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-indigo-500 blur-[120px] sm:blur-[150px]" />
        <div className="absolute top-0 right-1/4 h-[400px] w-[700px] rounded-full bg-purple-500 blur-[120px] sm:blur-[150px]" />
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-pink-500 blur-[120px] sm:blur-[150px]" />
      </div>
    </motion.div>
  )
}

// Floating Particles Component
function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    const particles: {
      x: number
      y: number
      radius: number
      color: string
      speedX: number
      speedY: number
    }[] = []

    const colors = ["#4f46e5", "#8b5cf6", "#ec4899", "#f472b6"]

    for (let i = 0; i < 20; i++) {
      const radius = Math.random() * 20 + 10
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      })
    }

    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = "lighter"
      ctx.globalAlpha = 0.4

      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.canvas
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.3 }}
      ref={canvasRef}
      className="absolute inset-0 z-10"
    />
  )
}

// Main Home Component
export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-900">
      <AuroraBackground />
      <FloatingParticles />

      <div className="z-20 flex flex-col items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ willChange: "opacity, transform" }}
          className="mb-4 text-5xl font-extrabold tracking-tight text-white md:text-7xl"
        >
          PersonalAI
          <span className="block text-3xl font-bold text-pink-300 md:text-4xl">
            Your Smart Lifestyle Companion
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ willChange: "opacity, transform" }}
          className="mb-8 max-w-2xl text-xl text-white/80 drop-shadow-md"
        >
          Talk. Feel. Plan. Dress. Listen. All in one.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ willChange: "transform, opacity" }}
        >
          <Link href="/dashboard">
            <Button className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-lg font-bold text-white shadow-lg transition-all hover:shadow-pink-500/20">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
