import { NextResponse } from "next/server";

// Type definitions
interface Movie {
  name: string;
  director: string;
  language: string;
  genre: string;
  emotion: string;
  link: string;
}

type RecommendationResponse =
  | { movies: Movie[] }
  | { message: string }
  | { error: string };

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get("genre")?.trim();
    const emotion = searchParams.get("emotion")?.trim();

    // Validate input
    if (!genre || !emotion) {
      return NextResponse.json(
        { error: "Both genre and emotion parameters are required" },
        { status: 400 }
      );
    }

    // Call your Flask API
    const flaskResponse = await fetch(
      `http://127.0.0.1:5000/recommend/movies?genre=${genre}&emotion=${emotion}`
    );

    if (!flaskResponse.ok) {
      const errorData = await flaskResponse.json().catch(() => ({}));
      throw new Error(
        `Flask API error: ${flaskResponse.status} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    const data: RecommendationResponse = await flaskResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Recommendation error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to get recommendations",
      },
      { status: 500 }
    );
  }
}

// Optionally keep POST method if you want both
export async function POST() {
  return NextResponse.json(
    { error: "Use GET method with query parameters" },
    { status: 405 }
  );
}
