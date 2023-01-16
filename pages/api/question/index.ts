import type { NextApiRequest, NextApiResponse } from 'next';

import { BotService } from 'src/services/bot';
import Question2SQLTemplate from 'src/services/bot/templates/Question2SQLTemplate';
import logger from 'next-pino/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  const { question, token } = req.body;
  if (!question || !token || token !== process.env.API_TOKEN) {
    res.status(400).end();
    return;
  }
  const botService = new BotService(logger, process.env.OPENAI_API_KEY || '');
  const template = new Question2SQLTemplate();
  const answer = await botService.getAnswer(question, template);
  res.status(200).json({ answer });
}
