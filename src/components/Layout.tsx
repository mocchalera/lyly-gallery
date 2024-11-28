import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ヘッダー */}
      <header className="bg-sage-light fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* ロゴ */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="LyLy"
                width={100}
                height={40}
                className="h-10 w-auto"
              />
            </Link>

            {/* ナビゲーション */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/about" 
                className="font-serif text-white hover:text-white/80 transition-colors"
              >
                About LyLy
              </Link>
              <div className="relative group">
                <button className="font-serif text-white hover:text-white/80 transition-colors">
                  Menu
                </button>
              </div>
              <Link 
                href="/studio" 
                className="font-serif text-white hover:text-white/80 transition-colors"
              >
                Studio
              </Link>
              <Link 
                href="/recruit" 
                className="font-serif text-white hover:text-white/80 transition-colors"
              >
                Recruit
              </Link>
            </nav>

            {/* 右側の電話番号と予約ボタン */}
            <div className="hidden md:flex items-center space-x-4">
              <a 
                href="tel:080-4066-2115" 
                className="font-serif text-white hover:text-white/80 transition-colors"
              >
                080-4066-2115
              </a>
              <Link
                href="/reservation"
                className="bg-sand text-white px-4 py-2 rounded font-serif hover:bg-sand-dark transition-colors"
              >
                ご予約
              </Link>
            </div>

            {/* モバイルメニューボタン */}
            <button className="md:hidden p-2 text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ヘッダーの高さ分のスペース */}
      <div className="h-20"></div>

      {/* メインコンテンツ */}
      <main className="flex-grow">
        {children}
      </main>

      {/* フッター */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="font-serif text-gray-600">
              © {new Date().getFullYear()} LyLy Photo Studio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 