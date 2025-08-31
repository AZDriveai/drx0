// تكوين مفاتيح API من متغيرات البيئة
export const API_KEYS = {
  DEEPSEEK_API_KEY: import.meta.env.VITE_DEEPSEEK_API_KEY || "sk-94af74f2b4fe4e98a8b1ec389dc6ec4b",
  DEEPSEEK_API_URL: import.meta.env.VITE_DEEPSEEK_API_URL || "https://api.deepseek.com/v1",
  HF_TOKEN: import.meta.env.VITE_HF_TOKEN || "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",
  HF_URL: import.meta.env.VITE_HF_URL || "https://router.huggingface.co/v1/chat/completions",
  GROQ_API_KEY: import.meta.env.VITE_GROQ_API_KEY || "gsk_your_groq_key_here",
  DATABASE_URL: import.meta.env.VITE_DATABASE_URL || ""
};

// إعدادات التطبيق
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || "Dr.X AI Assistant",
  version: import.meta.env.VITE_APP_VERSION || "1.0.0",
  description: "مساعد ذكي متقدم يدعم نماذج متعددة للذكاء الاصطناعي",
  supportedModels: ["deepseek", "huggingface", "groq"],
  defaultModel: "deepseek",
  maxTokensPerModel: 5000,
  enableStreaming: true,
  enableArabicSupport: true
};

// إعدادات واجهة المستخدم
export const UI_CONFIG = {
  theme: {
    primary: "#3b82f6", // blue-500
    secondary: "#8b5cf6", // purple-500
    accent: "#06b6d4", // cyan-500
    background: "#f8fafc", // slate-50
    surface: "#ffffff"
  },
  animations: {
    enabled: true,
    duration: 300
  },
  rtl: true // دعم اللغة العربية
};

