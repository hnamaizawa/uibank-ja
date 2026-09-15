import { useNavigate } from 'react-router-dom';
import BrandPanel from '../components/BrandPanel';

export default function Loans() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-2xl">
      <BrandPanel>
        <h1 className="mb-3 text-3xl font-extrabold sm:text-4xl">
          人生のあらゆる場面を支える融資を。
        </h1>
        <p className="mb-8 text-white/90">
          ローンシミュレーターで、UiBank のローンをご利用いただけるか確認してみましょう。
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate('/loans/apply')}
            className="rounded bg-white px-6 py-3 font-bold text-ink hover:bg-gray-100"
          >
            ローンを申し込む
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="rounded border-2 border-white px-6 py-3 font-bold text-white hover:bg-white/10"
          >
            すでにローンをご利用中の方
          </button>
        </div>
      </BrandPanel>
    </div>
  );
}
