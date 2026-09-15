import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandPanel from '../components/BrandPanel';

const inputClass =
  'w-full rounded bg-white px-3 py-2 text-ink placeholder:text-gray-400 focus:outline-none';
const labelClass = 'mb-1 block text-sm font-semibold';

export default function LoanApply() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const [income, setIncome] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 元サイトの承認ルール: 18歳未満、または融資額が1000万円を超える場合は否認。
    const approved = Number(age) >= 18 && Number(amount) <= 10000000;
    navigate('/loans/result', { state: { email, amount, term, income, age, approved } });
  };

  return (
    <div className="mx-auto max-w-lg">
      <BrandPanel backTo="/loans">
        <h1 className="mb-2 text-3xl font-extrabold">ローンのお申し込み</h1>
        <p className="mb-6 text-white/90">
          ローンのお申し込みを進めるため、以下の項目にご入力ください。
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <div>
            <label className={labelClass}>申込者のメールアドレス</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="メールアドレスを入力"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>希望融資額</label>
            <input
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="希望する融資額を入力"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>融資期間</label>
            <select
              required
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className={inputClass}
            >
              <option value="" disabled>
                融資期間を選択してください
              </option>
              <option value="1">1年</option>
              <option value="3">3年</option>
              <option value="5">5年</option>
              <option value="10">10年</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>税引前の年収</label>
            <input
              type="number"
              required
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="税引前の年収を入力"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>年齢</label>
            <input
              type="number"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="年齢を入力"
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-white py-2 font-bold text-ink hover:bg-gray-100"
          >
            ローン申し込みを送信する
          </button>
        </form>
      </BrandPanel>
    </div>
  );
}
