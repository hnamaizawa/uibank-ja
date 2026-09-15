import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';

const CARDS = [
  {
    title: 'UiBank トラベルリワードカード',
    description: '飲食・衣料・娯楽のご利用で3倍のマイルが貯まります',
  },
  {
    title: 'UiBank キャッシュバックリワードカード',
    description: '全てのご利用に対して1.5%のキャッシュバック、シンプルでわかりやすい特典です',
  },
  {
    title: 'UiBank ご褒美リワードカード',
    description: '配車サービスや娯楽のご利用で、1ドルにつき3ポイントが貯まります',
  },
];

export default function CreditCards() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold sm:text-4xl">選べる、たくさんの特典。</h1>
        <p className="mt-2 text-gray-600">
          旅行特典？ キャッシュバック？ ポイント還元？ すべてお任せください！
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {CARDS.map((card) => (
          <div key={card.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border-2 border-brand text-brand">
              <CreditCard className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-bold">{card.title}</h3>
            <p className="mb-4 text-sm text-gray-600">{card.description}</p>
            <button
              type="button"
              onClick={() => navigate('/credit-cards/apply')}
              className="font-semibold text-link hover:underline"
            >
              今すぐ申し込む →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
