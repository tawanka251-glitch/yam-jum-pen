import Link from 'next/link';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'ยามจำเป็น | ฝากเลี้ยงสัตว์อย่างอุ่นใจ',
	description: 'พื้นที่สำหรับเจ้าของสัตว์เลี้ยงและผู้รับฝาก',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="th">
			<body className="min-h-screen bg-orange-50 text-slate-900">
				<header className="border-b border-orange-100 bg-white">
					<nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
						<Link href="/" className="text-xl font-bold text-orange-600">ยามจำเป็น</Link>
						<div className="flex items-center gap-5 text-sm font-medium">
							<Link href="/" className="hover:text-orange-600">หน้าแรก</Link>
							<Link href="/pets/new" className="hover:text-orange-600">ลงประกาศ</Link>
							<Link href="/login" className="rounded-full bg-orange-500 px-4 py-2 text-white hover:bg-orange-600">เข้าสู่ระบบ</Link>
						</div>
					</nav>
				</header>
				{children}
			</body>
		</html>
	);
}
