export type UserMessage = {
  id: string;
  parentMessageId?: string;
  type: 'user';
  text: string;
  conversationId?: string;
  timestamp: number;
};

export type BotMessage = {
  parentMessageId: string;
  id: string;
  type: 'bot';
  text: string;
  conversationId: string;
  timestamp: number;
};

export type ChatMessage = UserMessage | BotMessage;
