import type { NextApiRequest, NextApiResponse } from 'next';

import { BotService } from 'src/services/bot';
import Question2SQLTemplate from 'src/services/bot/templates/Question2SQLTemplate';
import RecaptchaService from 'src/services/recaptcha';

import logger from 'next-pino/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  if (process.env.NODE_ENV !== 'development') {
    const recaptchaService = new RecaptchaService();
    const result = await recaptchaService.verifyRequest(req, res);

    if (!result) return;
  }

  const { question } = req.body;
  if (!question) {
    res.status(400).end();
    return;
  }

  const botService = new BotService(logger, process.env.OPENAI_API_KEY || '');
  const template = new Question2SQLTemplate();
  const { answer, id } = await botService.getAnswer(question, template);
  res.status(200).json({ answer, id });
}
