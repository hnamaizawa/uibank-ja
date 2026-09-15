import { Wrench } from 'lucide-react';
import BrandPanel from '../components/BrandPanel';

export default function CreditCardApply() {
  return (
    <div className="mx-auto max-w-md">
      <BrandPanel backTo="/credit-cards">
        <div className="flex flex-col items-center py-8 text-center">
          <Wrench className="mb-4 h-12 w-12" />
          <h1 className="mb-3 text-2xl font-extrabold">メンテナンス中です！</h1>
          <p className="text-white/90">
            申し訳ございません。現在サイトはメンテナンス中です。
            <br />
            ご不便をおかけいたしますが、何卒ご了承ください。
          </p>
        </div>
      </BrandPanel>
    </div>
  );
}
