import { AuthForm } from '../../../components/auth-form';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
            تسجيل الدخول إلى DRX
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            أو ابدأ كضيف للاستكشاف
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}

