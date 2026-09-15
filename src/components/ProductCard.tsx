import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BrandPanel from './BrandPanel';

interface ProductCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  ctaLabel: string;
  ctaTo: string;
}

export default function ProductCard({ icon, title, description, ctaLabel, ctaTo }: ProductCardProps) {
  return (
    <BrandPanel>
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-ink shadow-sm">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border-2 border-brand text-brand">
          {icon}
        </div>
        <h3 className="mb-3 text-xl font-bold">{title}</h3>
        <p className="mb-5 text-gray-600">{description}</p>
        <Link to={ctaTo} className="inline-flex items-center gap-1 font-semibold text-link hover:underline">
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </BrandPanel>
  );
}
