# UiBank JA

[UiBank](https://uibank.uipath.com/welcome)（UiPath が公開しているデモ用バンキングサイト）のページ構成をそのまま踏襲し、画面のラベル・メッセージを日本語化した Web アプリです。**UiPath Coded Web App**（Vite + React + TypeScript + Tailwind CSS）として実装しており、`@uipath/uipath-typescript` SDK 経由で UiPath アカウントによるサインインを行った上で、日本語化された UiBank の画面を利用できます。

> 本アプリはデモンストレーション専用です。実在の銀行サービスとは一切関係ありません。

## 特徴

- 元サイトと同じページ階層・導線をそのまま再現（URL パスも概ね同一）
- すべてのラベル・見出し・エラーメッセージ・フォーム項目を日本語化
- 配色は元サイトから抽出したブランドカラー（オレンジ `#FA4616`）を使用
- アプリ内の「銀行ログイン」（ユーザー名・パスワード）は元サイト同様、実際の認証を行わないモック実装
- ローン審査ルールを実装（**18歳以上、かつ融資額が1000万円以下**の場合のみ承認）

## 画面構成（ルーティング）

| パス | 内容 |
|---|---|
| `/welcome` | トップページ（ログインフォーム＋商品紹介3枚） |
| `/login` | ログイン |
| `/register-account` | 口座開設のお申し込み |
| `/password-request` | パスワード再設定 |
| `/loans` | ローンセンター |
| `/loans/apply` | ローン申込フォーム |
| `/loans/result` | ローン審査結果（承認 / 否認） |
| `/credit-cards` | クレジットカード一覧 |
| `/credit-cards/apply` | カード申込（メンテナンス中画面） |
| `/mobile-banking` | モバイルバンキング紹介 |
| `/help` | お問い合わせ |
| `/dashboard` | ログイン後のマイページ（元サイトには無い、簡易なモック画面） |
| それ以外 | 404 ページ |

## 技術スタック

- [Vite](https://vite.dev/) + React 19 + TypeScript
- Tailwind CSS v4
- React Router v7
- [`@uipath/uipath-typescript`](https://www.npmjs.com/package/@uipath/uipath-typescript)（UiPath Cloud への OAuth サインイン用 SDK）
- [`@uipath/coded-apps-dev`](https://www.npmjs.com/package/@uipath/coded-apps-dev)（ローカル開発時に UiPath 設定を注入する Vite プラグイン）
- [lucide-react](https://lucide.dev/)（アイコン）

## 前提条件

- Node.js 18 以上 / npm
- [UiPath CLI (`uip`)](https://docs.uipath.com/automation-cloud/automation-cloud/latest/api-guide/cli) ※デプロイする場合のみ必要
  ```bash
  npm install -g @uipath/cli
  uip tools install @uipath/codedapp-tool
  uip tools install @uipath/orchestrator-tool
  uip tools install admin-tool
  ```
- UiPath Automation Cloud のアカウント、および OAuth 用 External Application（下記「設定ファイル」参照）

## セットアップ

```bash
git clone <このリポジトリのURL>
cd uibank-ja
npm install
```

### 設定ファイル（`uipath.json`）

プロジェクトルートの `uipath.json` が、SDK が読み込む唯一の設定ファイルです（`.env` は使用しません）。

```json
{
  "clientId": "<UiPath External Application の Client ID>",
  "scope": "OR.Folders.Read",
  "orgName": "<組織名>",
  "tenantName": "<テナント名>",
  "baseUrl": "https://staging.api.uipath.com",
  "redirectUri": "http://localhost:5173"
}
```

別の UiPath 組織 / テナントで動かす場合は、以下の手順で新しい External Application を作成し、`clientId` を差し替えてください。

```bash
uip login
uip admin external-apps create "UiBank JA" \
  --non-confidential \
  --user-scope "OR.Folders.Read" \
  --redirect-uri "http://localhost:5173,http://localhost:5173/" \
  --output json
```

`baseUrl` は環境ごとに以下を使用します（**API サブドメイン**を指定すること）。

| 環境 | `baseUrl` |
|---|---|
| Production | `https://api.uipath.com` |
| Staging | `https://staging.api.uipath.com` |
| Alpha | `https://alpha.api.uipath.com` |

## ローカルでの起動方法

```bash
npm run dev
```

`http://localhost:5173` を開くと、まず UiPath アカウントでのサインインを求められます（Coded Web App としての必須動作）。サインイン後、日本語化された UiBank の画面が表示されます。

## ビルド

```bash
npm run build
```

`dist/` に本番用ビルドが出力されます。

## UiPath Orchestrator へのデプロイ

Coded Web App は「Build → Pack → Publish → Deploy」の順でデプロイします。

```bash
# 0. ログイン確認（未ログインなら uip login）
uip login status --output json

# 1. ビルド
npm run build

# 2. Pack（.nupkg を作成）
uip codedapp pack dist -n uibank-ja --version 1.0.0

# 3. Publish（Orchestrator へアップロード + Apps サービスへ登録）
#    ※ テナントIDが自動解決されない環境では --tenant-id を明示指定
#      （テナントIDは `uip admin tenants list --output json` で確認できます）
uip codedapp publish -n uibank-ja --version 1.0.0 --tenant-id "<テナントID>"

# 4. Deploy（デプロイ先フォルダーを指定）
#    ※ フォルダーキーは `uip or folders list --output json` で確認できます
uip codedapp deploy -n uibank-ja --folder-key "<フォルダーキー>" --tenant-id "<テナントID>"
```

初回デプロイ後に表示される `appUrl` が公開URLです。バージョンアップ時は `pack`/`publish` の `--version` を上げてから同じ `deploy` コマンドを再実行してください（`--path-name` を省略すれば URL は変わりません）。

デプロイの詳細な仕様（フォルダーキーの解決方法、ルーティング名の扱いなど）は UiPath の `uip codedapp` CLI ドキュメントを参照してください。

## 実装メモ

- **銀行ログイン（ユーザー名/パスワード）はモックです。** 入力があれば検証なしでサインイン扱いとし、`/dashboard` へ遷移します（[`src/hooks/useBankAuth.tsx`](src/hooks/useBankAuth.tsx)）。UiPath アカウントでのサインインとは別物です。
- **ローン審査ロジック:** [`src/pages/LoanApply.tsx`](src/pages/LoanApply.tsx) で「年齢18歳以上 かつ 融資額1000万円以下」を判定し、結果を [`src/pages/LoanResult.tsx`](src/pages/LoanResult.tsx) で表示します。
- **クレジットカード申込**は元サイト同様、常に「メンテナンス中」画面（[`src/pages/CreditCardApply.tsx`](src/pages/CreditCardApply.tsx)）を表示します。

## ディレクトリ構成

```
src/
├── App.tsx                 # ルーティングと UiPath サインインのゲート
├── components/
│   ├── BrandPanel.tsx       # オレンジ地の共通パネル
│   ├── Layout.tsx           # ヘッダー・フッター
│   ├── LoginForm.tsx        # 共通ログインフォーム
│   └── ProductCard.tsx      # トップページの商品カード
├── hooks/
│   ├── useAuth.tsx          # UiPath SDK 認証（OAuth）
│   └── useBankAuth.tsx      # アプリ内バンキングログイン（モック）
└── pages/                   # 各画面（上記ルーティング表を参照）
```

## ライセンス / 免責事項

本アプリはデモンストレーション専用です。実在するUiPath社の "UiBank" サイトの構成を参考にしていますが、実際の口座・取引・個人情報は一切扱いません。
