# هيكل مشروع DRX - منصة الذكاء الاصطناعي المتقدمة

## نظرة عامة على المشروع

DRX هو تطبيق ويب متقدم مبني بتقنية Next.js 15 يوفر منصة شاملة للتفاعل مع نماذج الذكاء الاصطناعي المختلفة. يدعم المشروع المحادثات التفاعلية وإنشاء المحتوى المتنوع مع واجهة مستخدم عربية متطورة.

## البنية التقنية الشاملة

### 1. الهيكل الأساسي للمشروع

```
drx/
├── 📁 app/                     # Next.js App Router
│   ├── 📁 api/                # API Routes
│   │   ├── 📄 auth.ts         # نظام المصادقة
│   │   └── 📄 route.ts        # المسارات العامة
│   ├── 📁 auth/               # صفحات المصادقة
│   │   ├── 📁 signin/         # صفحة تسجيل الدخول
│   │   ├── 📁 error/          # صفحة أخطاء المصادقة
│   │   └── 📁 guest/          # وضع الضيف
│   ├── 📄 layout.tsx          # التخطيط الرئيسي
│   ├── 📄 page.tsx            # الصفحة الرئيسية
│   └── 📄 globals.css         # التصميم العام
│
├── 📁 components/             # مكونات React
│   ├── 📁 ui/                # مكونات واجهة المستخدم الأساسية
│   │   ├── 📄 button.tsx     # مكون الأزرار
│   │   ├── 📄 input.tsx      # مكون الإدخال
│   │   ├── 📄 card.tsx       # مكون البطاقات
│   │   ├── 📄 sidebar.tsx    # مكون الشريط الجانبي
│   │   └── 📄 ...            # مكونات أخرى
│   ├── 📄 chat.tsx           # مكون المحادثة الرئيسي
│   ├── 📄 auth-form.tsx      # نموذج المصادقة
│   ├── 📄 app-sidebar.tsx    # الشريط الجانبي للتطبيق
│   ├── 📄 icons.tsx          # مجموعة الأيقونات
│   └── 📄 ...                # مكونات أخرى
│
├── 📁 lib/                    # مكتبات ومساعدات
│   ├── 📁 db/                # إعدادات قاعدة البيانات
│   │   ├── 📄 schema.ts      # مخطط قاعدة البيانات
│   │   ├── 📄 migrate.ts     # ملف الهجرة
│   │   └── 📄 index.ts       # الاتصال بقاعدة البيانات
│   ├── 📁 ai/                # تكامل الذكاء الاصطناعي
│   │   └── 📁 tools/         # أدوات الذكاء الاصطناعي
│   ├── 📁 actions/           # إجراءات الخادم
│   ├── 📁 config/            # إعدادات النماذج
│   ├── 📁 schemas/           # مخططات التحقق
│   ├── 📁 tools/             # أدوات مساعدة
│   ├── 📁 types/             # تعريفات الأنواع
│   └── 📄 utils.ts           # دوال مساعدة
│
├── 📁 hooks/                  # React Hooks مخصصة
│   ├── 📄 use-chat-visibility.ts
│   ├── 📄 use-messages.tsx
│   └── 📄 ...
│
├── 📁 utils/                  # أدوات مساعدة
│   ├── 📁 ai/                # أدوات الذكاء الاصطناعي
│   └── 📄 utils.ts           # دوال عامة
│
├── 📁 styles/                 # ملفات التصميم
│   └── 📄 globals.css        # التصميم العام
│
├── 📁 public/                 # الملفات الثابتة
│   ├── 📁 images/            # الصور
│   └── 📄 ...                # ملفات أخرى
│
├── 📁 tests/                  # اختبارات المشروع
│   ├── 📁 e2e/              # اختبارات شاملة
│   ├── 📁 pages/            # اختبارات الصفحات
│   └── 📁 routes/           # اختبارات المسارات
│
├── 📄 package.json           # تبعيات المشروع
├── 📄 tsconfig.json          # إعدادات TypeScript
├── 📄 tailwind.config.ts     # إعدادات Tailwind
├── 📄 next.config.js         # إعدادات Next.js
├── 📄 drizzle.config.ts      # إعدادات Drizzle ORM
├── 📄 .env.local             # متغيرات البيئة
└── 📄 README.md              # وثائق المشروع
```

## 2. المكونات الأساسية

### أ. نظام المصادقة (Authentication System)
- **الملفات الرئيسية**: `app/api/auth.ts`, `components/auth-form.tsx`
- **الميزات**:
  - تسجيل الدخول عبر Google OAuth
  - وضع الضيف للاستكشاف
  - إدارة الجلسات الآمنة
  - صفحات مخصصة للأخطاء

### ب. نظام المحادثة (Chat System)
- **الملفات الرئيسية**: `components/chat.tsx`, `components/messages.tsx`
- **الميزات**:
  - محادثات تفاعلية في الوقت الفعلي
  - دعم الرسائل متعددة الوسائط
  - حفظ تاريخ المحادثات
  - إعدادات الخصوصية

### ج. أدوات الإنتاجية (Productivity Tools)
- **محرر الكود**: `components/code-editor.tsx`
- **محرر النصوص**: `components/text-editor.tsx`
- **محرر الجداول**: `components/sheet-editor.tsx`
- **محرر الصور**: `components/image-editor.tsx`

### د. واجهة المستخدم (User Interface)
- **الشريط الجانبي**: `components/app-sidebar.tsx`
- **مكونات UI**: مجلد `components/ui/`
- **الأيقونات**: `components/icons.tsx`
- **التصميم**: Tailwind CSS مع دعم الوضع المظلم

## 3. قاعدة البيانات

### مخطط قاعدة البيانات (Database Schema)

#### جدول المستخدمين (Users)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### جدول المحادثات (Chats)
```sql
CREATE TABLE chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES users(id),
  visibility VARCHAR(20) DEFAULT 'private',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### جدول الرسائل (Messages)
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID REFERENCES chats(id),
  role VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### جدول المصنوعات (Artifacts)
```sql
CREATE TABLE artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES messages(id),
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  language VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 4. تكامل الذكاء الاصطناعي

### نماذج الذكاء الاصطناعي المدعومة
- **OpenAI**: GPT-4o, GPT-4o Mini
- **Anthropic**: Claude 3 Haiku
- **DeepSeek**: DeepSeek Chat
- **XAI**: Grok (قابل للإضافة)

### أدوات الذكاء الاصطناعي
- **إنشاء الكود**: `lib/ai/tools/code/`
- **معالجة النصوص**: `lib/ai/tools/text/`
- **تحرير الصور**: `lib/ai/tools/image/`
- **إدارة الجداول**: `lib/ai/tools/sheet/`

## 5. التقنيات والمكتبات

### Frontend Technologies
- **Next.js 15**: إطار العمل الأساسي
- **React 19**: مكتبة واجهة المستخدم
- **TypeScript**: لغة البرمجة المطبوعة
- **Tailwind CSS**: إطار عمل التصميم
- **Radix UI**: مكونات واجهة المستخدم
- **Framer Motion**: الرسوم المتحركة

### Backend Technologies
- **Next.js API Routes**: خدمات الخلفية
- **NextAuth.js**: نظام المصادقة
- **Drizzle ORM**: إدارة قاعدة البيانات
- **PostgreSQL**: قاعدة البيانات الرئيسية
- **Redis**: التخزين المؤقت

### AI & Development Tools
- **AI SDK**: تكامل نماذج الذكاء الاصطناعي
- **CodeMirror**: محرر الكود المتقدم
- **ProseMirror**: محرر النصوص الغني
- **React Data Grid**: عرض وتحرير الجداول
- **Playwright**: اختبارات شاملة

## 6. الميزات المتقدمة

### أ. نظام الأدوات (Tools System)
- **البحث**: `lib/tools/search.ts`
- **الاستعلام**: `lib/tools/question.ts`
- **الاسترجاع**: `lib/tools/retrieve.ts`
- **البحث في الفيديو**: `lib/tools/video-search.ts`

### ب. نظام البث (Streaming System)
- **البث المباشر**: `lib/streaming/create-tool-calling-stream.ts`
- **معالجة البيانات**: `components/data-stream-handler.tsx`
- **موفر البيانات**: `components/data-stream-provider.tsx`

### ج. نظام الباحثين (Researchers System)
- **الباحث اليدوي**: `lib/researchers/manual-researcher.ts`
- **واجهة الباحث**: `lib/researchers/researcher.ts`

## 7. الإعدادات والتكوين

### متغيرات البيئة المطلوبة
```env
# Database
POSTGRES_URL=postgresql://username:password@localhost:5432/drx_db

# Authentication
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# AI Models
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
XAI_API_KEY=your-xai-api-key

# Optional Services
REDIS_URL=redis://localhost:6379
VERCEL_URL=
BLOB_READ_WRITE_TOKEN=
```

### إعدادات التطوير
- **ESLint**: فحص جودة الكود
- **Biome**: تنسيق الكود
- **TypeScript**: فحص الأنواع
- **Playwright**: اختبارات شاملة

## 8. سير العمل والعمليات

### أ. دورة حياة المحادثة
1. **إنشاء المحادثة**: إنشاء جلسة جديدة
2. **إرسال الرسالة**: معالجة رسالة المستخدم
3. **معالجة الذكاء الاصطناعي**: تحليل وإنتاج الرد
4. **عرض النتيجة**: إظهار الرد للمستخدم
5. **حفظ التاريخ**: تخزين المحادثة في قاعدة البيانات

### ب. إدارة المصنوعات (Artifacts)
1. **إنشاء المصنوع**: إنتاج محتوى جديد
2. **التحرير**: تعديل المحتوى الموجود
3. **المعاينة**: عرض النتيجة النهائية
4. **الحفظ**: تخزين التغييرات

### ج. نظام الأمان
- **التحقق من الهوية**: NextAuth.js
- **حماية المسارات**: Middleware
- **تشفير البيانات**: متغيرات البيئة الآمنة
- **إدارة الجلسات**: JWT Tokens

## 9. الأداء والتحسين

### أ. تحسينات Frontend
- **تقسيم الكود**: Dynamic imports
- **التخزين المؤقت**: SWR للبيانات
- **الصور المحسنة**: Next.js Image
- **التحميل التدريجي**: Lazy loading

### ب. تحسينات Backend
- **تجميع الاستعلامات**: Drizzle ORM
- **التخزين المؤقت**: Redis
- **ضغط البيانات**: API responses
- **إدارة الاتصالات**: Connection pooling

## 10. الاختبارات والجودة

### أ. أنواع الاختبارات
- **اختبارات الوحدة**: Jest
- **اختبارات التكامل**: Playwright
- **اختبارات الواجهة**: E2E testing
- **اختبارات الأداء**: Performance monitoring

### ب. ضمان الجودة
- **فحص الكود**: ESLint + Biome
- **فحص الأنواع**: TypeScript
- **مراجعة الكود**: Pull requests
- **التوثيق**: README + Comments

هذا الهيكل الشامل يوفر أساساً قوياً لمنصة DRX المتقدمة، مع إمكانيات توسع مستقبلية وصيانة سهلة.

