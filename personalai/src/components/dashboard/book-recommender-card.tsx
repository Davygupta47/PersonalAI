"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Search, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Book = {
  title: string
  author: string
  image: string
}

export default function BookRecommenderCard() {
  const [mood, setMood] = useState("")
  const [books, setBooks] = useState<Book[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const fetchBooks = async () => {
    if (!mood.trim()) {
      setError("Please enter a mood")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const res = await fetch(`http://127.0.0.1:5000/recommend?mood=${encodeURIComponent(mood)}`)
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Something went wrong")
        setBooks([])
        return
      }
      const data = await res.json()
      setBooks(data.books)
    } catch {
      setError("Could not fetch recommendations")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      fetchBooks()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <Card className="max-w-2xl mx-auto shadow-lg border-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center mb-8 mt-2">
            <BookOpen className="h-8 w-8 mr-2 text-emerald-600 dark:text-emerald-400" />
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Books Finder</h1>
          </div>

          <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
            Discover books that match your current mood
          </p>

          <div className="flex gap-2 mb-6">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="How are you feeling today?"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10 py-6 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
            <Button
              onClick={fetchBooks}
              disabled={isLoading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Find Books"}
            </Button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <AnimatePresence>
            {books.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
                  Books for when you&apos;re feeling {mood}:
                </h2>
                <div className="space-y-4">
                  {books.map((book, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border-slate-200 dark:border-slate-700">
                        <div className="flex p-0">
                          <div className="w-24 h-32 bg-slate-200 dark:bg-slate-700 flex-shrink-0">
                            {book.image ? (
                              <img
                                src={book.image || "/placeholder.svg"}
                                alt={book.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <BookOpen className="h-8 w-8 text-slate-400" />
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-slate-800 dark:text-slate-200">{book.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{book.author}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
