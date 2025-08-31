export const DEFAULT_CHAT_MODEL = 'gpt-4o-mini';

export const AVAILABLE_MODELS = {
  'gpt-4o-mini': {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'openai',
    maxTokens: 16384,
    description: 'نموذج سريع وفعال للمحادثات العامة',
  },
  'gpt-4o': {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    maxTokens: 8192,
    description: 'نموذج متقدم للمهام المعقدة',
  },
  'claude-3-haiku': {
    id: 'claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: 'anthropic',
    maxTokens: 4096,
    description: 'نموذج سريع ومتوازن',
  },
  'deepseek-chat': {
    id: 'deepseek-chat',
    name: 'DeepSeek Chat',
    provider: 'deepseek',
    maxTokens: 4096,
    description: 'نموذج متخصص في البرمجة والتحليل',
  },
};

export type ChatModel = keyof typeof AVAILABLE_MODELS;