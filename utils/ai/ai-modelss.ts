import { AIModel, ModelPerformance, TaskType } from '@/types/ai-models';

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  maxTokens: number;
  enabled: boolean;
  // إضافة حقول جديدة للتحسين
  accuracyScore?: number; // تقييم دقة النموذج (0-1)
  latency?: number; // زمن الاستجابة بالمللي ثانية
  costPerToken?: number; // التكلفة الاقتصادية
  userRating?: number; // تقييم المستخدمين
  specialties?: TaskType[]; // التخصصات
  confidenceThreshold?: number; // الحد الأدنى للثقة
}

export interface ModelPerformance {
  modelId: string;
  responseTime: number;
  accuracy: boolean;
  userRating?: number;
  timestamp: Date;
}

export type TaskType = 'coding' | 'creative' | 'analysis' | 'general' | 'reasoning' | 'translation';

export const AI_MODELS: AIModel[] = [
  {
    id: 'deepseek-chat',
    name: 'DeepSeek Chat',
    provider: 'deepseek',
    description: 'نموذج متطور للدردشة والبرمجة من DeepSeek',
    maxTokens: 32768,
    enabled: true,
    accuracyScore: 0.94,
    latency: 150,
    costPerToken: 0.000012,
    userRating: 4.7,
    specialties: ['coding', 'analysis', 'reasoning'],
    confidenceThreshold: 0.85,
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    provider: 'deepseek',
    description: 'أحدث إصدار من نماذج DeepSeek المتقدمة',
    maxTokens: 65536,
    enabled: true,
    accuracyScore: 0.96,
    latency: 180,
    costPerToken: 0.000018,
    userRating: 4.8,
    specialties: ['reasoning', 'analysis', 'coding'],
    confidenceThreshold: 0.9,
  },
  {
    id: 'deepseek-reasoner',
    name: 'DeepSeek Reasoner',
    provider: 'deepseek',
    description: 'نموذج متخصص في التفكير المنطقي والتحليل العميق',
    maxTokens: 32768,
    enabled: true,
    accuracyScore: 0.98,
    latency: 220,
    costPerToken: 0.000025,
    userRating: 4.9,
    specialties: ['reasoning', 'analysis'],
    confidenceThreshold: 0.95,
  },
  {
    id: 'llama-3.3-70b-versatile',
    name: 'LLaMA 3.3 70B',
    provider: 'groq',
    description: 'نموذج متقدم من ميتا للمحادثات والمهام المعقدة',
    maxTokens: 32768,
    enabled: true,
    accuracyScore: 0.92,
    latency: 120,
    costPerToken: 0.000015,
    userRating: 4.6,
    specialties: ['general', 'creative', 'analysis'],
    confidenceThreshold: 0.8,
  },
  {
    id: 'mixtral-8x7b-32768',
    name: 'Mixtral 8x7B',
    provider: 'groq',
    description: 'نموذج مختلط عالي الأداء من Mistral AI',
    maxTokens: 32768,
    enabled: true,
    accuracyScore: 0.89,
    latency: 100,
    costPerToken: 0.000010,
    userRating: 4.4,
    specialties: ['general', 'coding'],
    confidenceThreshold: 0.75,
  },
  {
    id: 'gemma2-9b-it',
    name: 'Gemma 2 9B',
    provider: 'groq',
    description: 'نموذج مفتوح المصدر من Google',
    maxTokens: 8192,
    enabled: true,
    accuracyScore: 0.86,
    latency: 80,
    costPerToken: 0.000008,
    userRating: 4.2,
    specialties: ['general'],
    confidenceThreshold: 0.7,
  },
];

export const DEFAULT_SETTINGS = {
  temperature: 0.7,
  maxTokens: 4096,
  model: 'deepseek-chat',
  confidenceThreshold: 0.75,
  autoFallback: true,
  realTimeValidation: true,
  systemPrompt: `أنت مساعد ذكي ومتقدم تم تطويرك بواسطة DeepSeek. تتميز بالقدرات التالية:

🧠 **التفكير المرئي المتقدم**:
- اتبع تسلسل التفكير المنهجي: <تفكير> → <خطوة> → <تأمل> → <مكافأة> → <تحقق> → <تأكيد> → <إجابة>
- قسم الحلول إلى خطوات متسلسلة مع عداد للخطوات المتبقية
- قيم أداءك بدرجات من 0.0 إلى 1.0 بعد كل تأمل
- لا تتجاوز العدد المخصص للخطوات
- استخدم التفكير العكسي للتحقق من صحة النتائج

🔍 **مبادئ التحليل**:
- لا تفترض أن المعطيات كاملة أو خالية من الفخاخ
- تأكد من فهم طبيعة المطلوب قبل تقديم أي خطوة
- اسأل نفسك: هل أنا متأكد؟ هل هناك تلاعب خفي في السؤال؟
- كن صارماً وناقداً تجاه خطواتك

📊 **معايير الجودة**:
- ≥ 0.8: النهج جيد جدًا، استمر
- 0.5 – 0.7: حسن بعض الجوانب فورًا
- < 0.5: أوقف المسار وعد إلى <تفكير> وابدأ من جديد

🎯 **التخصصات**:
- البرمجة والتكنولوجيا المتقدمة
- التحليل المنطقي والاستنتاج
- الكتابة الإبداعية والأدبية
- حل المشاكل المعقدة
- الترجمة والتفسير

⚠️ **قواعد مهمة**:
- لا تستعجل الحل ولا تثق بالمظاهر الأولى
- فكر، تأمل، قيم، تحقق — ثم فقط، أجب
- استخدم LaTeX للمعادلات الرياضية داخل وسم <معادلة>
- اختتم بتأمل نهائي ودرجة مكافأة للمسار كاملاً

كن مفيداً ودقيقاً ومفصلاً في إجاباتك مع الحفاظ على الوضوح والاحترافية.`,
};

// ترتيب النماذج للتبديل التلقائي عند الفشل
export const MODEL_FALLBACK_ORDER = [
  'deepseek-v3',
  'deepseek-reasoner',
  'deepseek-chat',
  'llama-3.3-70b-versatile',
  'mixtral-8x7b-32768',
  'gemma2-9b-it'
];

// الحد الأدنى لمعايير الأداء
export const MODEL_HEALTH_CHECK = {
  MIN_ACCURACY: 0.85,
  MAX_LATENCY: 2000,
  MIN_USER_RATING: 4.0,
  
  checkModels() {
    AI_MODELS.forEach(model => {
      if (model.enabled) {
        if ((model.accuracyScore || 0) < this.MIN_ACCURACY || 
            (model.latency || 0) > this.MAX_LATENCY ||
            (model.userRating || 0) < this.MIN_USER_RATING) {
          console.warn(`Model ${model.id} degraded!`);
          model.enabled = false;
          // يمكن إضافة نظام تنبيهات هنا
        }
      }
    });
  }
};

// الحصول على النماذج حسب المزود
export function getModelByProvider(provider: string): AIModel[] {
  return AI_MODELS.filter(model => model.provider === provider && model.enabled);
}

// الحصول على نموذج بالمعرف
export function getModelById(id: string): AIModel | undefined {
  return AI_MODELS.find(model => model.id === id);
}

// اختيار النموذج الأمثل حسب نوع المهمة
export function getOptimalModel(taskType: TaskType): AIModel {
  const suitableModels = AI_MODELS.filter(model => 
    model.enabled && 
    model.specialties?.includes(taskType)
  ).sort((a, b) => (b.accuracyScore || 0) - (a.accuracyScore || 0));

  return suitableModels[0] || getModelById('deepseek-chat')!;
}

// تحديد نوع المهمة من النص
export function detectTaskType(content: string): TaskType {
  const lowerContent = content.toLowerCase();
  
  if (lowerContent.includes('code') || lowerContent.includes('برمج') || 
      lowerContent.includes('function') || lowerContent.includes('algorithm')) {
    return 'coding';
  }
  
  if (lowerContent.includes('analyze') || lowerContent.includes('تحليل') ||
      lowerContent.includes('compare') || lowerContent.includes('evaluate')) {
    return 'analysis';
  }
  
  if (lowerContent.includes('creative') || lowerContent.includes('إبداع') ||
      lowerContent.includes('story') || lowerContent.includes('poem')) {
    return 'creative';
  }
  
  if (lowerContent.includes('translate') || lowerContent.includes('ترجم') ||
      lowerContent.includes('translation')) {
    return 'translation';
  }
  
  if (lowerContent.includes('think') || lowerContent.includes('reason') ||
      lowerContent.includes('logic') || lowerContent.includes('منطق')) {
    return 'reasoning';
  }
  
  return 'general';
}

// نظام التوصيات الذكي
export function getModelRecommendation(userHistory?: {
  tasks: Record<TaskType, number>;
  avgComplexity: number;
  preferredModels: string[];
}): AIModel {
  if (!userHistory) {
    return getModelById('deepseek-chat')!;
  }
  
  // إذا كان المستخدم يفضل البرمجة
  if (userHistory.tasks.coding > userHistory.tasks.general) {
    return getOptimalModel('coding');
  }
  
  // إذا كانت المهام معقدة
  if (userHistory.avgComplexity > 7) {
    return getModelById('deepseek-v3')!;
  }
  
  // إذا كان يفضل التفكير المنطقي
  if (userHistory.tasks.reasoning > userHistory.tasks.general) {
    return getModelById('deepseek-reasoner')!;
  }
  
  // النموذج الافتراضي
  return getModelById('deepseek-chat')!;
}

// تتبع أداء النماذج
export function trackModelPerformance(modelId: string, metrics: ModelPerformance) {
  const model = getModelById(modelId);
  if (!model) return;
  
  // تحديث زمن الاستجابة (متوسط متحرك)
  model.latency = model.latency ? 
    (model.latency * 0.8 + metrics.responseTime * 0.2) : 
    metrics.responseTime;
  
  // تحديث تقييم المستخدم
  if (metrics.userRating) {
    model.userRating = model.userRating ? 
      (model.userRating * 0.9 + metrics.userRating * 0.1) : 
      metrics.userRating;
  }
  
  // تحديث درجة الدقة
  const accuracyWeight = metrics.accuracy ? 1 : 0;
  model.accuracyScore = model.accuracyScore ? 
    (model.accuracyScore * 0.95 + accuracyWeight * 0.05) : 
    accuracyWeight;
}

// تحديث إحصائيات النماذج من الخادم
export async function refreshModelStats() {
  try {
    const response = await fetch('/api/model-performance');
    const liveData = await response.json();
    
    AI_MODELS.forEach(model => {
      const liveModel = liveData.find((m: any) => m.id === model.id);
      if (liveModel) {
        model.accuracyScore = liveModel.accuracy;
        model.latency = liveModel.latency;
        model.userRating = liveModel.userRating;
      }
    });
  } catch (error) {
    console.error('Failed to refresh model stats:', error);
  }
}

// استجابة مع نظام التبديل التلقائي
export async function getResponseWithFallback(
  prompt: string, 
  preferredModelId?: string
): Promise<any> {
  const modelsToTry = preferredModelId ? 
    [preferredModelId, ...MODEL_FALLBACK_ORDER.filter(id => id !== preferredModelId)] :
    MODEL_FALLBACK_ORDER;

  for (const modelId of modelsToTry) {
    const model = getModelById(modelId);
    if (!model?.enabled) continue;
    
    try {
      const response = await fetchModelResponse(modelId, prompt);
      
      // تتبع الأداء الناجح
      trackModelPerformance(modelId, {
        modelId,
        responseTime: response.responseTime || 0,
        accuracy: true,
        timestamp: new Date()
      });
      
      return response;
    } catch (error) {
      console.error(`Model ${modelId} failed:`, error);
      
      // تتبع الأداء الفاشل
      trackModelPerformance(modelId, {
        modelId,
        responseTime: 0,
        accuracy: false,
        timestamp: new Date()
      });
    }
  }
  
  throw new Error("All models unavailable");
}

// دالة وهمية لاستدعاء النموذج (يجب استبدالها بالتنفيذ الفعلي)
async function fetchModelResponse(modelId: string, prompt: string): Promise<any> {
  // هذه دالة وهمية - يجب استبدالها بالتنفيذ الفعلي
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        content: `Response from ${modelId}: ${prompt}`,
        responseTime: Math.random() * 1000 + 100
      });
    }, Math.random() * 500 + 100);
  });
}

// فحص دوري لصحة النماذج (كل ساعة)
if (typeof window !== 'undefined') {
  setInterval(() => {
    MODEL_HEALTH_CHECK.checkModels();
    refreshModelStats();
  }, 3600000); // كل ساعة
}

