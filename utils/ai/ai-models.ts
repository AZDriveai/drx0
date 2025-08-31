export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  maxTokens: number;
  enabled: boolean;
  accuracyScore?: number;
  latency?: number;
  costPerToken?: number;
  userRating?: number;
  specialties?: TaskType[];
  confidenceThreshold?: number;
}

export interface ModelPerformance {
  modelId: string;
  responseTime: number;
  accuracy: boolean;
  userRating?: number;
  timestamp: Date;
}

export type TaskType = 'coding' | 'creative' | 'analysis' | 'general' | 'reasoning' | 'translation';

export interface UserHistory {
  tasks: Record<TaskType, number>;
  avgComplexity: number;
  preferredModels: string[];
}

export interface ReasoningStep {
  type: 'thought' | 'step' | 'reflection' | 'reward' | 'equation' | 'verification' | 'confirmation' | 'answer' | 'final_reflection';
  content: string;
  stepNumber?: number;
  remainingSteps?: number;
  rewardScore?: number;
  timestamp: Date;
  metadata?: {
    query?: string;
    results?: SearchResult[];
    expression?: string;
    result?: number | string;
    confidence?: number;
  };
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  imageUrl?: string;
  reasoningSteps?: ReasoningStep[];
  modelUsed?: string;
  confidence?: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  timestamp: Date;
  modelPreference?: string;
  taskType?: TaskType;
}

