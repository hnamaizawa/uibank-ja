import { useState } from 'react';
import type { FormEvent } from 'react';

export default function Help() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold sm:text-4xl">お困りですか？</h1>
        <p className="mt-2 text-gray-600">私たちにお気軽にご連絡ください！</p>
      </div>

      {sent ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <p className="font-semibold text-ink">
            お問い合わせいただきありがとうございます。担当者よりご連絡いたします。
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
        >
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">氏名</label>
            <input
              type="text"
              required
              placeholder="氏名を入力"
              className="w-full rounded border border-gray-300 px-3 py-2 text-ink placeholder:text-gray-400 focus:border-brand focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">メールアドレス</label>
            <input
              type="text"
              required
              placeholder="メールアドレスを入力"
              className="w-full rounded border border-gray-300 px-3 py-2 text-ink placeholder:text-gray-400 focus:border-brand focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">お困りの内容を教えてください</label>
            <textarea
              required
              rows={4}
              placeholder="お困りの内容"
              className="w-full rounded border border-gray-300 px-3 py-2 text-ink placeholder:text-gray-400 focus:border-brand focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-brand py-2 font-bold text-white hover:bg-brand-dark"
          >
            お問い合わせを送信する
          </button>
        </form>
      )}
    </div>
  );
}
