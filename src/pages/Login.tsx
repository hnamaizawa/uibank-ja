import BrandPanel from '../components/BrandPanel';
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <div className="mx-auto max-w-md">
      <BrandPanel backTo="/welcome">
        <h1 className="mb-2 text-3xl font-extrabold">ログイン</h1>
        <p className="mb-6 text-white/90">こんにちは！メールアドレスでログインしてください。</p>
        <LoginForm />
      </BrandPanel>
    </div>
  );
}
