import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBankAuth } from '../hooks/useBankAuth';

/**
 * UiBank アプリ内の「銀行口座」ログインフォーム。UiPath へのサインインとは別物で、
 * 参考サイトと同様にバックエンド検証は行わないモック実装（入力があればログイン扱い）。
 */
export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useBankAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('ユーザー名またはメールアドレスを入力してください');
      return;
    }
    setError(null);
    signIn(username.trim());
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 text-white">
      <div>
        <label className="mb-1 block text-sm font-semibold">ユーザー名</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="ユーザー名を入力"
          className="w-full rounded border-2 border-white/0 bg-white px-3 py-2 text-ink placeholder:text-gray-400 focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold">パスワード</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワードを入力"
          className="w-full rounded bg-white px-3 py-2 text-ink placeholder:text-gray-400 focus:outline-none"
        />
      </div>
      {error && <p className="text-sm font-semibold text-white">{error}</p>}
      <button
        type="submit"
        className="w-full rounded bg-white py-2 font-bold text-ink hover:bg-gray-100"
      >
        サインイン
      </button>
      <div className="flex flex-col gap-1 text-sm">
        <Link to="/password-request" className="hover:underline">
          パスワードをお忘れですか？
        </Link>
        <Link to="/register-account" className="hover:underline">
          口座を新規登録する
        </Link>
      </div>
    </form>
  );
}
