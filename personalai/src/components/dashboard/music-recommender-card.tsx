"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Music, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Emotion = "Happy" | "Sad" | "Angry" | "Calm";

interface EmotionOption {
  value: Emotion;
  label: string;
  color: string;
  icon: string;
  description: string;
}

const emotions: EmotionOption[] = [
  {
    value: "Happy",
    label: "Happy",
    color: "bg-amber-500",
    icon: "😊",
    description: "Upbeat and cheerful tunes",
  },
  {
    value: "Sad",
    label: "Sad",
    color: "bg-blue-500",
    icon: "😢",
    description: "Melancholic and reflective melodies",
  },
  {
    value: "Angry",
    label: "Angry",
    color: "bg-red-500",
    icon: "😠",
    description: "Intense and powerful rhythms",
  },
  {
    value: "Calm",
    label: "Calm",
    color: "bg-green-500",
    icon: "😌",
    description: "Peaceful and relaxing sounds",
  },
];

export default function MusicRecommenderCard() {
  const [emotion, setEmotion] = useState<Emotion>("Happy");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playEmotion = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/play-song?emotion=${emotion}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (response.ok && data.playlist_url) {
        // Open the Spotify playlist in a new tab
        window.open(data.playlist_url, "_blank");
        setMessage(`Playing ${emotion} playlist on Spotify`);
        setIsPlaying(true);
      } else {
        setMessage(data.error || "Something went wrong");
        setIsPlaying(false);
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to connect to backend");
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedEmotion = emotions.find((e) => e.value === emotion);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900 p-6">
      <Card className="max-w-md w-full bg-white/10 backdrop-blur-lg border-0 shadow-2xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-center mb-6">
            <Music className="h-8 w-8 mr-3 text-purple-300" />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
              Mood Music
            </h1>
          </div>

          <p className="text-center text-purple-200 mb-8">
            Select an emotion to play the perfect playlist
          </p>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {emotions.map((item) => (
              <motion.button
                key={item.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setEmotion(item.value)}
                className={cn(
                  "relative p-4 rounded-xl transition-all duration-300 border-2",
                  emotion === item.value
                    ? "border-white/50 bg-white/20"
                    : "border-transparent bg-white/10 hover:bg-white/15"
                )}
              >
                <div className="flex flex-col items-center">
                  <span className="text-3xl mb-2">{item.icon}</span>
                  <span className="font-medium text-white">{item.label}</span>
                  {emotion === item.value && (
                    <p className="text-xs text-purple-200 mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
                {emotion === item.value && (
                  <motion.div
                    layoutId="selectedEmotion"
                    className="absolute inset-0 rounded-xl border-2 border-white/50"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <Button
            onClick={playEmotion}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-6 rounded-xl shadow-lg transition-all duration-300"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            ) : isPlaying ? (
              <>
                <Volume2 className="h-5 w-5 mr-2 animate-pulse" />
                Now Playing
              </>
            ) : (
              "Play Playlist"
            )}
          </Button>

          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-4 rounded-lg bg-white/10 text-center text-purple-100"
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {isPlaying && selectedEmotion && (
            <div className="mt-8">
              <div className="flex justify-center mb-2">
                <div
                  className={`h-1 w-1 rounded-full ${selectedEmotion.color} mx-1 animate-bounce`}
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className={`h-1 w-1 rounded-full ${selectedEmotion.color} mx-1 animate-bounce`}
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className={`h-1 w-1 rounded-full ${selectedEmotion.color} mx-1 animate-bounce`}
                  style={{ animationDelay: "300ms" }}
                ></div>
                <div
                  className={`h-1 w-1 rounded-full ${selectedEmotion.color} mx-1 animate-bounce`}
                  style={{ animationDelay: "450ms" }}
                ></div>
                <div
                  className={`h-1 w-1 rounded-full ${selectedEmotion.color} mx-1 animate-bounce`}
                  style={{ animationDelay: "600ms" }}
                ></div>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-[200px] h-16 relative">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute bottom-0 w-1.5 ${selectedEmotion.color} rounded-t-full`}
                      style={{
                        height: `${Math.random() * 100}%`,
                        left: `${i * 5}%`,
                        opacity: 0.7,
                        animation: `equalizer 1s ease-in-out infinite`,
                        animationDelay: `${i * 50}ms`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
