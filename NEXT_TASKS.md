# 次のAIエージェントへの指示

## 🎯 今すぐ実行すべきタスク

1. **PR #67 を確認し、マージの可否を判断**
   ```bash
   gh pr view 67
   gh pr checks 67
   ```

2. **ビルドが成功しているか確認**
   ```bash
   npm run build
   ```

3. **問題なければ、mainブランチにマージ**
   ```bash
   gh pr merge 67
   ```

---

## 📝 マージ後のタスク

### 1. Giscusコメント機能の設定
**重要**: ユーザー作業が必要です。以下の手順をユーザーに提示してください：

1. https://giscus.app にアクセス
2. リポジトリ `tndg16-bot/portfolio-site` を入力
3. 生成されたIDを `src/components/GiscusComments.tsx` に設定
4. 以下の値を確認・更新：
   - `repo`
   - `repoId`
   - `category`
   - `categoryId`
   - `mapping`
   - `term` (必要な場合)

### 2. 多言語対応の実装 (next-intl)

**参考ドキュメント**: `docs/i18n-implementation-plan.md`

**手順**:
1. next-intlをインストール済みか確認
   ```bash
   npm list next-intl
   ```

2. 5フェーズの計画に従って実装
   - Phase 1: 基本設定
   - Phase 2: コンテンツ翻訳
   - Phase 3: コンポーネント対応
   - Phase 4: SEO設定
   - Phase 5: テストとデプロイ

**注意**: `src/app/[locale]/` ディレクトリは、ビルドが完全に動作する状態で再作成してください

---

## ⚠️ 注意点

### ビルドエラー
前回、以下のエラーが発生しました：
1. **i18n関連**: `src/app/[locale]/` が不完全でビルドエラー
2. **useSearchParams**: `GoogleAnalytics.tsx` で使用するとエラー

解決策：
- i18nの実装は、必ず小規模から始めてテストする
- `useSearchParams()` は Suspense でラップする必要がある

---

## 📊 現在のPR状態

**PR #67**: [Phase 2-5] ブログ機能強化
- URL: https://github.com/tndg16-bot/portfolio-site/pull/67
- 状態: OPEN
- ビルド: ✅ 成功

---

*最終更新: 2026-01-24*
*ブランチ: feature/blog-enhancements-share-ogp-newsletter*
