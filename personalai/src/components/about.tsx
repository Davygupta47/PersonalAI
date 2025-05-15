"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Brain, Heart, Sparkles } from "lucide-react"
import AuroraBackground from "@/components/aurora-back"
import FloatingParticles from "@/components/floating-part"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const values = [
    {
      icon: <Brain className="h-8 w-8 text-indigo-400" />,
      title: "Intelligent",
      description: "Our AI continuously learns from interactions to provide increasingly personalized recommendations.",
    },
    {
      icon: <Heart className="h-8 w-8 text-pink-400" />,
      title: "Empathetic",
      description: "We've designed PersonalAI to understand emotional nuances and respond with genuine care.",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-purple-400" />,
      title: "Creative",
      description: "From playlist curation to outfit suggestions, our AI thinks outside the box to inspire you.",
    },
  ]

  return (
    <section ref={ref} className="relative z-20 bg-gray-900 py-24">
      <AuroraBackground />
              <FloatingParticles />
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">About PersonalAI</h2>
            <p className="mb-6 text-lg text-gray-100">
              PersonalAI was created with a simple mission: to help people live more balanced, fulfilling lives by
              providing personalized recommendations based on their emotional state.
            </p>
            <p className="mb-8 text-lg text-gray-100">
              Our team of AI researchers, psychologists, and lifestyle experts have combined their knowledge to create
              an assistant that truly understands you and adapts to your unique needs.
            </p>

            <div className="space-y-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                  className="flex items-start space-x-4"
                >
                  <div className="rounded-lg bg-gray-800 p-2">{value.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{value.title}</h3>
                    <p className="text-gray-100">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative h-[500px] w-full overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20" />

              <div className="absolute left-0 top-0 h-full w-full">
                <div className="grid h-full grid-cols-2 gap-4 p-6">
                  <div className="space-y-4">
                    <div className="overflow-hidden rounded-lg bg-gray-800/80 p-4 backdrop-blur-sm">
                      <h4 className="mb-2 font-medium text-pink-300">Feeling down today</h4>
                      <p className="text-sm text-gray-300">
                        I&apos;ve noticed you seem a bit low. How about some uplifting music?
                      </p>
                    </div>
                    <div className="overflow-hidden rounded-lg bg-gray-800/80 p-4 backdrop-blur-sm">
                      <h4 className="mb-2 font-medium text-purple-300">Music for your mood</h4>
                      <p className="text-sm text-gray-300">
                        Here&apos;s a playlist to boost your energy and lift your spirits
                      </p>
                    </div>
                    <div className="overflow-hidden rounded-lg bg-gray-800/80 p-4 backdrop-blur-sm">
                      <h4 className="mb-2 font-medium text-indigo-300">Book recommendation</h4>
                      <p className="text-sm text-gray-300">&quot;The Midnight Library&quot; might resonate with you right now</p>
                    </div>
                  </div>
                  <div className="mt-8 space-y-4">
                    <div className="overflow-hidden rounded-lg bg-gray-800/80 p-4 backdrop-blur-sm">
                      <h4 className="mb-2 font-medium text-indigo-300">Movie recommendation</h4>
                      <p className="text-sm text-gray-300">Yours daily pick for a good movie.
                      </p>
                    </div>
                    <div className="overflow-hidden rounded-lg bg-gray-800/80 p-4 backdrop-blur-sm">
                      <h4 className="mb-2 font-medium text-pink-300">Daily routine</h4>
                      <p className="text-sm text-gray-300">I&apos;ve adjusted your schedule to include a morning walk</p>
                    </div>
                    <div className="overflow-hidden rounded-lg bg-gray-800/80 p-4 backdrop-blur-sm">
                      <h4 className="mb-2 font-medium text-purple-300">Mood tracker</h4>
                      <p className="text-sm text-gray-300">Your mood has been improving over the past week!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
