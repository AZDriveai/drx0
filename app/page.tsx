"use client"

import { useChat } from "ai/react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Search, Settings, User, Newspaper, ChevronDown, Paperclip, ArrowUp, ImageIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

// مكون خطوات التفكير الإبداعي
const ThinkingStep = ({ step, isActive, isCompleted, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const getStepColor = (type) => {
    const colors = {
      analyze: 'from-blue-500 to-cyan-400',
      search: 'from-purple-500 to-pink-400', 
      generate: 'from-green-500 to-emerald-400',
      complete: 'from-yellow-500 to-orange-400'
    }
    return colors[type] || 'from-gray-500 to-gray-400'
  }

  const getStepIcon = (type) => {
    const icons = {
      analyze: '🧠',
      search: '🔍', 
      generate: '✨',
      complete: '✅'
    }
    return icons[type] || '⚡'
  }

  if (!isVisible) return null

  return (
    <div className={`thinking-step-container ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
      <div className="thinking-step-content">
        <div className={`thinking-step-icon bg-gradient-to-r ${getStepColor(step.type)}`}>
          <span className="step-emoji">{getStepIcon(step.type)}</span>
        </div>
        <div className="thinking-step-text">
          <div className="step-title">{step.title}</div>
          <div className="step-description">{step.description}</div>
          {isActive && (
            <div className="thinking-dots">
              <span></span><span></span><span></span>
            </div>
          )}
        </div>
        {isActive && (
          <div className="progress-bar">
            <div className={`progress-fill bg-gradient-to-r ${getStepColor(step.type)}`}></div>
          </div>
        )}
      </div>
    </div>
  )
}

// مكون التفكير الرئيسي
const ThinkingProcess = ({ isThinking, currentStep, webSearchActive }) => {
  const [steps, setSteps] = useState([])
  const [completedSteps, setCompletedSteps] = useState(new Set())

  useEffect(() => {
    if (isThinking) {
      const thinkingSteps = [
        {
          type: 'analyze',
          title: 'تحليل السؤال',
          description: 'جاري تحليل وفهم السؤال المطروح...'
        },
        {
          type: 'search', 
          title: webSearchActive ? 'البحث في الويب' : 'البحث في المعرفة',
          description: webSearchActive ? 'جاري البحث في الإنترنت عن المعلومات...' : 'جاري البحث في قاعدة المعرفة...'
        },
        {
          type: 'generate',
          title: 'صياغة الإجابة',
          description: 'جاري تجميع المعلومات وصياغة الرد الأمثل...'
        }
      ]
      setSteps(thinkingSteps)
      setCompletedSteps(new Set())
    }
  }, [isThinking, webSearchActive])

  useEffect(() => {
    if (currentStep > 0 && currentStep <= steps.length) {
      const timer = setTimeout(() => {
        setCompletedSteps(prev => new Set([...prev, currentStep - 1]))
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentStep, steps.length])

  if (!isThinking || steps.length === 0) return null

  return (
    <div className="thinking-container">
      <div className="thinking-header">
        <div className="thinking-header-icon">
          <div className="brain-animation">🧠</div>
        </div>
        <div className="thinking-header-text">
          <div className="thinking-title">Dr.X يفكر...</div>
          <div className="thinking-subtitle">معالجة متقدمة للحصول على أفضل إجابة</div>
        </div>
        <div className="thinking-spinner">
          <div className="spinner-ring"></div>
        </div>
      </div>
      
      <div className="thinking-steps">
        {steps.map((step, index) => (
          <ThinkingStep
            key={index}
            step={step}
            isActive={currentStep === index + 1}
            isCompleted={completedSteps.has(index)}
            delay={index * 300}
          />
        ))}
      </div>
      
      <div className="thinking-footer">
        <div className="code-line">
          <span className="code-comment">// معالجة الطلب باستخدام الذكاء الاصطناعي المتقدم</span>
        </div>
        <div className="code-line">
          <span className="code-keyword">await</span> <span className="code-function">processQuery</span>(<span className="code-string">"{steps[currentStep - 1]?.title || 'جاري المعالجة'}"</span>);
        </div>
      </div>
    </div>
  )
}

// مكون عرض الرسائل مع تنسيق Markdown
const MessageContent = ({ content }) => {
  // تحويل النص إلى HTML مع دعم Markdown
  const formatMessage = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // النص العريض
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // النص المائل
      .replace(/`(.*?)`/g, '<code class="bg-gray-700 px-1 py-0.5 rounded text-sm">$1</code>') // الكود
      .replace(/\n/g, '<br>') // أسطر جديدة
  }

  return (
    <div 
      className="message-content"
      dangerouslySetInnerHTML={{ __html: formatMessage(content) }}
    />
  )
}

export default function DrXChat() {
  const [isThinking, setIsThinking] = useState(false)
  const [currentThinkingStep, setCurrentThinkingStep] = useState(0)
  const [webSearchActive, setWebSearchActive] = useState(false)
  const [thinkingTimeout, setThinkingTimeout] = useState(null)
  
  // استخدام useCallback لمنع إعادة الإنشاء المستمر للدوال
  const handleThinkingStart = useCallback(() => {
    setIsThinking(true)
    setCurrentThinkingStep(1)
  }, [])

  const handleThinkingProgress = useCallback(async () => {
    // محاكاة خطوات التفكير بطريقة آمنة
    const steps = [1, 2, 3]
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => {
        const timeout = setTimeout(() => {
          setCurrentThinkingStep(steps[i])
          resolve()
        }, 1500)
        setThinkingTimeout(timeout)
      })
    }
  }, [])

  const handleThinkingEnd = useCallback(() => {
    if (thinkingTimeout) {
      clearTimeout(thinkingTimeout)
      setThinkingTimeout(null)
    }
    setIsThinking(false)
    setCurrentThinkingStep(0)
    setWebSearchActive(false)
  }, [thinkingTimeout])

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    onRequest: handleThinkingStart,
    onResponse: handleThinkingProgress,
    onFinish: handleThinkingEnd,
    onError: handleThinkingEnd
  })

  // تنظيف المؤقتات عند إلغاء تحميل المكون
  useEffect(() => {
    return () => {
      if (thinkingTimeout) {
        clearTimeout(thinkingTimeout)
      }
    }
  }, [thinkingTimeout])

  const handleThinkClick = useCallback((e) => {
    e.preventDefault()
    setWebSearchActive(false)
    if (input.trim()) {
      handleSubmit(e)
    }
  }, [input, handleSubmit])

  const handleWebSearchClick = useCallback((e) => {
    e.preventDefault()
    setWebSearchActive(true)
    if (input.trim()) {
      handleSubmit(e)
    }
  }, [input, handleSubmit])

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault()
    if (input.trim()) {
      handleSubmit(e)
    }
  }, [input, handleSubmit])

  return (
    <div className="min-h-screen bg-[#1e1f22] text-white" dir="rtl">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-gradient-to-b from-[#1e1f22] to-transparent">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center">
            <div className="text-red-500 text-2xl font-bold">dr x</div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-white/10">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-white/10 hidden sm:flex">
              <Settings className="h-5 w-5" />
            </Button>
            <Button className="bg-white text-black hover:bg-gray-200 rounded-full h-8 px-3 text-sm">
              <User className="h-4 w-4 ml-2" />
              سجل
            </Button>
            <Button
              variant="outline"
              className="rounded-full h-8 px-3 text-sm bg-transparent border-gray-600 hover:bg-white/10 hidden sm:flex"
            >
              تسجيل الدخول
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-32">
          <div className="mb-8">
            <div className="text-red-500 text-6xl font-bold text-center">dr x</div>
          </div>

          {/* Quick Action Buttons - Mobile Only */}
          <div className="flex flex-wrap gap-2 justify-center mb-8 sm:hidden">
            <Button
              variant="outline"
              className="rounded-full px-4 py-2 text-sm border-gray-600 bg-transparent hover:bg-white/10"
            >
              <ImageIcon className="h-4 w-4 ml-2 text-gray-400" />
              تعديل الصورة
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-4 py-2 text-sm border-gray-600 bg-transparent hover:bg-white/10"
            >
              <Newspaper className="h-4 w-4 ml-2 text-gray-400" />
              آخر الأخبار
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full px-4 py-2 text-sm border-gray-600 bg-transparent hover:bg-white/10"
                >
                  <User className="h-4 w-4 ml-2" />
                  شخصيات
                  <ChevronDown className="h-3 w-3 mr-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-700">
                <DropdownMenuItem>شخصية 1</DropdownMenuItem>
                <DropdownMenuItem>شخصية 2</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Chat Messages */}
          {(messages.length > 0 || isThinking) && (
            <div className="w-full max-w-4xl mb-6 space-y-4 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.role === "user" 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-800 text-gray-100 border border-gray-700"
                    }`}
                  >
                    <MessageContent content={message.content} />
                  </div>
                </div>
              ))}
              
              {/* مؤشر التفكير الاحترافي */}
              <ThinkingProcess 
                isThinking={isThinking} 
                currentStep={currentThinkingStep}
                webSearchActive={webSearchActive}
              />
            </div>
          )}
        </div>

        {/* Chat Input - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#1e1f22] p-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleFormSubmit}>
              <div className="bg-[#2a2d31] rounded-3xl border border-gray-600 p-4 relative">
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="ماذا تريد أن تعرف؟"
                  className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none min-h-[44px] py-2 px-2 mb-12"
                  rows={1}
                  disabled={isLoading}
                />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full border border-gray-600 hover:bg-white/10"
                      disabled
                    >
                      <Paperclip className="h-4 w-4 text-gray-400" />
                    </Button>

                    {/* DeepSearch Button */}
                    <div className="flex items-center border border-gray-600 rounded-full">
                      <Button
                        type="button"
                        variant="ghost"
                        className="rounded-r-none px-4 py-2 text-sm hover:bg-white/10"
                        onClick={handleWebSearchClick}
                        disabled={isLoading}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ml-2">
                          <path
                            d="M2 13.8236C4.5 22.6927 18 21.3284 18 14.0536C18 9.94886 11.9426 9.0936 10.7153 11.1725C9.79198 12.737 14.208 12.6146 13.2847 14.1791C12.0574 16.2581 6 15.4029 6 11.2982C6 3.68585 20.5 2.2251 22 11.0945"
                            stroke="currentColor"
                          />
                        </svg>
                        DeepSearch
                      </Button>
                      <div className="w-px h-4 bg-gray-600" />
                      <Button type="button" variant="ghost" size="icon" className="rounded-l-none hover:bg-white/10">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Think Button */}
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full px-4 py-2 text-sm border-gray-600 hover:bg-white/10 bg-transparent"
                      onClick={handleThinkClick}
                      disabled={isLoading}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ml-2">
                        <path
                          d="M15 16.1378L14.487 15.2794L14 15.5705V16.1378H15ZM8.99997 16.1378H9.99997V15.5705L9.51293 15.2794L8.99997 16.1378ZM18 9C18 11.4496 16.5421 14.0513 14.487 15.2794L15.5129 16.9963C18.1877 15.3979 20 12.1352 20 9H18Z"
                          fill="currentColor"
                        />
                        <path d="M9 16.0001H15" stroke="currentColor" />
                        <path d="M12 16V12" stroke="currentColor" strokeLinecap="square" />
                      </svg>
                      Think
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="rounded-full px-4 py-2 text-sm hover:bg-white/10">
                          <span className="text-blue-400">Dr.X 3</span>
                          <ChevronDown className="h-3 w-3 mr-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-800 border-gray-700">
                        <DropdownMenuItem>Dr.X 3</DropdownMenuItem>
                        <DropdownMenuItem>Dr.X 2</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                      type="submit"
                      size="icon"
                      className="h-10 w-10 rounded-full bg-gray-600 hover:bg-gray-500"
                      disabled={!input.trim() || isLoading}
                    >
                      <ArrowUp className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </form>

            <div className="text-center text-xs text-gray-400 mt-4">
              بإرسالك رسالة إلى Dr.X، فإنك توافق على{" "}
              <a href="#" className="text-blue-400 hover:underline">
                الشروط
              </a>{" "}
              و{" "}
              <a href="#" className="text-blue-400 hover:underline">
                سياسة الخصوصية
              </a>
              .
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
