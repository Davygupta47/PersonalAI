import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  role: String, // "user" or "assistant"
  content: String,
  timestamp: { type: Date, default: Date.now },
});

export const Message = mongoose.model('Message', messageSchema);
