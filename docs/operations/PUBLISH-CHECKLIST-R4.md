# 公開チェックリスト r4

## 必須項目（公開前に全クリア）

### コンテンツ
- [ ] タイトル: 60字以内（buildMetadata で自動）
- [ ] description: 158字以内（buildMetadata で自動）
- [ ] H1 は1つだけ
- [ ] H2 構造が論理的（3-7個推奨）
- [ ] 表記揺れチェック

### メタデータ
- [ ] title / description / OGP 設定（buildMetadata 使用）
- [ ] OGP 画像が自動生成（@vercel/og）
- [ ] canonical URL 正しい（自動）

### 内部リンク・CTA
- [ ] 関連サービス・関連 note 最低2本
- [ ] CTA リンク最低1本（TimeRex / LINE）
- [ ] JSON-LD 配置（Schema コンポーネント使用）

### 法務・規約
- [ ] 税込明記（法人=レンジ・個人=確定額）
- [ ] クライアント実名なし（ぼかし表記）
- [ ] 画像著作権 OK

### アクセシビリティ
- [ ] 全画像に alt
- [ ] フォーカスインジケータ（Vermilion 2px outline）
- [ ] コントラスト比 4.5:1 以上
- [ ] prefers-reduced-motion 対応

### パフォーマンス
- [ ] next/image 使用
- [ ] フォント display: swap
- [ ] Lighthouse 90+ × 4指標

## 公開後（3営業日以内）
- [ ] Search Console「URL検査」→「インデックス登録リクエスト」
- [ ] sitemap.xml に新URL含まれているか確認
- [ ] GA4 リアルタイムでアクセス確認
