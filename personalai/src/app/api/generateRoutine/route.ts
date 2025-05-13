// src/app/api/generateRoutine/route.ts
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { config } from 'dotenv'
import { NextResponse } from 'next/server'

config(); // Load from .env.local

export async function POST(req: Request) {
  const body = await req.json();
  const { mood, hasSchool, hasTuition, schoolStart, schoolEnd, tuitionTime } = body;

  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0.7
  });

  let basePrompt = `Generate a daily routine for a student in a ${mood} mood.\n`;

  if (hasSchool) {
    basePrompt += `- School from ${schoolStart} to ${schoolEnd}.\n`;
  } else {
    basePrompt += "- No school today.\n";
  }

  if (hasTuition) {
    basePrompt += `- Tuition from ${tuitionTime}.\n`;
  } else {
    basePrompt += "- No tuition today.\n";
  }

  basePrompt += `Include wake-up, meals, study, breaks, sleep, and personal time.
Output a markdown table with columns: Time | Activity | Notes.`;

  try {
    const response = await llm.invoke(basePrompt);
    return NextResponse.json({ content: response.text});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
