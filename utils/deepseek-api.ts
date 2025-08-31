interface DeepSeekMessage {
  role: string;
  content: string;
}

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  usage?: {
    total_tokens: number;
  };
}

export const deepseekAPI = {
  async chat(messages: DeepSeekMessage[], options: { temperature: number; max_tokens: number }) {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature: options.temperature,
        max_tokens: options.max_tokens
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    return response.json() as Promise<DeepSeekResponse>;
  },

  async generateTitle(message: string) {
    // Simple title generation from first few words of message
    return message.split(' ').slice(0, 5).join(' ') + '...';
  }
};

export type { DeepSeekMessage };