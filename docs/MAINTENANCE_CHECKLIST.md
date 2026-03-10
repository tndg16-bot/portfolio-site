# メンテナンスチェックリスト

**作成日**: 2026-02-18
**対象Issue**: #210

---

## 日次チェック（自動）

- [x] 予約投稿の自動公開（00:00 JST） - **自動実行**
- [x] Vercel Cron Jobs実行 - **自動実行**

**確認方法**: Vercel Dashboard > Cron Jobs

---

## 週次チェック（毎週月曜日）

### アクセス解析
- [ ] Google Analytics 4で前週のPV/UUを確認
- [ ] 人気ページTOP5を確認
- [ ] 流入元を確認（検索/SNS/直接）

### パフォーマンス
- [ ] Vercel AnalyticsでReal User Monitoringを確認
- [ ] Core Web Vitalsが良好であることを確認

### エラー確認
- [ ] Vercel Error Logsを確認
- [ ] 5xxエラーの有無をチェック
- [ ] Supabase Logsを確認（DBエラー）

**確認方法**:
- Vercel Dashboard > Analytics
- Vercel Dashboard > Functions > Logs
- Supabase Dashboard > Logs

---

## 月次チェック（毎月1日）

### セキュリティ
- [ ] `npm audit`を実行して脆弱性を確認
- [ ] 高リスクの脆弱性があれば即座に対応
- [ ] 環境変数のローテーション確認

### 依存関係
- [ ] `npm outdated`で古いパッケージを確認
- [ ] メジャーアップデートの検討

### SEO
- [ ] Google Search Consoleでインデックス状況を確認
- [ ] 検索パフォーマンスを確認
- [ ] Core Web Vitals レポートを確認

### コンテンツ
- [ ] 先月の記事投稿数を確認（目標: 8-12本）
- [ ] コメント・問い合わせの対応状況確認
- [ ] 古い記事の更新が必要か確認

**確認方法**:
```bash
# 脆弱性チェック
npm audit

# 古いパッケージ確認
npm outdated

# セキュリティ修正
npm audit fix
```

---

## 四半期チェック（1月/4月/7月/10月）

### 技術スタック
- [ ] Next.jsの新バージョン確認
- [ ] Reactの新バージョン確認
- [ ] その他メジャーパッケージの更新確認

### 戦略レビュー
- [ ] KPI達成状況の確認
- [ ] 運用計画の見直し
- [ ] ロードマップの更新

### ドキュメント
- [ ] 運用計画の更新
- [ ] ロードマップの更新
- [ ] ガイドラインの見直し

---

## 緊急時対応フロー

### デプロイ失敗時
1. Vercel Dashboard > Deploymentsで失敗したデプロイを確認
2. Build Logsでエラー内容を特定
3. 原因を修正してコミット
4. 再デプロイを確認

### サイトダウン時
1. Vercel Status (https://www.vercel-status.com/) を確認
2. Vercel Dashboardでプロジェクト状態を確認
3. 必要に応じてロールバック
   - Vercel Dashboard > Deployments > 前のデプロイ > Promote to Production

### セキュリティインシデント時
1. 影響範囲を特定
2. 脆弱性のあるパッケージを更新
3. 必要に応じてAPIキー等をローテーション
4. Supabase Dashboardで不審なアクセスを確認

---

## バックアップ・復旧

### 自動バックアップ
- **Gitリポジトリ**: GitHub (リアルタイム)
- **Supabase DB**: 日次自動バックアップ（30日保持）

### 手動バックアップ
- 環境変数: Vercel Dashboardからダウンロード
- 大規模変更前: Gitタグ作成

### 復旧手順

#### コードロールバック
```bash
# 前のコミットに戻す
git revert HEAD

# または強制ロールバック（注意）
git reset --hard HEAD~1
git push --force
```

#### Supabase復旧
1. Supabase Dashboard > Database > Backups
2. 復元したいバックアップを選択
3. Restore実行

---

## 連絡先・リソース

### ダッシュボード
- Vercel: https://vercel.com/dashboard
- Supabase: https://supabase.com/dashboard
- Google Analytics: https://analytics.google.com/
- Google Search Console: https://search.google.com/search-console

### ドキュメント
- 運用計画: docs/OPERATION_PLAN.md
- 運用分析レポート: docs/OPERATION_ANALYSIS_REPORT.md
- ロードマップ: ROADMAP.md
- ブログガイドライン: docs/guides/BLOG_GUIDELINES.md

---

*このチェックリストは Issue #210 の一部として作成されました。*
