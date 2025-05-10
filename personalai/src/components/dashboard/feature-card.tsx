"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

interface FeatureCardProps {
  children: ReactNode
  className?: string
  fullWidth?: boolean
}

export function FeatureCard({ children, className = "", fullWidth = false }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={fullWidth ? "w-full" : ""}
    >
      <Card className={`overflow-hidden backdrop-blur-lg bg-background/60 border-background/20 shadow-xl ${className}`}>
        {children}
      </Card>
    </motion.div>
  )
}
