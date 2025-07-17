"use client";

import { useState, useEffect, useRef } from 'react';
import { useChat } from "ai/react";
import {
  Menu, Search, Settings, User, Code, FileText, Bot, ChevronDown, Send,
  Plus, Terminal, GitBranch, Share2, Play, Book, Zap, Lightbulb, TrendingUp,
  Database, Layout, Layers, Brain, Sparkles, ImageIcon, Newspaper, Paperclip, ArrowUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Placeholder for Image component (since Next.js Image component might not work directly in this environment)
const Image = ({ src, alt, width, height, className }) => {
  // Using a generic placeholder image for now, as specific ones were not provided for this new design
  const placeholderSrc = 'https://placehold.co/64x64/33334d/ffffff?text=AI';
  return <img src={src || placeholderSrc} alt={alt} width={width} height={height} className={className} onError={(e) => e.target.src = placeholderSrc} />;
};

// --- AI Agent Data (Simulated) ---
const aiAgents = [
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', description: 'Strikes the ideal balance between intelligence and speed', icon: 'https://placehold.co/64x64/FF8C00/ffffff?text=C3.5' },
  { id: 'llama-3-2-1b', name: 'Llama3.2:1b', description: 'Your new AI Code Assistant', icon: 'https://placehold.co/64x64/6A0DAD/ffffff?text=L3.2' },
  { id: 'llama-3-2-90b-groq', name: 'Llama 3.2 - 90B Groq', description: 'Limitless knowledge, precise answers.', icon: 'https://placehold.co/64x64/DC143C/ffffff?text=G90B' },
  { id: 'python-3-10-expert', name: 'Python 3.10 Expert', description: 'A comprehensive source for Python programming guidance', icon: 'https://placehold.co/64x64/306998/ffffff?text=PY' },
  { id: 'javascript-es13-expert', name: 'Javascript ES13 Expert', description: 'A thorough and authoritative source for all JavaScript-related queries.', icon: 'https://placehold.co/64x64/F7DF1E/000000?text=JS' },
  { id: 'gpt-4o', name: 'GPT-4o', description: 'The most advanced model for complex tasks.', icon: 'https://placehold.co/64x64/10B981/ffffff?text=G4o' },
];

// --- Code Files Data (Simulated) ---
const codeFiles = {
  'contact_page.jsx': `/**
 * Contact page that accepts a name, email, and message in a form
 */
import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent successfully!'); // Using alert for simplicity, replace with modal in production
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
`,
  'test.py': `print("Hello, CODEGPT!")
# This is a simple Python test file.
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
`,
  'app_swarm.py': `from swarm_api import Swarm, Agent

# Initialize the Swarm client
client = Swarm()

# Define the assistant agent
assistant_agent = Agent(
    name="Assistant Agent",
    instructions="You are a helpful assistant. Respond to user queries to the best of your ability.",
)

# Function to print messages nicely
def pretty_print_messages(messages):
    for message in messages:
        if message["content"] is None:
            continue
        print(f"{message['sender']}: {message['content']}")

# Initialize an empty list to store messages
messages = []

# Start the interaction loop
while True:
    user_input = input("You: ")
    if user_input.lower() == 'exit':
        break

    # Add user message to history
    messages.append({"sender": "User", "content": user_input})

    # Get response from the assistant agent
    response = client.send_message(assistant_agent, user_input)
    messages.append({"sender": "Assistant", "content": response})

    # Print messages
    pretty_print_messages(messages)
`,
  'result.python': `import os
import json
import pandas as pd
import streamlit as st
import matplotlib.pyplot as plt

def list_json_files(directory):
    return [f for f in os.listdir(directory) if f.endswith('.json')]

def load_json_file(filepath):
    with open(filepath, 'r') as file:
        return json.load(file)

def display_as_table(data):
    rows = []
    for entry in data:
        model = entry.get('model', '')
        for task in entry.get('task_get', []):
            rows.append({
                'Model': model,
                'Description': task.get('description', ''),
                'Generated Code': task.get('generated_code', ''),
                'Success': task.get('success', ''),
                'Message': task.get('message', ''),
                'Execution Time': task.get('execution_time', ''),
                'Response Time': task.get('response_time', '')
            })
    df = pd.DataFrame(rows)
    return df

def main():
    st.title("LLM Code Benchmarks")
    directory = 'results'
    json_files = list_json_files(directory)

    if not json_files:
        st.write("No JSON files found in the directory.")
        return

    selected_file = st.selectbox("Select a JSON file:", json_files)

    if selected_file:
        filepath = os.path.join(directory, selected_file)
        data = load_json_file(filepath)
        df = display_as_table(data)
        st.dataframe(df)

        # Optional: Plotting some data
        if not df.empty:
            st.subheader("Execution Times")
            fig, ax = plt.subplots()
            df.plot(kind='bar', x='Model', y='Execution Time', ax=ax)
            st.pyplot(fig)

if __name__ == "__main__":
    main()
`
};

export default function CodeGPTChat() {
  const [selectedAgent, setSelectedAgent] = useState(aiAgents[0]);
  const [selectedCodeFile, setSelectedCodeFile] = useState('contact_page.jsx');
  const [isThinking, setIsThinking] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState(new Set());
  const stageTimerRef = useRef(null);
  const thinkingStartTime = useRef(0);
  const chatContainerRef = useRef(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/chat',
    onResponse: () => {
      handleThinkingStart();
    },
    onFinish: () => {
      handleThinkingEnd();
      scrollToBottom();
    },
    onError: (error) => {
      console.error("Chat error:", error);
      handleThinkingEnd();
      // Add a user-friendly error message to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: `error-${Date.now()}`, role: 'assistant', content: "حدث خطأ أثناء توليد الاستجابة. يرجى المحاولة مرة أخرى." },
      ]);
      scrollToBottom();
    }
  });

  // Scroll to bottom of chat on new messages
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Thinking animation logic
  const THINKING_STAGES = [
    { title: "⚛️ تشكل الجسيمات الفكرية", description: "تجمع الكوانتوم المعرفي" },
    { title: "🌀 توليد حقول المعرفة", description: "بناء النماذج الأولية" },
    { title: "🌌 تشابك المفاهيم", description: "ربط المجالات المعرفية" },
    { title: "✨ تكوّن البصيرة الكونية", description: "بلورة الرؤية النهائية" }
  ];

  const handleThinkingStart = () => {
    setIsThinking(true);
    thinkingStartTime.current = Date.now();
    setCurrentStage(0);
    setCompletedStages(new Set());

    let stageCounter = 0;
    const advanceStage = () => {
      if (stageCounter < THINKING_STAGES.length) {
        setCurrentStage(stageCounter);
        setCompletedStages(prev => new Set([...prev, stageCounter]));
        stageCounter++;
        stageTimerRef.current = setTimeout(advanceStage, 1500);
      }
    };
    advanceStage();
  };

  const handleThinkingEnd = () => {
    const elapsed = Date.now() - thinkingStartTime.current;
    const minThinkingTime = 4500;
    const remainingTime = Math.max(minThinkingTime - elapsed, 0);

    setTimeout(() => {
      setIsThinking(false);
      clearTimeout(stageTimerRef.current);
    }, remainingTime);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans antialiased overflow-hidden" dir="rtl">
      {/* Sidebar */}
      <aside className="w-16 md:w-64 flex-shrink-0 bg-gray-800 border-l border-gray-700 flex flex-col transition-all duration-300 ease-in-out">
        {/* Top Menu */}
        <div className="flex items-center justify-center md:justify-start h-14 border-b border-gray-700 px-4">
          <Button variant="ghost" size="icon" className="md:hidden text-gray-400 hover:bg-gray-700 rounded-lg">
            <Menu className="h-6 w-6" />
          </Button>
          <div className="hidden md:flex items-center text-xl font-bold text-gray-100">
            <Code className="h-7 w-7 text-purple-400 mr-2" />
            CODEGPT
          </div>
        </div>

        {/* AI Agent Selector */}
        <div className="p-2 md:p-4 border-b border-gray-700">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-center md:justify-between bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 rounded-lg py-2 px-3 text-sm flex items-center">
                <Image src={selectedAgent.icon} alt={selectedAgent.name} width={24} height={24} className="rounded-full mr-0 md:mr-2" />
                <span className="hidden md:block truncate">{selectedAgent.name}</span>
                <ChevronDown className="h-4 w-4 ml-0 md:ml-2 hidden md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700 text-gray-200 w-56" key="ai-agent-dropdown">
              {aiAgents.map(agent => (
                <DropdownMenuItem key={agent.id} onClick={() => setSelectedAgent(agent)} className="flex items-center cursor-pointer hover:bg-gray-700 py-2 px-4">
                  <Image src={agent.icon} alt={agent.name} width={20} height={20} className="rounded-full mr-2" />
                  {agent.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation Icons */}
        <nav className="flex flex-col items-center md:items-start p-2 md:p-4 space-y-2 border-b border-gray-700">
          <Button variant="ghost" className="w-full justify-center md:justify-start text-gray-400 hover:bg-gray-700 rounded-lg py-2 px-3">
            <Layout className="h-6 w-6 mr-0 md:mr-3" />
            <span className="hidden md:block">Home</span>
          </Button>
          <Button variant="ghost" className="w-full justify-center md:justify-start text-gray-400 hover:bg-gray-700 rounded-lg py-2 px-3">
            <Search className="h-6 w-6 mr-0 md:mr-3" />
            <span className="hidden md:block">Search</span>
          </Button>
          <Button variant="ghost" className="w-full justify-center md:justify-start text-gray-400 hover:bg-gray-700 rounded-lg py-2 px-3">
            <FileText className="h-6 w-6 mr-0 md:mr-3" />
            <span className="hidden md:block">Files</span>
          </Button>
          <Button variant="ghost" className="w-full justify-center md:justify-start text-gray-400 hover:bg-gray-700 rounded-lg py-2 px-3">
            <Bot className="h-6 w-6 mr-0 md:mr-3" />
            <span className="hidden md:block">Agents</span>
          </Button>
        </nav>

        {/* My Agents Section */}
        <div className="flex-1 p-2 md:p-4 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-3 hidden md:flex">
            <h4 className="text-sm font-semibold text-gray-400">MY AGENTS</h4>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-purple-400">
              <Plus className="h-4 w-4" />
              <span className="ml-1">Create</span>
            </Button>
          </div>
          {/* Agent Cards (simplified) */}
          <div className="space-y-2 hidden md:block">
            {['SAP', 'Ruby on Rails', 'Next.js Expert', 'Spring Expert', 'Streamlit', 'Angular Expert', 'PyTorch Expert', 'CrewAI', 'LlamaIndex Python'].map((agentName, index) => (
              <div key={index} className="flex items-center bg-gray-700/50 rounded-lg p-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">
                <Image src="" alt={agentName} width={20} height={20} className="rounded-full mr-2" />
                {agentName}
              </div>
            ))}
          </div>
        </div>

        {/* Settings Button */}
        <div className="p-2 md:p-4 border-t border-gray-700">
          <Button variant="ghost" className="w-full justify-center md:justify-start text-gray-400 hover:bg-gray-700 rounded-lg py-2 px-3">
            <Settings className="h-6 w-6 mr-0 md:mr-3" />
            <span className="hidden md:block">Settings</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-14 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 flex-shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-100 hidden md:block">CODEGPT CHAT</h1>
            <div className="flex items-center text-gray-400 text-sm">
              <span className="ml-2">LLMCodeBenchmarks</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-gray-700 rounded-lg">
              <Code className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-gray-700 rounded-lg">
              <FileText className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-gray-700 rounded-lg">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-gray-700 rounded-lg">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Chat and Code Editor Panels */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chat Panel */}
          <div className="flex-1 flex flex-col bg-gray-900 border-l border-gray-700 overflow-hidden">
            {/* Current AI Agent Display */}
            <div className="flex flex-col items-center justify-center p-8 border-b border-gray-800 flex-shrink-0">
              <Image src={selectedAgent.icon} alt={selectedAgent.name} width={96} height={96} className="rounded-full mb-4 shadow-lg" />
              <h2 className="text-2xl font-bold text-gray-100 mb-2">{selectedAgent.name}</h2>
              <p className="text-gray-400 text-center max-w-sm">{selectedAgent.description}</p>
              <div className="flex gap-3 mt-4">
                <Button variant="outline" className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 rounded-full px-4 py-2 text-sm">
                  <Code className="h-4 w-4 mr-2" />
                  Code-Interpreter
                </Button>
                <Button variant="outline" className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 rounded-full px-4 py-2 text-sm">
                  <Book className="h-4 w-4 mr-2" />
                  Stackoverflow
                </Button>
                <Button variant="outline" className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 rounded-full px-4 py-2 text-sm">
                  <Zap className="h-4 w-4 mr-2" />
                  Codebuilder
                </Button>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-4 rounded-xl shadow-md ${
                      message.role === "user"
                        ? "bg-blue-700 text-white rounded-br-none"
                        : "bg-gray-700 text-gray-100 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}

              {/* Thinking Process Indicator */}
              {isLoading && (
                <div className="flex justify-start animate-fade-in-up">
                  <div className="bg-gray-700 text-gray-100 p-4 rounded-xl shadow-md w-full max-w-[80%] rounded-bl-none">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-purple-400"></div>
                      <span className="text-sm text-gray-300">
                        {THINKING_STAGES[currentStage]?.title || "د.إكس في حالة تفكير عميق..."}
                      </span>
                    </div>
                    {/* Optional: Display detailed thinking stages if needed */}
                    {/* <div className="space-y-2 mt-2 text-xs text-gray-400">
                      {THINKING_STAGES.map((stage, index) => (
                        <div key={index} className={`flex items-center ${completedStages.has(index) ? 'opacity-100' : 'opacity-60'}`}>
                          <span className={`w-2 h-2 rounded-full mr-2 ${index === currentStage ? 'bg-purple-400' : completedStages.has(index) ? 'bg-green-500' : 'bg-gray-600'}`}></span>
                          {stage.description}
                        </div>
                      ))}
                    </div> */}
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Area */}
            <form onSubmit={handleSubmit} className="p-4 bg-gray-800 border-t border-gray-700 flex-shrink-0">
              <div className="bg-gray-700 rounded-lg flex items-center p-2 border border-gray-600">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center text-gray-300 hover:bg-gray-600 rounded-md px-3 py-1 text-sm">
                      <Image src={aiAgents[0].icon} alt="Model" width={18} height={18} className="rounded-full mr-1" />
                      <span className="hidden sm:inline">GPT-4o</span>
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-800 border-gray-700 text-gray-200 w-48" key="model-selector-dropdown">
                    {aiAgents.map(agent => (
                      <DropdownMenuItem key={agent.id} onClick={() => setSelectedAgent(agent)} className="flex items-center cursor-pointer hover:bg-gray-700 py-2 px-4">
                        <Image src={agent.icon} alt={agent.name} width={18} height={18} className="rounded-full mr-2" />
                        {agent.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" className="flex items-center text-gray-300 hover:bg-gray-600 rounded-md px-3 py-1 text-sm mr-2">
                  <Plus className="h-4 w-4 mr-1" />
                  Import selection
                </Button>

                <textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="/ for slash commands: /Fix, /Explain, @document for file mentions"
                  className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none outline-none py-2 px-3 text-sm custom-scrollbar min-h-[40px]"
                  rows={1}
                  style={{ maxHeight: '100px' }}
                />

                <Button type="submit" size="icon" className="bg-purple-600 hover:bg-purple-700 text-white rounded-md h-9 w-9 ml-2 flex-shrink-0" disabled={isLoading || !input.trim()}>
                  {isLoading ? <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div> : <Send className="h-5 w-5" />}
                </Button>
              </div>
            </form>
          </div>

          {/* Code Editor Panel */}
          <div className="hidden md:flex flex-col flex-1 bg-gray-900 border-l border-gray-700 overflow-hidden">
            {/* File Tabs */}
            <div className="flex items-center border-b border-gray-700 flex-shrink-0">
              {Object.keys(codeFiles).map(fileName => (
                <Button
                  key={fileName}
                  variant="ghost"
                  onClick={() => setSelectedCodeFile(fileName)}
                  className={`px-4 py-2 text-sm rounded-none border-b-2 ${
                    selectedCodeFile === fileName
                      ? 'text-purple-400 border-purple-500 bg-gray-800'
                      : 'text-gray-400 border-transparent hover:bg-gray-700'
                  }`}
                >
                  {fileName}
                </Button>
              ))}
            </div>

            {/* Code Display */}
            <div className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar">
              <pre className="whitespace-pre-wrap break-words">
                <code>{codeFiles[selectedCodeFile]}</code>
              </pre>
            </div>

            {/* Editor Bottom Bar (Simulated) */}
            <div className="flex-shrink-0 border-t border-gray-700 bg-gray-800 text-xs text-gray-400 flex items-center justify-between h-8 px-4">
              <span>Line 1, Column 1</span>
              <span>Spaces: 4</span>
              <span>LF</span>
              <span>UTF-8</span>
              <span>Python 3.11.7 64-bit</span>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <footer className="h-8 bg-gray-800 border-t border-gray-700 text-xs text-gray-400 flex items-center justify-between px-4 flex-shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-purple-400">main*</span>
            <span className="flex items-center"><Lightbulb className="h-3 w-3 mr-1" /> Launchpad</span>
            <span className="flex items-center"><TrendingUp className="h-3 w-3 mr-1" /> 0 A 0</span>
            <span className="flex items-center"><Share2 className="h-3 w-3 mr-1" /> Live Share</span>
            <span className="flex items-center"><GitBranch className="h-3 w-3 mr-1" /> Git Graph</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700 rounded-md h-6 px-2">
              <Play className="h-3 w-3 mr-1" /> Go Live
            </Button>
            <span>CODEGPT</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

