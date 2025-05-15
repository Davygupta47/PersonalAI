"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Film, ThumbsUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface Movie {
  name: string
  director: string
  language: string
  genre: string
  emotion: string
  link: string
  // image_url?: string
}

interface MovieRecommenderCardProps {
  fullWidth?: boolean
}

export default function MovieRecommenderCard({ fullWidth }: MovieRecommenderCardProps) {
  const [mood, setMood] = useState("")
  const [genre, setGenre] = useState("")
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<Movie[]>([])

  const handleGetRecommendations = async () => {
    if (!mood || !genre) return
    setLoading(true)
    setRecommendations([])

    try {
      const response = await fetch(`http://127.0.0.1:5000/movies?genre=${genre}&emotion=${mood}`)
      const data = await response.json()

      if (response.ok) {
        setRecommendations(data.movies || [])
      } else {
        setRecommendations([])
        alert(data.message || "No recommendations found.")
      }
    } catch (error) {
      console.error("Error fetching movies:", error)
      alert("Failed to get movie recommendations.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={`h-full overflow-hidden backdrop-blur-sm bg-background/70 border-purple-500/20 shadow-lg ${fullWidth ? "w-full" : ""}`}>
      <CardHeader className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-b border-red-500/20">
        <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <Film className="h-5 w-5" />
          Movie Recommender
        </CardTitle>
        <CardDescription>Get personalized movie recommendations based on your mood and genre</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="mood" className="text-sm font-medium">How are you feeling today?</label>
          <Input
            id="mood"
            placeholder="e.g., happy, thoughtful, excited..."
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="flex-1"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="genre" className="text-sm font-medium">Choose a genre</label>
          <Select onValueChange={setGenre}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Genre" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              <SelectItem className="hover:bg-gray-400" value="Drama">Drama</SelectItem>
              <SelectItem className="hover:bg-gray-400" value="Sci-Fi">Sci-Fi</SelectItem>
              <SelectItem className="hover:bg-gray-400" value="Adventure">Adventure</SelectItem>
              <SelectItem className="hover:bg-gray-400" value="Comedy">Comedy</SelectItem>
              <SelectItem className="hover:bg-gray-400" value="Thriller">Thriller</SelectItem>
              <SelectItem className="hover:bg-gray-400" value="Horror">Horror</SelectItem>
              <SelectItem className="hover:bg-gray-400" value="Fantasy">Fantasy</SelectItem>
              <SelectItem className="hover:bg-gray-400" value="Classic">Classic</SelectItem>
              {/* Add more genres as needed */}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleGetRecommendations}
          disabled={!mood || !genre || loading}
          className="bg-red-600 hover:bg-red-700 text-white w-full"
        >
          {loading ? "Finding..." : "Get Movies"}
        </Button>

        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 mt-4"
          >
            <h3 className="font-medium">Recommended Movies:</h3>
            <div className="grid gap-4">
              {recommendations.map((movie, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex gap-4 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors border border-red-500/10"
                >
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium">{movie.name}</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>Director:</strong> {movie.director}</p>
                      <p><strong>Language:</strong> {movie.language}</p>
                      <p><strong>Genre:</strong> {movie.genre}</p>
                      <p><strong>Emotion:</strong> {movie.emotion}</p>
                      <a href={movie.link} target="_blank" rel="noopener noreferrer" className="text-red-500 underline text-sm">Watch Now</a>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="flex-shrink-0 h-8 w-8 p-0">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="sr-only">Like</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </CardContent>
      <CardFooter className="bg-red-500/5 border-t border-red-500/10 px-6 py-4">
        <p className="text-xs text-muted-foreground">Recommendations are based on your mood and selected genre</p>
      </CardFooter>
    </Card>
  )
}
