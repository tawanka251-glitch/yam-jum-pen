import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

export default function RegisterPage() {
  return <main className="min-h-screen bg-gray-50 p-6"><div className="mx-auto max-w-md py-16"><h1 className="mb-6 text-center text-3xl font-bold">สมัครสมาชิก</h1><AuthForm mode="register" /><p className="mt-4 text-center text-sm">มีบัญชีแล้ว? <Link className="text-orange-600 underline" href="/login">เข้าสู่ระบบ</Link></p></div></main>;
}
