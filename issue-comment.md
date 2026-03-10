## 修正完了 ✅

### 修正内容

**1. Lintエラー（5件） - 修正完了**
- `discord-sync/skill/index.js`: `require()`をES6 `import`に変更
- `discord-sync/skill/test.js`: `require()`をES6 `import`に変更

**2. TypeScriptエラー（1件） - 既に修正済み**
- `src/i18n/request.ts`: 型定義 `{ locale: string | undefined; }` は既に `{ locale?: string | undefined; }` になっていました

### テスト結果
- ✅ `npm run lint` - 成功（exit code 0）
- ✅ `npx tsc --noEmit` - 成功
- ✅ `npm run build` - 成功

### コミット
- Commit: `3c1212c`
- Message: Fix lint errors: Convert require() to ES6 imports in discord-sync
- Pushed to: `origin/main`

GitHub Actionsが通ることを確認してください。
