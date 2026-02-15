## 概要

GitHub Actions で発生していた2つのエラーを修復しました。

## 修正内容

### 1. Daily Production Rebuild の失敗
- **エラー**: `files should NOT have more than 15000 items, received 22669`
- **修正**: Vercel のビルドコマンドに `--archive=tgz` オプションを追加
- **変更ファイル**:
  - `.github/workflows/daily-rebuild.yml`
  - `.github/workflows/ci-cd.yml` (preview & production builds)

### 2. CI/CD の失敗
- **エラー**: `A 'require()' style import is forbidden`
- **修正**: CommonJS の require() を ES6 import に変更
- **変更ファイル**:
  - `check-dates.js`
  - `check-github.js`
  - `scripts/generate-blog-bulk.js`
  - `scripts/generate-blog-posts.js`
  - `package.json` (type: module を追加)

## テスト

- ESLint がパスすることを確認
- CI/CD ワークフローの実行を待機

## 関連情報

- Issue: #193
- Daily Production Rebuild ログ: https://github.com/tndg16-bot/portfolio-site/actions/runs/22019834273
- CI/CD ログ: https://github.com/tndg16-bot/portfolio-site/actions/runs/22014114169
