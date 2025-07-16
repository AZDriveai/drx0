"use client"

import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Search, Settings, User, Newspaper, ChevronDown, Paperclip, ArrowUp, ImageIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

export default function DrXChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  return (
    <div className="min-h-screen bg-[#1e1f22] text-white" dir="rtl">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-gradient-to-b from-[#1e1f22] to-transparent">
        <div className="flex items-center justify-between h-full px-4">
          {/* Logo */}
          <div className="flex items-center">
            <Image src="/images/drx-logo.png" alt="Dr.X" width={88} height={33} className="mr-2" />
          </div>

          {/* Right buttons */}
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
        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-32">
          {/* Large Logo */}
          <div className="mb-8">
            <Image src="/images/drx-logo.png" alt="Dr.X" width={320} height={64} className="max-w-full h-auto" />
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
                  <User className="h-4 w-4 ml-2 text-gray-400" />
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
          {messages.length > 0 && (
            <div className="w-full max-w-4xl mb-6 space-y-4 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-100"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-gray-100 p-4 rounded-2xl">Dr.X يكتب...</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Chat Input - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#1e1f22] p-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="bg-[#2a2d31] rounded-3xl border border-gray-600 p-4 relative">
                {/* Text Input */}
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="ماذا تريد أن تعرف؟"
                  className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none min-h-[44px] py-2 px-2 mb-12"
                  rows={1}
                />

                {/* Bottom Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* Attach Button */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full border border-gray-600 hover:bg-white/10"
                      disabled
                    >
                      <Paperclip className="h-4 w-4 text-gray-400" />
                    </Button>

                    {/* DeepSearch */}
                    <div className="flex items-center border border-gray-600 rounded-full">
                      <Button
                        type="button"
                        variant="ghost"
                        className="rounded-r-none px-4 py-2 text-sm hover:bg-white/10"
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
                    {/* Model Selector */}
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

                    {/* Send Button */}
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

            {/* Footer Text */}
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
