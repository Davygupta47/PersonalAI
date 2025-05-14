"use client"
import { motion } from "framer-motion"
import React from "react"

 export default function AuroraBackground() {
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