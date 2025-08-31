export const CHAT_ID = 'chat-id';
export const DEFAULT_MODEL_NAME = 'gpt-4o-mini';
export const DEFAULT_TEMPERATURE = 0.7;
export const MAX_TOKENS = 4096;

export const VISIBILITY_TYPES = {
  PRIVATE: 'private',
  PUBLIC: 'public',
  UNLISTED: 'unlisted',
} as const;

export const MESSAGE_ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
} as const;

export const ARTIFACT_TYPES = {
  CODE: 'code',
  TEXT: 'text',
  IMAGE: 'image',
  SHEET: 'sheet',
} as const;

