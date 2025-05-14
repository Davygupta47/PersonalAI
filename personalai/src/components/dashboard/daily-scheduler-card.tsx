"use client"

import { useState } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Calendar, BookOpen, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export default function RoutineGenerator() {
  const [mood] = useState("Nervous")
  const [hasSchool, setHasSchool] = useState("Yes")
  const [hasTuition, setHasTuition] = useState("Yes")
  const [schoolStart, setSchoolStart] = useState("08:00")
  const [schoolEnd, setSchoolEnd] = useState("14:00")
  const [tuitionTime, setTuitionTime] = useState("17:00 - 18:00")
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState<string[][] | null>(null)
  const [error, setError] = useState("")

  const parseMarkdownTable = (markdown: string) => {
    const lines = markdown.split("\n").filter((l) => l.startsWith("|"))
    if (lines.length < 3) return null

    const headers = lines[0]
      .split("|")
      .map((h) => h.trim())
      .filter(Boolean)
    const rows = lines.slice(2).map((line) =>
      line
        .split("|")
        .map((cell) => cell.trim())
        .filter(Boolean),
    )

    return [headers, ...rows]
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError("")
    setTableData(null)

    try {
      const response = await axios.post("/api/generateRoutine", {
        mood,
        hasSchool: hasSchool === "Yes",
        hasTuition: hasTuition === "Yes",
        schoolStart,
        schoolEnd,
        tuitionTime,
      })

      const parsed = parseMarkdownTable(response.data.content)
      if (parsed) {
        setTableData(parsed)
      } else {
        setError("Could not parse table.")
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Failed to generate routine.")
      }
    } finally {
      setLoading(false)
    }
  }

  const moodEmoji =
    {
      Happy: "😊",
      Sad: "😔",
      Anxious: "😰",
      Excited: "🤩",
      Tired: "😴",
      Nervous: "😬",
    }[mood] || "🙂"

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="mb-8 text-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl font-bold mb-2 gradient-text"
          >
            AI-Powered Daily Routine
          </motion.h1>
          <p className="text-muted-foreground">Personalized schedule based on your mood and commitments</p>
        </div>

        <Card className="modern-card mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Create Your Day</CardTitle>
                <CardDescription>Tell us about your schedule</CardDescription>
              </div>
              <Badge variant="outline" className="text-lg px-3 py-1 border-primary/30">
                <span className="mr-2">{moodEmoji}</span>
                Feeling {mood}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <Label htmlFor="hasSchool">Do you have school today?</Label>
              </div>
              <Select value={hasSchool} onValueChange={setHasSchool}>
                <SelectTrigger id="hasSchool" className="w-full">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem className="text-black hover:bg-gray-500" value="Yes">Yes</SelectItem>
                  <SelectItem className="text-black hover:bg-gray-500" value="No">No</SelectItem>
                </SelectContent>
              </Select>

              <AnimatePresence>
                {hasSchool === "Yes" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="schoolStart">Start Time</Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="schoolStart"
                            type="time"
                            value={schoolStart}
                            onChange={(e) => setSchoolStart(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="schoolEnd">End Time</Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="schoolEnd"
                            type="time"
                            value={schoolEnd}
                            onChange={(e) => setSchoolEnd(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <Label htmlFor="hasTuition">Do you have tuition today?</Label>
              </div>
              <Select value={hasTuition} onValueChange={setHasTuition}>
                <SelectTrigger id="hasTuition" className="w-full">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem className="text-black hover:bg-gray-500" value="Yes">Yes</SelectItem>
                  <SelectItem className="text-black hover:bg-gray-500" value="No">No</SelectItem>
                </SelectContent>
              </Select>

              <AnimatePresence>
                {hasTuition === "Yes" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 space-y-2">
                      <Label htmlFor="tuitionTime">Tuition Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="tuitionTime"
                          type="text"
                          value={tuitionTime}
                          onChange={(e) => setTuitionTime(e.target.value)}
                          placeholder="e.g. 17:00 - 18:00"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-purple-400 hover:from-primary/90 hover:to-purple-400/90"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating your routine...
                </>
              ) : (
                "Generate Routine"
              )}
            </Button>
          </CardFooter>
        </Card>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-8"
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {loading && !tableData && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <Card>
                <CardHeader>
                  <Skeleton className="h-8 w-3/4" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex gap-4">
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-6 w-3/4" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {tableData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="modern-card overflow-hidden">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-center">Your Personalized Daily Routine</CardTitle>
                  <CardDescription className="text-center">
                    Optimized for your {mood.toLowerCase()} mood
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          {tableData[0].map((header, i) => (
                            <th key={i} className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.slice(1).map((row, rowIndex) => (
                          <tr key={rowIndex} className="border-t border-border hover:bg-muted/20 transition-colors">
                            {row.map((cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                className={`px-4 py-3 text-sm ${cellIndex === 0 ? "font-medium" : ""}`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t bg-muted/20 py-3">
                  <p className="text-xs text-muted-foreground">
                    This routine is designed to help manage your {mood.toLowerCase()} feelings
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
