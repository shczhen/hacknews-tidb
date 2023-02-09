import type { NextApiRequest, NextApiResponse } from 'next';

import { BotService } from 'src/services/bot';
import MySQLService, { initConnection } from 'src/services/mysql';
import Data2ChartTemplate from 'src/services/bot/templates/Data2ChartTemplate';
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

  const { question, sql, token } = req.body;
  if (!question) {
    res.status(400).end();
    return;
  }

  const botService = new BotService(logger, process.env.OPENAI_API_KEY || '');
  const template = new Data2ChartTemplate();
  const mysqlService = new MySQLService(await initConnection());
  const { rows, error } = await mysqlService.execute(sql);
  mysqlService.cleanUp();
  if (error) {
    res.status(500).json({ error });
    return;
  }
  const { answer, id } = await botService.data2Chart(question, rows, template);
  res.status(200).json({ answer, rows, id });
}
