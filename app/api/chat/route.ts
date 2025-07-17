import { streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'

export const maxDuration = 60

// إعداد DeepSeek مع تحسينات متقدمة
const deepseek = createOpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
})

// نظام ذاكرة المحادثة الذكية
class ConversationMemory {
  constructor() {
    this.context = {
      userProfile: {},
      conversationHistory: [],
      expertise: {},
      preferences: {}
    }
  }

  analyzeUser(messages) {
    // تحليل شخصية المستخدم وأسلوبه
    const userPatterns = {
      technical: messages.filter(m => /كود|برمجة|تقني|API/i.test(m.content)).length,
      creative: messages.filter(m => /إبداع|فكرة|تصميم|مبتكر/i.test(m.content)).length,
      analytical: messages.filter(m => /تحليل|إحصائية|بيانات|دراسة/i.test(m.content)).length,
      conversational: messages.filter(m => /كيف|ماذا|لماذا|أريد/i.test(m.content)).length
    }

    const dominantStyle = Object.entries(userPatterns)
      .sort(([,a], [,b]) => b - a)[0][0]

    this.context.userProfile = {
      dominantStyle,
      patterns: userPatterns,
      complexity: this.calculateComplexity(messages),
      language: this.detectLanguage(messages)
    }

    return this.context.userProfile
  }

  calculateComplexity(messages) {
    const avgLength = messages.reduce((sum, m) => sum + m.content.length, 0) / messages.length
    if (avgLength > 200) return 'high'
    if (avgLength > 100) return 'medium'
    return 'low'
  }

  detectLanguage(messages) {
    const arabicRegex = /[\u0600-\u06FF]/
    const englishRegex = /[a-zA-Z]/
    
    let arabicCount = 0
    let englishCount = 0
    
    messages.forEach(m => {
      arabicCount += (m.content.match(arabicRegex) || []).length
      englishCount += (m.content.match(englishRegex) || []).length
    })
    
    return arabicCount > englishCount ? 'arabic' : 'mixed'
  }
}

// نظام التكيف الذكي
class AdaptiveResponse {
  constructor() {
    this.strategies = {
      expert: {
        temperature: 0.2,
        maxTokens: 4096,
        systemPrompt: `أنت خبير متخصص. قدم إجابات عميقة وتفصيلية مع مراجع ومصادر.`
      },
      teacher: {
        temperature: 0.4,
        maxTokens: 3072,
        systemPrompt: `أنت معلم ماهر. اشرح المفاهيم خطوة بخطوة مع أمثلة واضحة.`
      },
      creative: {
        temperature: 0.8,
        maxTokens: 2048,
        systemPrompt: `أنت مبدع ومبتكر. فكر خارج الصندوق وقدم أفكار جديدة.`
      },
      analytical: {
        temperature: 0.3,
        maxTokens: 3584,
        systemPrompt: `أنت محلل خبير. قدم تحليل منطقي مع بيانات وإحصائيات.`
      }
    }
  }

  selectStrategy(userProfile, queryType) {
    const mapping = {
      technical: 'expert',
      creative: 'creative',
      analytical: 'analytical',
      conversational: 'teacher'
    }

    return this.strategies[mapping[userProfile.dominantStyle] || 'teacher']
  }
}

// نظام التفكير المتقدم
class AdvancedReasoning {
  constructor() {
    this.reasoningTypes = {
      deductive: 'الاستنتاج من العام للخاص',
      inductive: 'الاستنتاج من الخاص للعام', 
      abductive: 'البحث عن أفضل تفسير',
      causal: 'تحليل الأسباب والنتائج',
      analogical: 'القياس والتشبيه'
    }
  }

  async analyzeReasoningNeeded(query) {
    const analysis = await generateObject({
      model: deepseek('deepseek-chat'),
      schema: z.object({
        primaryReasoning: z.enum(['deductive', 'inductive', 'abductive', 'causal', 'analogical']),
        secondaryReasoning: z.array(z.enum(['deductive', 'inductive', 'abductive', 'causal', 'analogical'])),
        complexityLevel: z.enum(['basic', 'intermediate', 'advanced', 'expert']),
        requiredSteps: z.array(z.string()),
        potentialBiases: z.array(z.string())
      }),
      prompt: `حلل نوع التفكير المطلوب للإجابة على: "${query}"

      حدد:
      1. نوع التفكير الأساسي المطلوب
      2. أنواع التفكير الثانوية المساعدة
      3. مستوى التعقيد
      4. الخطوات المطلوبة
      5. التحيزات المحتملة التي يجب تجنبها`
    })

    return analysis.object
  }

  generateReasoningPrompt(analysis) {
    return `
🧠 **نوع التفكير المطلوب:** ${this.reasoningTypes[analysis.primaryReasoning]}

📋 **الخطوات المطلوبة:**
${analysis.requiredSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

⚠️ **تجنب هذه التحيزات:** ${analysis.potentialBiases.join(', ')}

🎯 **المستوى:** ${analysis.complexityLevel}

**تعليمات التفكير:**
- فكر بشكل منهجي وواضح
- اعرض منطق تفكيرك
- تحقق من صحة الاستنتاجات
- انتبه للتحيزات المحتملة`
  }
}

// نظام التحقق من الجودة
class QualityAssurance {
  constructor() {
    this.checks = {
      accuracy: 'دقة المعلومات',
      completeness: 'شمولية الإجابة',
      clarity: 'وضوح التعبير',
      relevance: 'مدى الصلة بالسؤال',
      depth: 'عمق التحليل'
    }
  }

  async evaluateResponse(query, response) {
    const evaluation = await generateObject({
      model: deepseek('deepseek-chat'),
      schema: z.object({
        scores: z.object({
          accuracy: z.number().min(0).max(10),
          completeness: z.number().min(0).max(10),
          clarity: z.number().min(0).max(10),
          relevance: z.number().min(0).max(10),
          depth: z.number().min(0).max(10)
        }),
        overallScore: z.number().min(0).max(10),
        improvements: z.array(z.string()),
        strengths: z.array(z.string())
      }),
      prompt: `قيم هذه الإجابة على السؤال:

      السؤال: "${query}"
      الإجابة: "${response.substring(0, 1000)}..."

      قيم من 1-10 في:
      - دقة المعلومات
      - شمولية الإجابة  
      - وضوح التعبير
      - مدى الصلة بالسؤال
      - عمق التحليل

      واقترح تحسينات ونقاط قوة.`
    })

    return evaluation.object
  }
}

// النظام الرئيسي المحسن
export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1]?.content

    // تهيئة الأنظمة المتقدمة
    const memory = new ConversationMemory()
    const adaptive = new AdaptiveResponse()
    const reasoning = new AdvancedReasoning()
    const quality = new QualityAssurance()

    // تحليل المستخدم والسياق
    const userProfile = memory.analyzeUser(messages)
    const reasoningAnalysis = await reasoning.analyzeReasoningNeeded(lastMessage)
    const strategy = adaptive.selectStrategy(userProfile, reasoningAnalysis.primaryReasoning)

    // إنشاء prompt متقدم
    const enhancedSystemPrompt = `
${strategy.systemPrompt}

🎯 **معلومات السياق:**
- نمط المستخدم: ${userProfile.dominantStyle}
- مستوى التعقيد: ${userProfile.complexity}
- نوع التفكير المطلوب: ${reasoningAnalysis.primaryReasoning}

${reasoning.generateReasoningPrompt(reasoningAnalysis)}

🔧 **قدراتك المتقدمة:**
- تحليل عميق متعدد الزوايا
- تفكير نقدي منهجي
- استنتاجات مبنية على أدلة
- تكيف مع أسلوب المستخدم
- التحقق من صحة المعلومات

💡 **منهجية الإجابة:**
1. افهم السؤال بعمق
2. حدد المعلومات المطلوبة
3. طبق نوع التفكير المناسب
4. قدم إجابة شاملة ومنطقية
5. تحقق من الجودة

⚡ **الهدف:** تقديم إجابة عالية الجودة تناسب احتياجات المستخدم بدقة.`

    // إنشاء الاستجابة المتقدمة
    const result = streamText({
      model: deepseek('deepseek-chat'),
      messages: [
        ...messages.slice(0, -1),
        {
          role: 'user',
          content: `${lastMessage}

          [سياق إضافي: نمط المستخدم = ${userProfile.dominantStyle}, مستوى التعقيد = ${userProfile.complexity}]`
        }
      ],
      system: enhancedSystemPrompt,
      temperature: strategy.temperature,
      maxTokens: strategy.maxTokens,
      
      // معايير جودة متقدمة
      frequencyPenalty: 0.1, // تقليل التكرار
      presencePenalty: 0.1,   // تشجيع التنوع
      
      // إضافة أدوات متقدمة
      tools: {
        deepAnalysis: {
          description: 'تحليل عميق للسؤال مع تطبيق نوع التفكير المناسب',
          parameters: z.object({
            query: z.string(),
            reasoningType: z.enum(['deductive', 'inductive', 'abductive', 'causal', 'analogical'])
          }),
          execute: async ({ query, reasoningType }) => {
            // تطبيق نوع التفكير المحدد
            const analysis = await generateObject({
              model: deepseek('deepseek-chat'),
              schema: z.object({
                keyPoints: z.array(z.string()),
                reasoning: z.array(z.string()),
                conclusions: z.array(z.string()),
                confidence: z.number().min(0).max(1)
              }),
              prompt: `طبق التفكير ${reasoningType} على: "${query}"
              
              قدم تحليل عميق مع:
              1. النقاط الرئيسية
              2. خطوات التفكير
              3. الاستنتاجات
              4. 4. مستوى الثقة`
            })
            
            return analysis.object
          }
        },

        qualityCheck: {
          description: 'فحص جودة الإجابة وتحسينها',
          parameters: z.object({
            response: z.string(),
            originalQuery: z.string()
          }),
          execute: async ({ response, originalQuery }) => {
            const evaluation = await quality.evaluateResponse(originalQuery, response)
            
            return {
              evaluation,
              timestamp: new Date().toISOString()
            }
          }
        }
      },

      // مراقبة الأداء
      onFinish: async (result) => {
        console.log(`✅ Response generated: ${result.text?.length || 0} chars`)
        console.log(`🎯 User profile: ${JSON.stringify(userProfile)}`)
        console.log(`🧠 Reasoning used: ${reasoningAnalysis.primaryReasoning}`)
      }
    })

    return result.toDataStreamResponse()

  } catch (error) {
    console.error('❌ Enhanced Model Error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'حدث خطأ في النموذج المحسن. يرجى المحاولة مرة أخرى.',
        type: 'enhanced_model_error',
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

// تصدير الفئات للاستخدام المتقدم
export { ConversationMemory, AdaptiveResponse, AdvancedReasoning, QualityAssurance }

