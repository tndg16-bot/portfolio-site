# Portfolio サイト 完全実装プラン

## 📊 現状分析

### GitHub Issue 状況
| Phase | Issue # | 状態 |
|-------|---------|------|
| Phase 2 | #5 | OPEN (Epic) |
| Phase 3 | #6 | OPEN (Epic) |
| Phase 4 | #7 | OPEN (Epic) |
| Phase 5 | #8 | OPEN (Epic) |

### 実装状況サマリー

| 機能 | 状態 | 詳細 |
|------|------|------|
| ブログシステム | ✅ 基本実装済 | Markdown + remark、3記事存在 |
| 記事追加 | ❌ 未完了 | 17記事が未作成 |
| SNSシェアボタン | ❌ 未実装 | シェアボタンなし |
| OGP設定 | ⚠️ 部分的 | 基本設定のみ、記事個別OGPなし |
| ニュースレター | ❌ 未実装 | 購読フォームなし |
| コメント機能 | ❌ 未実装 | コメントシステムなし |
| SEO強化 | ⚠️ 部分的 | 構造化データ、内部リンク未対応 |

---

## 🎯 実装優先順位

### 🔴 Phase 2 完了 (最優先)

#### Task 2-1: 記事追加 (17記事)
**推奨エージェント**: `general` (glm-4.7-free) - コンテンツ生成
**Issue**: #5 内のサブタスク

記事リスト:
1. 「直感」を信じる技術
2. "書くだけ"で悩みは9割消える
3. あなたの「当たり前」を疑う
4. "完璧主義"からの解放宣言
5. 他人の「期待」から自由になる
6. "強み"は探すな、"創り出せ"
7. なぜ「モチベーション」は続かないのか？
8. "自己肯定感が低い」は勘違い
9. AI時代の情報収集術
10. あなたの仕事、AIでどう変わる？
11. "やりたいこと"が見つからない君へ
12. "転職"の前にやるべきこと
13. 「リスキリング」の罠
14. "時間がない"は幻想
15. "朝時間"を制する者は人生を制す
16. 「やらないことリスト」のススメ
17. 最高の休息法

**実装場所**: `content/blog/004-*.md` 〜 `content/blog/020-*.md`

#### Task 2-2: SNSシェアボタン実装
**推奨エージェント**: `frontend-ui-ux-engineer` (claude-opus-4-5)
**Issue**: #5 内のサブタスク (新規Issue作成推奨)

実装内容:
- [ ] `react-share` ライブラリ導入
- [ ] ShareButtons コンポーネント作成
- [ ] Twitter(X), Facebook, LINE シェアボタン
- [ ] 記事ページ (`/blog/[slug]`) に設置

**実装場所**: 
- `src/components/ShareButtons.tsx` (新規)
- `src/app/blog/[slug]/page.tsx` (修正)

#### Task 2-3: OGP設定強化
**推奨エージェント**: `frontend-ui-ux-engineer` (claude-opus-4-5)
**Issue**: #5 内のサブタスク

実装内容:
- [ ] `generateMetadata` で記事別OGP生成
- [ ] OGP画像自動生成 (next/og または静的画像)
- [ ] Twitter Card設定

**実装場所**: `src/app/blog/[slug]/page.tsx`

---

### 🟡 Phase 3 実装

#### Task 3-1: コメント機能
**推奨エージェント**: `frontend-ui-ux-engineer` (claude-opus-4-5)
**Issue**: #12

推奨: **Giscus** (GitHub Discussions ベース)
- 無料、GitHub認証
- ダークテーマ対応

実装内容:
- [ ] Giscus セットアップ (GitHub Discussions有効化)
- [ ] GiscusComments コンポーネント作成
- [ ] 記事ページに設置

**実装場所**: 
- `src/components/GiscusComments.tsx` (新規)
- `src/app/blog/[slug]/page.tsx` (修正)

#### Task 3-2: ニュースレター機能
**推奨エージェント**: `frontend-ui-ux-engineer` (claude-opus-4-5)
**Issue**: #13

推奨: **Resend** または **ConvertKit**

実装内容:
- [ ] NewsletterForm コンポーネント作成
- [ ] API Route `/api/subscribe` 作成
- [ ] フッターまたはブログページに設置
- [ ] 確認メール送信機能

**実装場所**:
- `src/components/NewsletterForm.tsx` (新規)
- `src/app/api/subscribe/route.ts` (新規)

#### Task 3-3: SEO強化
**推奨エージェント**: `frontend-ui-ux-engineer` (claude-opus-4-5)
**Issue**: #14

実装内容:
- [ ] 構造化データ (JSON-LD) 追加
  - Article schema
  - Person schema
  - BreadcrumbList schema
- [ ] 内部リンク最適化
- [ ] sitemap.xml 強化

**実装場所**:
- `src/components/JsonLd.tsx` (新規)
- `src/app/blog/[slug]/page.tsx` (修正)

---

## 📋 新規Issue作成が必要なもの

| タスク | 推奨Issue名 |
|--------|-------------|
| SNSシェアボタン | `[Phase2] SNSシェアボタン実装` |
| OGP強化 | `[Phase2] OGP設定の強化` |

---

## 🚀 推奨実行順序

```
1. [Issue作成] SNSシェア & OGP の個別Issue作成
2. [Phase2] SNSシェアボタン実装 → frontend-ui-ux-engineer
3. [Phase2] OGP設定強化 → frontend-ui-ux-engineer  
4. [Phase2] 記事追加 (17記事) → general (並列実行可)
5. [Phase3] コメント機能 (Giscus) → frontend-ui-ux-engineer
6. [Phase3] ニュースレター機能 → frontend-ui-ux-engineer
7. [Phase3] SEO強化 → frontend-ui-ux-engineer
```

---

## ⚙️ 技術選定

| 機能 | 推奨ライブラリ | 理由 |
|------|---------------|------|
| SNSシェア | `react-share` | 軽量、多プラットフォーム対応 |
| コメント | Giscus | 無料、GitHub連携、ダークテーマ |
| ニュースレター | Resend | 無料枠あり、Next.js相性良い |
| OGP画像 | `@vercel/og` | Vercelデプロイと相性抜群 |
| 構造化データ | 手動JSON-LD | 軽量、カスタマイズ自由 |

---

*作成日: 2026-01-12*
*プランナー: Sisyphus (ULTRAWORK MODE)*
