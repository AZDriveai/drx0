import { xai } from "@ai-sdk/xai"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: xai("grok-3"),
    messages,
    system: "أنت Dr.X، مساعد ذكي يتحدث باللغة العربية. كن مفيداً ومهذباً في إجاباتك.",
  })

  return result.toDataStreamResponse()
}
