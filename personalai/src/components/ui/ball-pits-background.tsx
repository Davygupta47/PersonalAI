"use client"
import React, { useEffect, useRef } from "react"

type Ball = {
  x: number
  y: number
  dx: number
  dy: number
  color: string
}

interface BallPitsProps {
  ballCount?: number
  ballSize?: number
  gravity?: number
  friction?: number
  colors?: string[]
  backgroundColor?: string
}

const BallPits: React.FC<BallPitsProps> = ({
  ballCount = 50,
  ballSize = 20,
  gravity = 0.1,
  friction = 0.01,
  colors = ["#a78bfa", "#38bdf8", "#f472b6", "#34d399", "#f59e0b", "#f87171", "#22d3ee"],
  backgroundColor = "transparent",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let balls: Ball[] = Array.from({ length: ballCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    const animate = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      balls.forEach((ball) => {
        ball.dy += gravity
        ball.y += ball.dy
        ball.x += ball.dx

        if (ball.y + ballSize > canvas.height || ball.y < 0) {
          ball.dy = -ball.dy * (1 - friction)
        }
        if (ball.x + ballSize > canvas.width || ball.x < 0) {
          ball.dx = -ball.dx * (1 - friction)
        }

        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ballSize, 0, Math.PI * 2)
        ctx.fillStyle = ball.color
        ctx.fill()
        ctx.closePath()
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [ballCount, ballSize, gravity, friction, colors, backgroundColor])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ backgroundColor }}
    />
  )
}

export default BallPits
