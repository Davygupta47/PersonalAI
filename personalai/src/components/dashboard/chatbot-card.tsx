"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FeatureCard } from "./feature-card"

interface ChatbotCardProps {
  fullWidth?: boolean
}

export function ChatbotCard({ fullWidth = false }: ChatbotCardProps) {
  const [messages, setMessages] = useState([{ role: "assistant", content: "Hello! How can I help you today?" }])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: input }])

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I understand. How else can I assist you with your lifestyle needs today?",
        },
      ])
    }, 1000)

    setInput("")
  }

  return (
    <FeatureCard fullWidth={fullWidth} className={fullWidth ? "h-[70vh]" : "h-[400px]"}>
      <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 pb-2">
        <CardTitle className="text-xl">Personal Assistant</CardTitle>
      </CardHeader>
      <CardContent className={`overflow-y-auto ${fullWidth ? "h-[calc(70vh-120px)]" : "h-[280px]"}`}>
        <div className="space-y-4 pt-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-card/50">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </FeatureCard>
  )
}
