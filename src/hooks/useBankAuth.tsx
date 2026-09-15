import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface BankAuthContextType {
  isSignedIn: boolean;
  username: string | null;
  signIn: (username: string) => void;
  signOut: () => void;
}

const STORAGE_KEY = 'uibank-ja.username';

const BankAuthContext = createContext<BankAuthContextType | undefined>(undefined);

// UiBank 内の「銀行アプリ」としてのログイン状態はデモ用のモックです。
// 実際のバックエンド検証は行わず、入力があればサインイン済み扱いにします。
export const BankAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(() =>
    sessionStorage.getItem(STORAGE_KEY),
  );

  const signIn = (name: string) => {
    sessionStorage.setItem(STORAGE_KEY, name);
    setUsername(name);
  };

  const signOut = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setUsername(null);
  };

  return (
    <BankAuthContext.Provider value={{ isSignedIn: !!username, username, signIn, signOut }}>
      {children}
    </BankAuthContext.Provider>
  );
};

export const useBankAuth = () => {
  const context = useContext(BankAuthContext);
  if (context === undefined) {
    throw new Error('useBankAuth must be used within a BankAuthProvider');
  }
  return context;
};
