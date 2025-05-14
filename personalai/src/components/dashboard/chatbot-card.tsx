"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FeatureCard } from "./feature-card";

// Define types for our chat
interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ConversationHistory {
  message: string;
  response: string;
}

interface ChatbotCardProps {
  fullWidth?: boolean;
}

export function ChatbotCard({ fullWidth = false }: ChatbotCardProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage: Message = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Clear input and show loading state
    setInput("");
    setIsLoading(true);

    try {
      // Get current conversation history
      const history: ConversationHistory[] = [];

      // Build history from existing messages (every user message followed by assistant response)
      for (let i = 0; i < messages.length - 1; i++) {
        if (
          messages[i].role === "user" &&
          messages[i + 1].role === "assistant"
        ) {
          history.push({
            message: messages[i].content,
            response: messages[i + 1].content,
          });
        }
      }

      // Send request to API - Note the updated API endpoint
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          history: history,
        }),
      });

      const data = await response.json();

      // Add bot response to chat
      if (response.ok) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: data.response },
        ]);
      } else {
        throw new Error(data.error || "Failed to get response");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FeatureCard
      fullWidth={fullWidth}
      className={fullWidth ? "h-[70vh]" : "h-[400px]"}
    >
      <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 pb-2">
        <CardTitle className="text-xl">Personal Assistant</CardTitle>
      </CardHeader>
      <CardContent
        className={`overflow-y-auto ${
          fullWidth ? "h-[calc(70vh-120px)]" : "h-[280px]"
        }`}
      >
        <div className="space-y-4 pt-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t bg-card/50">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
            className="flex-1"
            disabled={isLoading}
          />
          <Button size="icon" onClick={handleSend} disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </FeatureCard>
  );
}
