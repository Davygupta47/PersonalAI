import axios from 'axios';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.GROQ_API_KEY!;

export const getGroqResponse = async (messages: { role: string; content: string }[]) => {
  const response = await axios.post(
    GROQ_API_URL,
    {
      model: 'mixtral-8x7b-32768',
      messages,
    },
    {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].message.content;
};
