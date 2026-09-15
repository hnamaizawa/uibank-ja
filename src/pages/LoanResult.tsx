import { useMemo } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import BrandPanel from '../components/BrandPanel';

function generateLoanId() {
  return Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

interface LoanApplyState {
  approved: boolean;
}

export default function LoanResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const loanId = useMemo(() => generateLoanId(), []);
  const state = location.state as LoanApplyState | null;

  if (!state) {
    return <Navigate to="/loans/apply" replace />;
  }

  return (
    <div className="mx-auto max-w-lg">
      <BrandPanel>
        {state.approved ? (
          <>
            <h1 className="mb-4 text-3xl font-extrabold">おめでとうございます！</h1>
            <p className="text-lg text-white/90">UiBank のローンにご承認いただけました！</p>

            <div className="my-6 rounded-2xl bg-white p-6 text-ink">
              <p className="text-sm text-gray-500">今回の適用金利</p>
              <p className="text-3xl font-extrabold text-brand">年利 6%</p>
              <p className="mt-4 text-sm text-gray-500">新しいローンIDはこちらです</p>
              <p className="break-all font-mono text-sm">{loanId}</p>
            </div>
          </>
        ) : (
          <>
            <h1 className="mb-4 text-3xl font-extrabold">申し訳ございません</h1>
            <div className="my-6 rounded-2xl bg-white p-6 text-ink">
              <p>
                申し訳ございませんが、今回はローンをご利用いただけませんでした。
                <br />
                ローンのご利用には、18歳以上であること、および融資額が1000万円を超えないことが条件となります。
              </p>
            </div>
          </>
        )}

        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate('/loans/apply')}
            className="rounded bg-white px-6 py-3 font-bold text-ink hover:bg-gray-100"
          >
            {state.approved ? '別のローンを申し込む' : 'もう一度申し込む'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/loans')}
            className="rounded border-2 border-white px-6 py-3 font-bold text-white hover:bg-white/10"
          >
            ローンセンターに戻る
          </button>
        </div>
      </BrandPanel>
    </div>
  );
}
