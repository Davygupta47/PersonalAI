import { NextRequest, NextResponse } from "next/server";

// Define types for our API
type OldHistoryItem = { message: string; response: string };
type HistoryItem = { role: string; content: string } | OldHistoryItem;
type ConversationHistory = HistoryItem[];
type RequestData = { message: string; history?: ConversationHistory };

// Export HTTP methods as named exports (required for App Router)
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const data: RequestData = await request.json();
    const { message, history = [] } = data;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Convert previous chat history to the format Groq expects
    const formattedHistory = formatChatHistory(history);

    // Generate a response using Groq
    const response = await generateGroqResponse(message, formattedHistory);

    // Return the response
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error processing chat:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}

// Format chat history for Groq API
function formatChatHistory(history: ConversationHistory): ConversationHistory {
  // If empty history, return an empty array
  if (!history || history.length === 0) return [];

  // Ensure history has proper role format
  return history
    .map((item) => {
      // If the item already has role and content, leave it as is
      if ("role" in item && "content" in item) {
        return item;
      }

      // Otherwise, convert old format to new format
      if ("message" in item && "response" in item) {
        return [
          { role: "user", content: item.message },
          { role: "assistant", content: item.response },
        ];
      }

      return item;
    })
    .flat();
}

// Generate response using Groq API
async function generateGroqResponse(
  message: string,
  history: ConversationHistory
): Promise<string> {
  const GROQ_API_KEY = process.env.GROQ_API_KEY;

  if (!GROQ_API_KEY) {
    console.error("Missing Groq API key");
    throw new Error("Server configuration error");
  }

  // Set up conversation for the Groq API
  const messages = [...history, { role: "user", content: message }];

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3-70b-8192", // You can also use "llama3-8b-8192" for a smaller model
          messages: messages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq API error:", errorData);
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling Groq API:", error);
    return "I'm having trouble connecting to my brain right now. Please try again in a moment.";
  }
}
