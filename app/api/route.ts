import { type NextRequest, NextResponse } from "next/server"
import { db } from "./utils/database"
import { deepseekAPI, type DeepSeekMessage } from "./utils/deepseek-api"

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId, userId } = await request.json()

    if (!message || !userId) {
      return NextResponse.json({ error: "الرسالة ومعرف المستخدم مطلوبان" }, { status: 400 })
    }

    let currentConversationId = conversationId

    // إنشاء محادثة جديدة إذا لم تكن موجودة
    if (!currentConversationId) {
      const title = await deepseekAPI.generateTitle(message)
      const conversation = await db.createConversation(userId, title)
      currentConversationId = conversation.id
    }

    // حفظ رسالة المستخدم
    await db.addMessage(currentConversationId, "user", message)

    // الحصول على تاريخ المحادثة
    const messages = await db.getMessages(currentConversationId)

    // تحويل الرسائل لتنسيق DeepSeek
    const deepseekMessages: DeepSeekMessage[] = [
      {
        role: "system",
        content: `أنت Dr.X، مساعد ذكي متطور ومتخصص. تتميز بالذكاء والمعرفة الواسعة والقدرة على المساعدة في جميع المجالات.

خصائصك:
- تجيب باللغة العربية بطريقة واضحة ومفهومة
- تقدم معلومات دقيقة ومفيدة
- تتفاعل بطريقة ودودة ومهذبة
- تساعد في حل المشاكل بطريقة إبداعية
- تقدم أمثلة عملية عند الحاجة

أجب بطريقة مفيدة ومناسبة للسياق.`,
      },
      ...messages.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
    ]

    const startTime = Date.now()

    // إرسال الطلب إلى DeepSeek
    const response = await deepseekAPI.chat(deepseekMessages, {
      temperature: 0.7,
      max_tokens: 2000,
    })

    const processingTime = Date.now() - startTime
    const assistantMessage = response.choices[0]?.message?.content || "عذراً، لم أتمكن من إنتاج رد مناسب."

    // حفظ رد المساعد
    await db.addMessage(
      currentConversationId,
      "assistant",
      assistantMessage,
      response.usage?.total_tokens,
      processingTime,
      0.95, // confidence score
    )

    // تسجيل إحصائيات الاستخدام
    await db.logUsage({
      user_id: userId,
      conversation_id: currentConversationId,
      request_type: "chat_completion",
      model_used: "deepseek-chat",
      provider_used: "deepseek",
      tokens_consumed: response.usage?.total_tokens || 0,
      processing_time: processingTime,
      success: true,
    })

    return NextResponse.json({
      success: true,
      message: assistantMessage,
      conversationId: currentConversationId,
      tokensUsed: response.usage?.total_tokens,
      processingTime,
    })
  } catch (error: any) {
    // **تحسين: تسجيل الخطأ الكامل لتشخيص أفضل**
    console.error("Chat API Error (detailed):", error) // سجل كائن الخطأ بالكامل
    console.error("Error message:", error.message)
    if (error.stack) {
      console.error("Error stack:", error.stack)
    }
    // تحقق من خصائص الأخطاء الخاصة بـ OpenAI SDK
    if (error.status) {
      console.error("Error status (from API):", error.status)
    }
    if (error.code) {
      console.error("Error code (from API):", error.code)
    }
    if (error.type) {
      console.error("Error type (from API):", error.type)
    }
    if (error.param) {
      console.error("Error param (from API):", error.param)
    }
    if (error.value) {
      console.error("Error value (from API):", error.value)
    }
    if (error.response) {
      console.error("Error response data (raw):", error.response.data)
      console.error("Error response status (raw):", error.response.status)
      console.error("Error response headers (raw):", error.response.headers)
    }

    // Log usage for failed requests
    const conversationIdForLog = conversationId || "unknown"
    const userIdForLog = userId || "unknown"

    await db.logUsage({
      user_id: userIdForLog,
      conversation_id: conversationIdForLog,
      request_type: "chat_completion",
      model_used: "deepseek-chat",
      provider_used: "deepseek",
      tokens_consumed: 0,
      processing_time: 0,
      success: false,
      error_message: typeof error.message === "string" ? error.message : "An unknown error occurred.",
    })

    return NextResponse.json(
      {
        error: "حدث خطأ أثناء معالجة طلبك",
        details: typeof error.message === "string" ? error.message : "خطأ غير معروف",
      },
      { status: 500 },
    )
  }
}
