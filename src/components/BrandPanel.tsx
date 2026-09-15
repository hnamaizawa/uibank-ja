import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface BrandPanelProps {
  children: ReactNode;
  backTo?: string;
  className?: string;
}

/** UiBank のオレンジ地に円形装飾を重ねたパネル。各サブページ共通の背景。 */
export default function BrandPanel({ children, backTo, className = '' }: BrandPanelProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-brand text-white ${className}`}
    >
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -right-10 -top-20 h-72 w-72 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-white/10" />
      <div className="relative px-6 py-10 sm:px-12 sm:py-14">
        {backTo && (
          <Link
            to={backTo}
            aria-label="戻る"
            className="mb-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 hover:bg-white/25"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        )}
        {children}
      </div>
    </div>
  );
}
