import { Configuration, OpenAIApi } from 'openai';
import pino from 'pino';

import { Template } from 'src/services/bot/types';

export class BotService {
  private readonly openAI: OpenAIApi;

  constructor(
    private readonly log: pino.Logger,
    private readonly apiKey: string
  ) {
    const configuration = new Configuration({
      apiKey: this.apiKey,
    });
    this.openAI = new OpenAIApi(configuration);
  }

  async getAnswer(question: string, template: Template) {
    const prompt = template.getTemplate(question);

    const data = await this.openAI
      .createCompletion({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 800,
        temperature: 0,
        n: 1,
        stream: false,
        stop: ['#', '---'],
      })
      .then((response) => response.data);

    this.log.info(
      {
        name: 'services/bot',
        data: data,
      },
      `BotService.getAnswer`
    );

    return { answer: data?.choices[0]?.text, id: data.id };
  }
}
