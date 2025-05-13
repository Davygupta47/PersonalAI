import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  traits: [String],
});

export const UserSession = mongoose.model('UserSession', sessionSchema);
/*export type UserSessionType = {
  sessionId: string;
  traits: string[];
};*/