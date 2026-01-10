# コントリビューションガイド

このドキュメントでは、ポートフォリオサイトへの貢献方法について説明します。

## 🚀 クイックスタート

### 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone https://github.com/tndg16-bot/portfolio-site.git
cd portfolio-site

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### 環境変数の設定

1. `.env.example` を `.env.local` にコピー
2. 必要な環境変数を設定

```bash
cp .env.example .env.local
```

## 📋 開発フロー

TEAM_RULES.md のセクション8「並列開発ベストプラクティス」に従います。

### 1. Issue先行原則

作業を始める前に、必ずGitHub Issueを作成してください。

```bash
# Issue作成例
gh issue create --title "[feat] 新機能の説明" --body "詳細な説明"
```

### 2. ブランチ作成

```bash
# 機能追加
git checkout -b feature/新機能名

# バグ修正
git checkout -b fix/バグの説明

# ドキュメント更新
git checkout -b docs/更新内容
```

### 3. 実装とコミット

**Atomic Commit**: 1機能1コミットを心がけてください。

```bash
# コミットメッセージの形式
git commit -m "feat: 新機能の追加 closes #123"
git commit -m "fix: バグの修正 closes #124"
git commit -m "docs: ドキュメントの更新"
```

### 4. プルリクエスト

```bash
# リモートにプッシュ
git push origin feature/新機能名

# PR作成
gh pr create --title "feat: 新機能の追加" --body "closes #123"
```

## 📝 コミットメッセージ規約

Conventional Commits形式を使用します。

| プレフィックス | 用途 |
|---------------|------|
| `feat:` | 新機能追加 |
| `fix:` | バグ修正 |
| `docs:` | ドキュメントのみ |
| `style:` | フォーマット（機能影響なし） |
| `refactor:` | リファクタリング |
| `test:` | テスト追加・修正 |
| `chore:` | ビルド・設定変更 |

### 良いコミットメッセージの例

```
feat: Aboutページにスキルセクションを追加 closes #15
fix: モバイルでのヘッダーメニューが閉じない問題を修正 closes #22
docs: READMEにセットアップ手順を追加
refactor: BookingFormコンポーネントをReact Hooksに移行
```

### 悪いコミットメッセージの例

```
修正
WIP
あああ
fix bug
```

## 🔍 コードレビューチェックリスト

PRを作成する前に、以下を確認してください：

- [ ] `npm run lint` でエラーがないこと
- [ ] ビルドが成功すること (`npm run build`)
- [ ] 新機能にはテストがあること
- [ ] ドキュメントが更新されていること
- [ ] コミットメッセージが規約に従っていること

## 🎨 コーディングスタイル

### TypeScript

- 厳密な型定義を使用（`any` は避ける）
- 型エクスポートは `type` キーワードを使用
- インターフェースは `I` プレフィックスを使わない

```typescript
// ✅ Good
export type UserProps = {
  name: string;
  email: string;
};

// ❌ Bad
export interface IUserProps {
  name: any;
  email: any;
}
```

### React コンポーネント

- 関数コンポーネントを使用
- Props は型定義を別途作成
- デフォルトエクスポートを使用

```tsx
// ✅ Good
type ButtonProps = {
  label: string;
  onClick: () => void;
};

export default function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

### CSS (Tailwind)

- ユーティリティクラスを優先
- カスタムCSSは必要最小限に
- レスポンシブはモバイルファースト

```tsx
// ✅ Good - モバイルファースト
<div className="text-sm md:text-base lg:text-lg">
```

## 🐛 バグ報告

バグを発見した場合は、以下の情報を含めてIssueを作成してください：

1. **環境情報**: OS、ブラウザ、Node.jsバージョン
2. **再現手順**: バグを再現する具体的な手順
3. **期待される動作**: 本来どうなるべきか
4. **実際の動作**: 実際に何が起きたか
5. **スクリーンショット**: 可能であれば添付

## 💡 機能提案

新機能を提案する場合は、以下を含めてIssueを作成してください：

1. **問題/ニーズ**: なぜこの機能が必要か
2. **提案する解決策**: どのような機能を追加するか
3. **代替案**: 他に検討した解決策があれば
4. **追加情報**: モックアップ、参考サイトなど

## 📞 コミュニケーション

- **GitHub Issues**: バグ報告、機能提案
- **Pull Requests**: コードレビュー、技術的な議論
- **@tndg16-bot へのメンション**: 緊急の確認事項

---

ご協力ありがとうございます！🙏
