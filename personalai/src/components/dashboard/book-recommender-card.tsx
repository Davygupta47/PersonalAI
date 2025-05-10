"use client"

import { Book, BookOpen } from "lucide-react"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FeatureCard } from "./feature-card"

interface BookRecommenderCardProps {
  fullWidth?: boolean
}

export function BookRecommenderCard({ fullWidth = false }: BookRecommenderCardProps) {
  const books = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-Help",
      rating: 4.8,
      cover: "/placeholder.svg?height=120&width=80",
    },
    {
      title: "The Midnight Library",
      author: "Matt Haig",
      genre: "Fiction",
      rating: 4.5,
      cover: "/placeholder.svg?height=120&width=80",
    },
    {
      title: "Project Hail Mary",
      author: "Andy Weir",
      genre: "Sci-Fi",
      rating: 4.7,
      cover: "/placeholder.svg?height=120&width=80",
    },
  ]

  return (
    <FeatureCard fullWidth={fullWidth} className={fullWidth ? "h-[70vh]" : "h-[400px]"}>
      <CardHeader className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 pb-2">
        <CardTitle className="text-xl">Book Recommender</CardTitle>
      </CardHeader>
      <CardContent className={`overflow-y-auto ${fullWidth ? "h-[calc(70vh-120px)]" : "h-[280px]"}`}>
        <div className="mb-4">
          <h3 className="mb-2 font-medium">Based on your interests</h3>
          <div className="space-y-4">
            {books.map((book, index) => (
              <div key={index} className="flex gap-4 rounded-lg bg-card p-3 shadow-sm">
                <div className="h-[120px] w-[80px] overflow-hidden rounded-md bg-muted">
                  <img src={book.cover || "/placeholder.svg"} alt={book.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-semibold">{book.title}</h4>
                    <p className="text-sm text-muted-foreground">by {book.author}</p>
                    <p className="text-xs text-muted-foreground">{book.genre}</p>
                    <div className="mt-1 flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(book.rating) ? "fill-yellow-500" : "fill-muted"}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-xs text-muted-foreground">{book.rating}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="mt-2">
                      <BookOpen className="mr-1 h-3 w-3" />
                      Preview
                    </Button>
                    <Button size="sm" className="mt-2">
                      <Book className="mr-1 h-3 w-3" />
                      Add to List
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-card/50">
        <Button variant="outline" className="w-full">
          View All Recommendations
        </Button>
      </CardFooter>
    </FeatureCard>
  )
}
