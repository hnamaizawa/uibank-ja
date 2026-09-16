import { getAppBase } from '@uipath/uipath-typescript';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { BankAuthProvider } from './hooks/useBankAuth';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import PasswordRequest from './pages/PasswordRequest';
import Loans from './pages/Loans';
import LoanApply from './pages/LoanApply';
import LoanResult from './pages/LoanResult';
import CreditCards from './pages/CreditCards';
import CreditCardApply from './pages/CreditCardApply';
import MobileBanking from './pages/MobileBanking';
import Help from './pages/Help';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

// UiPath アカウントへのサインインを必須にするかどうか。
// このアプリは Orchestrator / Data Fabric などの UiPath API を呼び出していないため、
// false のままでも動作する。true に戻せばすぐにサインインゲートを復元できる。
const REQUIRE_UIPATH_LOGIN = false;

function AppRoutes() {
  return (
    <BankAuthProvider>
      <BrowserRouter basename={getAppBase()}>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register-account" element={<Register />} />
            <Route path="/password-request" element={<PasswordRequest />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/loans/apply" element={<LoanApply />} />
            <Route path="/loans/result" element={<LoanResult />} />
            <Route path="/credit-cards" element={<CreditCards />} />
            <Route path="/credit-cards/apply" element={<CreditCardApply />} />
            <Route path="/mobile-banking" element={<MobileBanking />} />
            <Route path="/help" element={<Help />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </BankAuthProvider>
  );
}

function Gate() {
  const { isAuthenticated, isLoading, error, login } = useAuth();

  if (!REQUIRE_UIPATH_LOGIN) {
    return <AppRoutes />;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page p-4">
        <div className="w-full max-w-sm rounded-lg bg-white p-8 text-center shadow">
          <h1 className="mb-2 text-2xl font-bold">
            <span className="text-brand">Ui</span>Bank
          </h1>
          <p className="mb-6 text-gray-600">
            続行するには、お使いの UiPath アカウントでサインインしてください。
          </p>
          {error && <p className="mb-4 text-sm text-red-600">エラー: {error}</p>}
          <button
            onClick={login}
            className="w-full rounded bg-brand px-4 py-2 font-semibold text-white hover:bg-brand-dark"
          >
            UiPath アカウントでサインイン
          </button>
        </div>
      </div>
    );
  }

  return <AppRoutes />;
}

function App() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}

export default App;
