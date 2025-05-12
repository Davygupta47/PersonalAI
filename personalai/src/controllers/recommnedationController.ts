import { Request, Response } from 'express';
import { UserSession } from '../models/UserSession';
import { recommend } from '../recommendationEngine';

export const getRecommendations = async (req: Request, res: Response) => {
  const { sessionId } = req.query;
  if (!sessionId) return res.status(400).json({ error: 'Missing sessionId' });

  const session = await UserSession.findOne({ sessionId });
  if (!session) return res.status(404).json({ error: 'Session not found' });

  const result = recommend(session.traits);
  res.json(result);
};
/*export const getUserSession = async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  if (!sessionId) return res.status(400).json({ error: 'Missing sessionId' });

  const userSession = await UserSession.findOne({ sessionId });
  if (!userSession) return res.status(404).json({ error: 'Session not found' });

  res.json(userSession);
};*/