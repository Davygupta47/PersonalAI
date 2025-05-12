import { Request, Response } from 'express';
import { getGroqResponse } from '../services/groqService';
import { analyzePersonality } from '../services/nlpService';
import { UserSession } from '../models/UserSession';
import { Message } from '../models/Message';

export const chat = async (req: Request, res: Response) => {
  const { sessionId, text } = req.body;
  if (!text || !sessionId) return res.status(400).json({ error: 'Missing text or sessionId' });

  const userMsg = { role: 'user', content: text };
  const pastMessages = await Message.find().sort({ timestamp: 1 });
  const formatted = pastMessages.map((m) => ({ role: m.role, content: m.content }));
  const messages = [...formatted, userMsg];

  const reply = await getGroqResponse(messages);
  const traits = analyzePersonality(text);

  await Message.create(userMsg);
  await Message.create({ role: 'assistant', content: reply });

  await UserSession.findOneAndUpdate(
    { sessionId },
    { $addToSet: { traits: { $each: traits } } },
    { upsert: true }
  );

  res.json({ reply });
};
/*export const getUserSession = async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  if (!sessionId) return res.status(400).json({ error: 'Missing sessionId' });

  const userSession = await UserSession.findOne({ sessionId });
  if (!userSession) return res.status(404).json({ error: 'Session not found' });

  res.json(userSession);
};*/