import { Link, Navigate } from 'react-router-dom';
import { ArrowRight, DollarSign, CreditCard, Landmark } from 'lucide-react';
import BrandPanel from '../components/BrandPanel';
import LoginForm from '../components/LoginForm';
import ProductCard from '../components/ProductCard';
import { useBankAuth } from '../hooks/useBankAuth';

export default function Welcome() {
  const { isSignedIn } = useBankAuth();

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="space-y-8">
      <BrandPanel>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <LoginForm />
          <div className="text-white">
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              UiBank の普通預金・当座預金口座を今すぐ始めましょう！
            </h1>
            <p className="mt-4 text-white/90">
              ※30日以内に口座を開設すると、$50 をプレゼントいたします！
            </p>
            <Link
              to="/register-account"
              className="mt-6 inline-flex items-center gap-2 rounded bg-black px-6 py-3 font-bold text-white hover:bg-gray-800"
            >
              口座を開設する
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </BrandPanel>

      <ProductCard
        icon={<DollarSign className="h-6 w-6" />}
        title="普通預金・当座預金口座"
        description="今すぐ口座を開設して、特典をご活用ください！2020年中に新規開設いただいた口座には $100 のクレジットを進呈します！"
        ctaLabel="口座を申し込む"
        ctaTo="/register-account"
      />

      <ProductCard
        icon={<CreditCard className="h-6 w-6" />}
        title="クレジットカード・デビットカード"
        description="キャッシュバック、旅行特典、低手数料など、お客様のニーズに合わせた多彩なカードをご用意しています！"
        ctaLabel="詳しく見る"
        ctaTo="/credit-cards"
      />

      <ProductCard
        icon={<Landmark className="h-6 w-6" />}
        title="優れた金利のローン"
        description="業界最高水準の金利をご提供！隠れた手数料や小細工は一切なし、専任チームが優れた金利とサービスをお届けします！"
        ctaLabel="ローンを申し込む"
        ctaTo="/loans"
      />
    </div>
  );
}
