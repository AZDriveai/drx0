// تكوين النماذج المختلفة
const MODEL_CONFIG = {
  deepseek: {
    id: 'deepseek-chat',
    name: 'DeepSeek',
    apiUrl: 'https://api.deepseek.com/v1/chat/completions',
    maxTokens: 5000,
    temperature: 0.7,
    topP: 0.9
  },
  huggingface: {
    id: 'openai/gpt-oss-120b:hyperbolic',
    name: 'HuggingFace GPT-OSS',
    apiUrl: 'https://router.huggingface.co/v1/chat/completions',
    maxTokens: 5000,
    temperature: 0.5,
    topP: 0.7
  },
  groq: {
    id: 'qwen/qwen3-32b',
    name: 'Groq Qwen3',
    apiUrl: 'https://api.groq.com/openai/v1/chat/completions',
    maxTokens: 5000,
    temperature: 0.6,
    topP: 0.95
  }
};

// دالة لإرسال الرسائل إلى النموذج المحدد
export const sendMessageToAI = async (messages, modelId, apiKeys) => {
  const config = MODEL_CONFIG[modelId];
  if (!config) {
    throw new Error(`Unsupported model: ${modelId}`);
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  // إضافة مفتاح API المناسب
  switch (modelId) {
    case 'deepseek':
      headers['Authorization'] = `Bearer ${apiKeys.DEEPSEEK_API_KEY}`;
      break;
    case 'huggingface':
      headers['Authorization'] = `Bearer ${apiKeys.HF_TOKEN}`;
      break;
    case 'groq':
      headers['Authorization'] = `Bearer ${apiKeys.GROQ_API_KEY}`;
      break;
  }

  const requestBody = {
    model: config.id,
    messages: messages,
    temperature: config.temperature,
    max_tokens: config.maxTokens,
    top_p: config.topP,
    stream: false
  };

  try {
    const response = await fetch(config.apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error(`Error with ${config.name}:`, error);
    throw error;
  }
};

// دالة لإرسال الرسائل مع التدفق (Streaming)
export const sendMessageToAIStream = async (messages, modelId, apiKeys, onChunk) => {
  const config = MODEL_CONFIG[modelId];
  if (!config) {
    throw new Error(`Unsupported model: ${modelId}`);
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  // إضافة مفتاح API المناسب
  switch (modelId) {
    case 'deepseek':
      headers['Authorization'] = `Bearer ${apiKeys.DEEPSEEK_API_KEY}`;
      break;
    case 'huggingface':
      headers['Authorization'] = `Bearer ${apiKeys.HF_TOKEN}`;
      break;
    case 'groq':
      headers['Authorization'] = `Bearer ${apiKeys.GROQ_API_KEY}`;
      break;
  }

  const requestBody = {
    model: config.id,
    messages: messages,
    temperature: config.temperature,
    max_tokens: config.maxTokens,
    top_p: config.topP,
    stream: true
  };

  try {
    const response = await fetch(config.apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') return;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              onChunk(content);
            }
          } catch (e) {
            // تجاهل الأخطاء في تحليل JSON
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error with ${config.name}:`, error);
    throw error;
  }
};

export { MODEL_CONFIG };

