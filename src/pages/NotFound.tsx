import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-16 text-center">
      <h1 className="text-6xl font-extrabold text-brand">404</h1>
      <p className="mt-4 text-lg text-gray-600">お探しのページが見つかりませんでした。</p>
      <Link
        to="/welcome"
        className="mt-6 rounded bg-brand px-6 py-3 font-bold text-white hover:bg-brand-dark"
      >
        トップページへ戻る
      </Link>
    </div>
  );
}
