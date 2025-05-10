"use client"

import { useState } from "react"
import { Smile, Frown, Meh, ThumbsUp } from "lucide-react"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FeatureCard } from "./feature-card"

interface MoodDetectorCardProps {
  fullWidth?: boolean
}

export function MoodDetectorCard({ fullWidth = false }: MoodDetectorCardProps) {
  const [text, setText] = useState("")
  const [mood, setMood] = useState<string | null>(null)

  const detectMood = () => {
    if (!text.trim()) return

    // Simple mock mood detection
    const lowerText = text.toLowerCase()
    if (lowerText.includes("happy") || lowerText.includes("great") || lowerText.includes("good")) {
      setMood("positive")
    } else if (lowerText.includes("sad") || lowerText.includes("bad") || lowerText.includes("upset")) {
      setMood("negative")
    } else {
      setMood("neutral")
    }
  }

  return (
    <FeatureCard fullWidth={fullWidth} className={fullWidth ? "h-[70vh]" : "h-[400px]"}>
      <CardHeader className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 pb-2">
        <CardTitle className="text-xl">Mood & Personality Detector</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <Textarea
          placeholder="How are you feeling today? Write a few sentences about your day..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="h-32 resize-none"
        />

        {mood && (
          <div className="mt-4 flex items-center justify-center">
            <div className="flex flex-col items-center rounded-lg bg-card p-4 shadow-sm">
              <div className="mb-2 text-lg font-medium">Your mood seems:</div>
              <div className="flex items-center justify-center gap-2">
                {mood === "positive" && <Smile className="h-12 w-12 text-green-500" />}
                {mood === "negative" && <Frown className="h-12 w-12 text-red-500" />}
                {mood === "neutral" && <Meh className="h-12 w-12 text-yellow-500" />}
                <span className="text-xl font-semibold capitalize">{mood}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t bg-card/50">
        <Button onClick={detectMood} className="w-full" disabled={!text.trim()}>
          <ThumbsUp className="mr-2 h-4 w-4" />
          Analyze Mood
        </Button>
      </CardFooter>
    </FeatureCard>
  )
}
