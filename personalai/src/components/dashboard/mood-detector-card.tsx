"use client"

import { useState } from "react"
import { Smile, Frown, Meh, Angry, Laugh } from "lucide-react"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FeatureCard } from "./feature-card"

interface MoodDetectorCardProps {
  fullWidth?: boolean
}

const moodIcons = {
  happy: <Laugh className="h-12 w-12 text-green-500" />,
  sad: <Frown className="h-12 w-12 text-blue-500" />,
  angry: <Angry className="h-12 w-12 text-red-500" />,
  neutral: <Meh className="h-12 w-12 text-yellow-500" />,
  excited: <Smile className="h-12 w-12 text-purple-500" />
}

export function MoodDetectorCard({ fullWidth = false }: MoodDetectorCardProps) {
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: ""
  })
  const [mood, setMood] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAnswers(prev => ({ ...prev, [name]: value }))
    setError(null) // Clear error when user types
  }

  const detectMood = async () => {
    if (!Object.values(answers).some(answer => answer.trim())) {
      setError("Please answer at least one question")
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:5000/analyze-mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: "current_user",
          responses: answers
        })
      })

      if (!response.ok) throw new Error('Analysis failed')

      const data = await response.json()
      setMood(data.mood.toLowerCase())
    } catch (error) {
      setError("Could not analyze mood. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FeatureCard fullWidth={fullWidth} className={fullWidth ? "h-[70vh]" : "h-[500px]"}>
      <CardHeader className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 pb-2">
        <CardTitle className="text-xl">Mood Detector</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div className="space-y-3">
          <div>
            <label htmlFor="q1" className="block text-sm font-medium mb-1">
              1. How are you feeling today?
            </label>
            <Input
              id="q1"
              name="q1"
              placeholder="I feel..."
              value={answers.q1}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="q2" className="block text-sm font-medium mb-1">
              2. What do you plan to do today?
            </label>
            <Input
              id="q2"
              name="q2"
              placeholder="Today I will..."
              value={answers.q2}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="q3" className="block text-sm font-medium mb-1">
              3. How&apos;s the weather?
            </label>
            <Input
              id="q3"
              name="q3"
              placeholder="The weather is..."
              value={answers.q3}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="q4" className="block text-sm font-medium mb-1">
              4. Are you full of energy?
            </label>
            <Input
              id="q4"
              name="q4"
              placeholder="My energy level is..."
              value={answers.q4}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center mt-2">
            {error}
          </div>
        )}

        {mood && (
          <div className="mt-4 flex items-center justify-center">
            <div className="flex flex-col items-center rounded-lg bg-card p-4 shadow-sm">
              <div className="mb-2 text-lg font-medium">Your mood is:</div>
              <div className="flex items-center justify-center gap-2">
                {moodIcons[mood as keyof typeof moodIcons]}
                <span className="text-xl font-semibold capitalize">{mood}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t bg-card/50">
        <Button 
          onClick={detectMood} 
          className="w-full" 
          disabled={!Object.values(answers).some(answer => answer.trim()) || isLoading}
        >
          {isLoading ? "Analyzing..." : "Analyze Mood"}
        </Button>
      </CardFooter>
    </FeatureCard>
  )
}