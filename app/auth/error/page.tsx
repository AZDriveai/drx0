import Link from 'next/link';
import { Button } from '../../../components/ui/button';

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const error = searchParams.error;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
            خطأ في المصادقة
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {error === 'Configuration' && 'حدث خطأ في إعدادات الخادم'}
            {error === 'AccessDenied' && 'تم رفض الوصول'}
            {error === 'Verification' && 'فشل في التحقق'}
            {!error && 'حدث خطأ غير متوقع'}
          </p>
        </div>
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/auth/signin">المحاولة مرة أخرى</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">العودة للرئيسية</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

