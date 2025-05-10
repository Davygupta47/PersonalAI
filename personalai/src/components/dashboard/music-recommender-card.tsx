"use client"

import { Music, Play, SkipForward } from "lucide-react"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FeatureCard } from "./feature-card"

interface MusicRecommenderCardProps {
  fullWidth?: boolean
}

export function MusicRecommenderCard({ fullWidth = false }: MusicRecommenderCardProps) {
  const recommendations = [
    { title: "Blinding Lights", artist: "The Weeknd", genre: "Pop/R&B" },
    { title: "As It Was", artist: "Harry Styles", genre: "Pop" },
    { title: "Heat Waves", artist: "Glass Animals", genre: "Indie Pop" },
    { title: "Levitating", artist: "Dua Lipa", genre: "Pop/Disco" },
  ]

  return (
    <FeatureCard fullWidth={fullWidth} className={fullWidth ? "h-[70vh]" : "h-[400px]"}>
      <CardHeader className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 pb-2">
        <CardTitle className="text-xl">Music Recommender</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-4 rounded-lg bg-card p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Now Playing</h3>
              <p className="text-sm text-muted-foreground">Based on your mood</p>
            </div>
            <Music className="h-8 w-8 text-primary" />
          </div>

          <div className="mt-4">
            <div className="mb-1 text-xl font-bold">Blinding Lights</div>
            <div className="text-sm text-muted-foreground">The Weeknd • After Hours</div>

            <div className="mt-4 flex items-center justify-between">
              <div className="h-1 w-full rounded-full bg-muted">
                <div className="h-1 w-2/3 rounded-full bg-primary"></div>
              </div>
              <span className="ml-2 text-xs">2:13</span>
            </div>

            <div className="mt-4 flex items-center justify-center gap-4">
              <Button variant="outline" size="icon" className="rounded-full">
                <SkipForward className="h-4 w-4 rotate-180" />
              </Button>
              <Button size="icon" className="h-12 w-12 rounded-full">
                <Play className="h-6 w-6" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <h3 className="mb-2 font-medium">Recommended for you:</h3>
        <div className="space-y-2">
          {recommendations.map((song, index) => (
            <div key={index} className="flex items-center justify-between rounded-md bg-card/50 p-2 hover:bg-card/80">
              <div>
                <div className="font-medium">{song.title}</div>
                <div className="text-xs text-muted-foreground">
                  {song.artist} • {song.genre}
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Play className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-card/50">
        <Button variant="outline" className="w-full">
          Open in Spotify
        </Button>
      </CardFooter>
    </FeatureCard>
  )
}
