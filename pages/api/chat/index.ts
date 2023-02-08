import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatMessage } from 'chatgpt';

import ChatBotService from 'src/services/chatGPT';
import logger from 'next-pino/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<ChatMessage>>
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  const { message, conversationId, parentMessageId } = req.body;
  const token = req.headers.authorization;
  if (!message || !token || token !== process.env.CHATGPT_TOKEN) {
    res.status(400).end();
    return;
  }
  const chatBotService = new ChatBotService(
    logger,
    process.env.OPENAI_API_KEY || ''
  );
  if (conversationId && parentMessageId) {
    const {
      text,
      id,
      conversationId: sessionId,
    } = await chatBotService.sendMessageWithContext(
      message,
      conversationId,
      parentMessageId
    );
    res.status(200).json({ text, id, conversationId: sessionId });
    return;
  }
  const {
    text,
    id,
    conversationId: sessionId,
  } = await chatBotService.sendSingleMessage(message);
  res.status(200).json({ text, id, conversationId: sessionId });
}
