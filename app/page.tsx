"use client"

import { useState, useEffect, useRef } from 'react';
import { useChat } from "ai/react" // Re-introducing useChat
import { Button } from "@/components/ui/button" // Assuming these components are available
import { Search, Settings, User, Newspaper, ChevronDown, Paperclip, ArrowUp, ImageIcon, Sparkles, Brain, Layers } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Define a placeholder for Image component if it's not available in this environment
const Image = ({ src, alt, width, height, className }) => {
  // Use the new placeholder image URLs provided by the user
  const placeholderSrc = src.includes('88x33') 
    ? 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/e0f8aad7-058d-48db-8441-017105a8ca21' 
    : 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/e0f8aad7-058d-48db-8441-017105a8ca21';
  return <img src={placeholderSrc} alt={alt} width={width} height={height} className={className} onError={(e) => e.target.src = placeholderSrc} />;
};


export default function DrXChat() {
  // State for managing thinking animation and manifestation
  const [isThinking, setIsThinking] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = new Set();
  const [manifestationVisible, setManifestationVisible] = useState(false);
  const stageTimerRef = useRef(null);
  const thinkingStartTime = useRef(0);
  
  // Use useChat hook for AI integration
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat', // Pointing to your Next.js API route
    onResponse: () => {
      // When the AI starts responding, start the visual thinking process
      handleThinkingStart();
    },
    onFinish: () => {
      // Ensure thinking display ends when response is finished
      if (isThinking) handleThinkingEnd();
    },
    onError: (error) => {
      console.error("Chat error:", error);
      if (isThinking) handleThinkingEnd();
      // Optionally, add an error message to the chat
      // setMessages((prevMessages) => [...prevMessages, { id: `error-${Date.now()}`, role: 'assistant', content: "حدث خطأ أثناء توليد الاستجابة. يرجى المحاولة مرة أخرى." }]);
    }
  });

  // Cosmic Thinking Stages
  const THINKING_STAGES = [
    { title: "⚛️ تشكل الجسيمات الفكرية", description: "تجمع الكوانتوم المعرفي" },
    { title: "🌀 توليد حقول المعرفة", description: "بناء النماذج الأولية" },
    { title: "🌌 تشابك المفاهيم", description: "ربط المجالات المعرفية" },
    { title: "✨ تكوّن البصيرة الكونية", description: "بلورة الرؤية النهائية" }
  ];
  
  // Function to start the thinking process
  const handleThinkingStart = () => {
    setIsThinking(true);
    setManifestationVisible(true);
    thinkingStartTime.current = Date.now();
    setCurrentStage(0);
    setCompletedStages(new Set());
    
    // Advance stages with a delay
    let stageCounter = 0;
    const advanceStage = () => {
      if (stageCounter < THINKING_STAGES.length) {
        setCurrentStage(stageCounter);
        setCompletedStages(prev => new Set([...prev, stageCounter]));
        stageCounter++;
        stageTimerRef.current = setTimeout(advanceStage, 1500); // 1.5 seconds per stage
      }
    };
    
    advanceStage();
  };

  // Function to end the thinking process, ensuring minimum display time
  const handleThinkingEnd = () => {
    const elapsed = Date.now() - thinkingStartTime.current;
    const minThinkingTime = 4500; // Minimum display time for thinking: 4.5 seconds
    const remainingTime = Math.max(minThinkingTime - elapsed, 0);
    
    setTimeout(() => {
      setIsThinking(false);
      clearTimeout(stageTimerRef.current);
      
      // Show final manifestation message briefly
      setManifestationVisible(true);
      setTimeout(() => setManifestationVisible(false), 3000); // Display for 3 seconds
    }, remainingTime);
  };

  // Handle form submission - now directly uses handleSubmit from useChat
  const handleFormSubmit = (e) => {
    // handleThinkingStart will be called by useChat's onResponse
    handleSubmit(e);
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white font-inter" dir="rtl">
      {/* Cosmic Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0b15] to-[#1a1a2e]"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}></div>
        
        {/* Animated Particles */}
        {isThinking && (
          <>
            {[...Array(30)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-purple-400 opacity-40 animate-particle-float"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 8 + 2}px`,
                  height: `${Math.random() * 8 + 2}px`,
                  animationDuration: `${Math.random() * 4 + 3}s`,
                  animationDelay: `${Math.random() * 3}s`,
                  boxShadow: '0 0 8px rgba(192, 132, 252, 0.7)' // Subtle glow
                }}
              ></div>
            ))}
          </>
        )}
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-gradient-to-b from-[#0f0f1a] to-transparent backdrop-blur-sm shadow-lg">
        <div className="flex items-center justify-between h-full px-4 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative">
              <Image src="/images/drx-logo.png" alt="Dr.X" width={88} height={33} className="mr-2" />
            </div>
          </div>

          {/* Right buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-gray-300 hover:bg-white/10 transition-colors">
              <Search className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-gray-300 hover:bg-white/10 transition-colors hidden sm:flex">
              <Settings className="h-5 w-5" />
            </Button>

            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 rounded-full h-9 px-4 text-sm font-medium shadow-lg transition-all duration-300 transform hover:scale-105">
              <User className="h-4 w-4 ml-2" />
              سجل
            </Button>

            <Button
              variant="outline"
              className="rounded-full h-9 px-4 text-sm bg-transparent border-gray-600 text-gray-300 hover:bg-white/10 hover:border-blue-500 transition-all hidden sm:flex"
            >
              تسجيل الدخول
            </Button>
          </div>
        </div>
      </header>

      {/* Thinking Manifestation Overlay */}
      {manifestationVisible && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-gradient-to-br from-[#1e1b4b] to-[#0c0a26] p-8 rounded-3xl border border-purple-500/50 max-w-md text-center shadow-2xl animate-scaleIn relative overflow-hidden">
            {/* Pulsing glow effect */}
            <div className="absolute inset-0 rounded-3xl animate-pulse-glow" style={{
              boxShadow: '0 0 40px rgba(192, 132, 252, 0.6), inset 0 0 20px rgba(192, 132, 252, 0.4)'
            }}></div>

            <div className="relative z-10"> {/* Ensure content is above glow */}
              <div className="flex justify-center mb-4">
                <Sparkles className="h-14 w-14 text-yellow-300 animate-sparkle-pulse" />
              </div>
              <h3 className="text-3xl font-extrabold mb-3 text-purple-200 drop-shadow-lg">اكتمل التفكير الكوني</h3>
              <p className="text-lg mb-6 text-gray-300">د.إكس على وشك الإجابة على استفسارك...</p>
              <div className="flex justify-center space-x-4">
                {[1, 2, 3].map(num => (
                  <div 
                    key={num} 
                    className="w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center text-2xl font-bold text-white shadow-lg animate-bounce-delay"
                    style={{ animationDelay: `${num * 0.2}s` }}
                  >
                    {4 - num}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-16 min-h-screen flex flex-col">
        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-start px-4 pb-32 overflow-y-auto custom-scrollbar">
          {/* Large Logo - Only visible when no messages */}
          {messages.length === 0 && (
            <div className="mb-12 mt-24 flex flex-col items-center justify-center">
              <div className="relative">
                <Image src="/images/drx-logo-large.png" alt="Dr.X" width={320} height={64} className="max-w-full h-auto" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-full h-full bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
                </div>
              </div>
              <p className="text-center mt-6 text-gray-400 text-lg">ابدأ رحلتك المعرفية مع د.إكس</p>
            </div>
          )}

          {/* Quick Action Buttons - Mobile Only */}
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-3 justify-center mb-12 sm:hidden max-w-md w-full">
              <Button
                variant="outline"
                className="rounded-full px-5 py-3 text-base border-gray-600 bg-transparent text-gray-300 hover:bg-white/10 hover:border-blue-500 transition-all flex-1 min-w-[150px]"
              >
                <ImageIcon className="h-5 w-5 ml-2 text-gray-400" />
                تعديل الصورة
              </Button>

              <Button
                variant="outline"
                className="rounded-full px-5 py-3 text-base border-gray-600 bg-transparent text-gray-300 hover:bg-white/10 hover:border-blue-500 transition-all flex-1 min-w-[150px]"
              >
                <Newspaper className="h-5 w-5 ml-2 text-gray-400" />
                آخر الأخبار
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full px-5 py-3 text-base border-gray-600 bg-transparent text-gray-300 hover:bg-white/10 hover:border-blue-500 transition-all flex-1 min-w-[150px]"
                  >
                    <User className="h-5 w-5 ml-2" />
                    شخصيات
                    <ChevronDown className="h-4 w-4 mr-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-700 text-gray-200">
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer py-2 px-4">المميز 1</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer py-2 px-4">المتقدم 2</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Chat Messages */}
          <div className="w-full max-w-4xl mb-6 space-y-6 px-2">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] p-4 rounded-3xl shadow-md transition-all duration-300 ${
                    message.role === "user" 
                      ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-br-none" 
                      : "bg-gray-800 text-gray-100 border border-gray-700 rounded-bl-none"
                  }`}
                >
                  <p className="text-base leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            
            {/* Display Thinking Process */}
            {isThinking && (
              <div className="flex justify-start animate-fade-in-up">
                <div className="bg-gray-800 text-gray-100 p-5 rounded-3xl border border-purple-600 shadow-lg w-full max-w-[85%]">
                  <div className="space-y-4">
                    <div className="font-bold text-purple-300 mb-2 flex items-center text-lg">
                      <Brain className="h-6 w-6 ml-3 text-purple-400 animate-pulse-fast" />
                      د.إكس في حالة تفكير عميق
                      <div className="relative mr-3">
                        <span className="text-sm text-gray-400">محادثة AI</span>
                        <div className="absolute -top-2 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold border border-purple-400">
                          {currentStage + 1}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {THINKING_STAGES.map((stage, index) => (
                        <div 
                          key={index} 
                          className={`flex items-start transition-opacity duration-500 ${
                            completedStages.has(index) ? 'opacity-100' : 'opacity-60'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full flex-shrink-0 mr-3 mt-1 ${
                            index === currentStage 
                              ? 'bg-purple-500 animate-ping-once' 
                              : completedStages.has(index) 
                                ? 'bg-green-500' 
                                : 'bg-gray-600'
                          }`}></div>
                          <div>
                            <div className="font-medium text-base text-gray-200">{stage.title}</div>
                            <div className="text-sm text-gray-400">{stage.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-sm text-gray-400 flex items-center pt-2 border-t border-gray-700">
                      <Layers className="h-4 w-4 ml-2 text-blue-400" />
                      هذه العملية قد تستغرق بضع ثوانٍ بينما نستكشف أبعاد المعرفة...
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Input - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f0f1a] to-transparent p-4 z-30">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleFormSubmit}>
              <div className="bg-[#1a1b26] rounded-3xl border border-gray-700 p-4 relative backdrop-blur-sm shadow-xl focus-within:border-blue-500 transition-colors duration-300">
                {/* Text Input */}
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="ماذا تريد أن تعرف؟"
                  className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none min-h-[44px] py-2 px-2 pb-14 text-base custom-scrollbar"
                  rows={1}
                  style={{ maxHeight: '150px' }} // Limit textarea height
                />

                {/* Bottom Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* Attach Button */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full border border-gray-600 text-gray-400 hover:bg-white/10 transition-colors"
                      disabled={isLoading}
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>

                    {/* DeepSearch */}
                    <div className="flex items-center border border-gray-600 rounded-full bg-gray-900/50 overflow-hidden">
                      <Button
                        type="button"
                        variant="ghost"
                        className="rounded-r-none px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                        disabled={isLoading}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ml-2 text-blue-400">
                          <path
                            d="M2 13.8236C4.5 22.6927 18 21.3284 18 14.0536C18 9.94886 11.9426 9.0936 10.7153 11.1725C9.79198 12.737 14.208 12.6146 13.2847 14.1791C12.0574 16.2581 6 15.4029 6 11.2982C6 3.68585 20.5 2.2251 22 11.0945"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                        DeepSearch
                      </Button>
                      <div className="w-px h-6 bg-gray-600" />
                      <Button type="button" variant="ghost" size="icon" className="rounded-l-none text-gray-300 hover:bg-white/10 transition-colors" disabled={isLoading}>
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Think Button */}
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full px-4 py-2 text-sm border-gray-600 text-gray-300 hover:bg-white/10 bg-transparent transition-colors"
                      disabled={isLoading}
                    >
                      <Brain className="h-4 w-4 ml-2 text-purple-400" />
                      Think
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Model Selector */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="rounded-full px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-colors" disabled={isLoading}>
                          <span className="text-blue-400 font-medium">Dr.X 3</span>
                          <ChevronDown className="h-3 w-3 mr-2 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-800 border-gray-700 text-gray-200">
                        <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer py-2 px-4">Dr.X 3</DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer py-2 px-4">Dr.X 2</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Send Button */}
                    <Button
                      type="submit"
                      size="icon"
                      className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!input.trim() || isLoading}
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      ) : (
                        <ArrowUp className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </form>

            {/* Footer Text */}
            <div className="text-center text-xs text-gray-400 mt-4">
              بإرسالك رسالة إلى Dr.X، فإنك توافق على{" "}
              <a href="#" className="text-blue-400 hover:underline transition-colors">
                الشروط
              </a>{" "}
              و{" "}
              <a href="#" className="text-blue-400 hover:underline transition-colors">
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

