import { useState } from 'react';
import type { FormEvent } from 'react';
import BrandPanel from '../components/BrandPanel';

const inputClass =
  'w-full rounded bg-white px-3 py-2 text-ink placeholder:text-gray-400 focus:outline-none';
const labelClass = 'mb-1 block text-sm font-semibold';

export default function Register() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-md">
        <BrandPanel backTo="/welcome">
          <h1 className="mb-2 text-3xl font-extrabold">登録ありがとうございます！</h1>
          <p className="text-white/90">
            ご入力いただいたメールアドレス宛に確認メールをお送りしました。
          </p>
        </BrandPanel>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <BrandPanel backTo="/welcome">
        <h1 className="mb-2 text-3xl font-extrabold">口座開設のお申し込み</h1>
        <p className="mb-6 text-white/90">
          口座を開設するにあたり、いくつか情報をご入力いただきます。まずは基本情報からお伺いします。
        </p>

        <div className="mb-6 rounded bg-white/15 p-4 text-sm leading-relaxed text-white">
          UiBank はデモンストレーション専用のアプリケーションです。実際に必要な情報はメールアドレスのみで、
          登録確認および今後のパスワード再設定に使用します。このフォームの他の項目、および
          アプリ内の他のすべての項目にはダミーデータをご入力ください。
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>メールアドレス*</label>
              <input type="email" required placeholder="メールアドレスを入力" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>パスワード*</label>
              <input type="password" required placeholder="パスワード" className={inputClass} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelClass}>名</label>
              <input type="text" placeholder="名を入力" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>姓</label>
              <input type="text" placeholder="姓を入力" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>ミドルネーム／イニシャル</label>
              <input type="text" placeholder="任意" className={inputClass} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>性別*</label>
              <select required defaultValue="" className={inputClass}>
                <option value="" disabled>
                  性別を選択してください
                </option>
                <option value="male">男性</option>
                <option value="female">女性</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>敬称*</label>
              <select required defaultValue="" className={inputClass}>
                <option value="" disabled>
                  敬称を選択してください
                </option>
                <option value="ms">Ms（女性）</option>
                <option value="mrs">Mrs（既婚女性）</option>
                <option value="mr">Mr（男性）</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>雇用形態*</label>
              <select required defaultValue="" className={inputClass}>
                <option value="" disabled>
                  雇用形態を選択してください
                </option>
                <option value="full-time">正社員</option>
                <option value="part-time">パートタイム</option>
                <option value="unemployed">無職</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>生年月日（YYYYMMDD）</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="\d{8}"
                maxLength={8}
                placeholder="20260916"
                title="YYYYMMDD の8桁で入力してください（例: 20260916）"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>婚姻状況*</label>
              <select required defaultValue="" className={inputClass}>
                <option value="" disabled>
                  婚姻状況を選択してください
                </option>
                <option value="single">独身</option>
                <option value="married">既婚</option>
                <option value="divorced">離婚</option>
                <option value="widowed">死別</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>扶養家族の人数</label>
              <input type="number" min={0} placeholder="0" className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>ユーザー名*</label>
            <input type="text" required placeholder="ユーザー名を入力" className={inputClass} />
          </div>

          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" required className="mt-1" />
            <span>
              <a
                href="https://www.uipath.com/legal/privacy-policy"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                プライバシーポリシー
              </a>
              に同意します
            </span>
          </label>

          <button
            type="submit"
            className="w-full rounded bg-white py-2 font-bold text-ink hover:bg-gray-100 sm:w-auto sm:px-8"
          >
            登録する
          </button>
        </form>
      </BrandPanel>
    </div>
  );
}
