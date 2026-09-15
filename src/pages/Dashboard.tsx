import { Navigate, Link } from 'react-router-dom';
import { useBankAuth } from '../hooks/useBankAuth';

export default function Dashboard() {
  const { isSignedIn, username } = useBankAuth();

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-extrabold sm:text-3xl">
        おかえりなさい、{username} さん
      </h1>
      <p className="mt-2 text-gray-600">UiBank のマイページへようこそ。</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">普通預金口座残高</p>
          <p className="mt-1 text-3xl font-extrabold text-brand">¥1,234,567</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">当座預金口座残高</p>
          <p className="mt-1 text-3xl font-extrabold text-brand">¥456,789</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to="/loans"
          className="rounded bg-brand px-5 py-2 font-semibold text-white hover:bg-brand-dark"
        >
          ローンを申し込む
        </Link>
        <Link
          to="/credit-cards"
          className="rounded border border-brand px-5 py-2 font-semibold text-brand hover:bg-brand/5"
        >
          カードを見る
        </Link>
      </div>
    </div>
  );
}
