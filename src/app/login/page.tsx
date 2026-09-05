import AuthForm from '@/src/components/AuthForm';
import Link from 'next/link';

export default function LoginPage() {
  return <main className="min-h-screen bg-gray-50 p-6"><div className="mx-auto max-w-md py-16"><h1 className="mb-6 text-center text-3xl font-bold">เข้าสู่ระบบ ยามจำเป็น</h1><AuthForm mode="login" /><p className="mt-4 text-center text-sm">ยังไม่มีบัญชี? <Link className="text-orange-600 underline" href="/register">สมัครสมาชิก</Link></p></div></main>;
}
