import { Smartphone } from 'lucide-react';

export default function MobileBanking() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center py-10 text-center">
      <Smartphone className="mb-6 h-16 w-16 text-brand" />
      <h1 className="text-3xl font-extrabold sm:text-4xl">指先ひとつで、すべてをコントロール。</h1>
      <p className="mt-4 text-gray-600">
        UiBank のモバイルアプリなら、送金、支払い、通知の設定など、あらゆる操作をどこからでも行えます！
      </p>
    </div>
  );
}
