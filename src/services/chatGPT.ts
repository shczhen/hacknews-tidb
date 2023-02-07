import { ChatGPTAPI } from 'chatgpt';
import pino from 'pino';

export default class ChatBotService {
  private readonly api: ChatGPTAPI;
  commonCfg: { timeoutMs: number };

  constructor(
    private readonly log: pino.Logger,
    private readonly apiKey: string
  ) {
    const api = new ChatGPTAPI({
      apiKey,
    });
    this.api = api;
    this.commonCfg = {
      timeoutMs: 15 * 1000,
    };
  }

  async sendSingleMessage(message: string) {
    const res = await this.api.sendMessage(message, { ...this.commonCfg });
    return res;
  }

  async sendMessageWithContext(
    message: string,
    conversationId: string,
    parentMessageId: string
  ) {
    const res = await this.api.sendMessage(message, {
      conversationId,
      parentMessageId,
      ...this.commonCfg,
    });
    return res;
  }
}
