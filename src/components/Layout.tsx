import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useBankAuth } from '../hooks/useBankAuth';

const PRODUCT_LINKS = [
  { to: '/loans', label: 'ローン' },
  { to: '/credit-cards', label: 'クレジットカード' },
  { to: '/mobile-banking', label: 'モバイルバンキング' },
];

function Header() {
  const [productsOpen, setProductsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isSignedIn, signOut } = useBankAuth();

  useEffect(() => {
    if (!productsOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [productsOpen]);
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isSignedIn) {
      signOut();
    }
    navigate('/login');
  };

  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/welcome" className="text-2xl font-extrabold tracking-tight">
          <span className="text-brand">Ui</span>
          <span className="text-ink">Bank</span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setProductsOpen((v) => !v)}
              className="flex items-center gap-1 font-medium text-ink hover:text-brand"
            >
              商品案内
              <ChevronDown className="h-4 w-4" />
            </button>
            {productsOpen && (
              <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-gray-100 bg-white py-2 shadow-lg">
                {PRODUCT_LINKS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="block px-4 py-2 text-sm text-ink hover:bg-gray-50 hover:text-brand"
                    onClick={() => setProductsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleAuthClick}
            className="font-medium text-ink hover:text-brand"
          >
            {isSignedIn ? 'ログアウト' : 'ログイン'}
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-medium text-gray-600">UiBank v2.0.0</p>
          <p className="mt-1">
            UiBank はデモンストレーション専用のアプリケーションです。
            <a
              href="https://www.uipath.com/legal/privacy-policy"
              target="_blank"
              rel="noreferrer"
              className="text-link hover:underline"
            >
              プライバシーポリシーはこちら
            </a>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span>ローンをお探しですか？</span>
          <Link to="/help" className="text-link hover:underline">
            お問い合わせ
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-page text-ink">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">{children}</main>
      <Footer />
    </div>
  );
}
