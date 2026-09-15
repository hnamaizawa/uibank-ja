import { useState } from 'react';
import type { FormEvent } from 'react';
import BrandPanel from '../components/BrandPanel';

export default function PasswordRequest() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-md">
      <BrandPanel backTo="/login">
        <h1 className="mb-2 text-3xl font-extrabold">パスワードの再設定</h1>
        <p className="mb-6 text-white/90">
          パスワード再設定用のリンクをお送りしますので、登録済みのメールアドレスを入力してください。
        </p>

        {sent ? (
          <p className="rounded bg-white/15 p-4 text-white">
            入力いただいたメールアドレスに再設定用のリンクを送信しました。
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-white">
            <div>
              <label className="mb-1 block text-sm font-semibold">メールアドレス</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="メールアドレスを入力"
                className="w-full rounded bg-white px-3 py-2 text-ink placeholder:text-gray-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded bg-white py-2 font-bold text-ink hover:bg-gray-100"
            >
              パスワードを再設定する
            </button>
          </form>
        )}
      </BrandPanel>
    </div>
  );
}
