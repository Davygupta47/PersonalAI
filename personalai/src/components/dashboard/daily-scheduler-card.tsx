"use client"

import { Calendar, Clock, Plus } from "lucide-react"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FeatureCard } from "./feature-card"

interface DailySchedulerCardProps {
  fullWidth?: boolean
}

export function DailySchedulerCard({ fullWidth = false }: DailySchedulerCardProps) {
  const schedule = [
    { time: "08:00 AM", task: "Morning Workout", completed: true },
    { time: "09:30 AM", task: "Team Meeting", completed: true },
    { time: "12:00 PM", task: "Lunch with Client", completed: false },
    { time: "03:00 PM", task: "Project Review", completed: false },
    { time: "06:00 PM", task: "Evening Run", completed: false },
  ]

  const today = new Date()
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  return (
    <FeatureCard fullWidth={fullWidth} className={fullWidth ? "h-[70vh]" : "h-[400px]"}>
      <CardHeader className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 pb-2">
        <CardTitle className="text-xl">Daily Scheduler</CardTitle>
      </CardHeader>
      <CardContent className={`overflow-y-auto ${fullWidth ? "h-[calc(70vh-120px)]" : "h-[280px]"}`}>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{formattedDate}</span>
          </div>
          <Button variant="outline" size="sm">
            <Clock className="mr-1 h-3 w-3" />
            View Calendar
          </Button>
        </div>

        <div className="relative space-y-4 pl-4">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 h-full w-0.5 bg-muted"></div>

          {schedule.map((item, index) => (
            <div key={index} className="relative">
              {/* Timeline dot */}
              <div
                className={`absolute -left-[17px] top-1.5 h-3 w-3 rounded-full border-2 ${
                  item.completed ? "border-green-500 bg-green-500" : "border-muted-foreground bg-background"
                }`}
              ></div>

              <div
                className={`rounded-lg border p-3 ${
                  item.completed ? "border-green-500/20 bg-green-500/5" : "border-muted bg-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{item.task}</h4>
                  <span className="text-sm text-muted-foreground">{item.time}</span>
                </div>
                <div className="mt-1 flex justify-end">
                  <Button variant={item.completed ? "outline" : "default"} size="sm" className="h-7 text-xs">
                    {item.completed ? "Completed" : "Mark Complete"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-card/50">
        <Button className="w-full">
          <Plus className="mr-1 h-4 w-4" />
          Add New Task
        </Button>
      </CardFooter>
    </FeatureCard>
  )
}
