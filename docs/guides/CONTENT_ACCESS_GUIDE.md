# コンテンツアクセス方法と構造化ガイド

## 📌 概要

本山貴裕のポートフォリオサイトのコンテンツ（ブログ記事）にアクセスする方法と、カテゴリ構造を整理したガイドです。

**作成日**: 2026-01-30
**最終更新**: 2026-01-30

---

## 📍 コンテンツへのアクセス方法

### 現在のアクセス経路

| ページ | URL | 説明 | ステータス |
|--------|------|------|----------|
| **ブログ一覧** | `/blog` | 全記事の一覧表示 | ✅ 完了 |
| **記事詳細** | `/blog/[slug]` | 個別記事ページ | ✅ 完了 |
| **タグ検索** | `/blog/tag/[tag]` | タグで記事をフィルタリング | ✅ 完了 |
| **カテゴリ検索** | `/blog/category/[category]` | カテゴリで記事をフィルタリング | ✅ 新規実装 |

---

## 📊 現在のコンテンツ状況

### 記事数

- **総記事数**: 100記事
- **カテゴリ数**: 10種類（英語含む）
- **タグ数**: 記事ごとに設定

### カテゴリ別記事数（100記事実態）

| カテゴリ | 記事数 | 割合 |
|----------|--------|------|
| キャリア | 16 | 16% |
| コーチング | 15 | 15% |
| 生産性 | 25 (Productivity含む) | 25% |
| 思考法 | 13 | 13% |
| マインドセット | 16 (Mindset含む) | 16% |
| メンタルモデル | 8 (Mental Model含む) | 8% |
| AI活用 | 7 (AI含む) | 7% |

**注**: 一部の記事は英語カテゴリ（Productivity, Mindset, Mental Model, AI）を使用しています。これらを日本語に統一することを推奨します。

---

## 🏗️ データベース構造

### 現在のアーキテクチャ

**コンテンツ管理方式**: Markdownファイルベース
- 保存場所: `content/blog/`
- ファイル形式: `.md` (Markdown with Frontmatter)
- データ取得: `lib/posts.ts` でファイルシステムから直接読み込み

**メリット**:
- ✅ 静的サイト生成（SSG）が可能
- ✅ バージョン管理（Git）と親和性が高い
- ✅ デプロイが簡易

**デメリット**:
- ❌ 検索機能が限定
- ❌ 高度なフィルタリング・ソートが困難
- ❌ ユーザー行動分析が難しい
- ❌ 動的な関連記事表示が限定

### Supabaseデータベース

現在、Supabaseは以下のテーブルを持っています（コース販売用）：

| テーブル | 用途 | ステータス |
|----------|------|----------|
| `courses` | コース情報 | ✅ 定義済み |
| `modules` | モジュール情報 | ✅ 定義済み |
| `lessons` | レッスン情報 | ✅ 定義済み |
| `enrollments` | 受講情報 | ✅ 定義済み |
| `user_progress` | 学習進捗 | ✅ 定義済み |

**注**: ブログ記事用のテーブルは未定義です。

---

## 🗃️ ブログ用データベースの設計案

### オプション1: Markdownのまま拡張（推奨）

**理由**:
- 現状では100記事と小規模
- SSGの恩恵（高速、SEO）を維持
- ファイル管理がシンプル

**実装済みの改善**:
- ✅ カテゴリフィルタリング機能 (`/blog/category/[category]`)
- ✅ カテゴリ別記事数表示
- ✅ 関連記事表示機能（タグ・カテゴリベース）

### オプション2: Supabaseへ移行（将来的な検討）

ブログ用テーブルを追加する場合のスキーマ案：

```sql
-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[],
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog analytics table
CREATE TABLE IF NOT EXISTS blog_analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  views INTEGER DEFAULT 0,
  read_time_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**メリット**:
- 高度な検索・フィルタリング
- アクセス解析・ユーザー行動分析
- 動的関連記事推薦
- コメントシステムの統合

**デメリット**:
- 開発・運用コストの増加
- Supabase設定が必要（Issue #61）

---

## 🎨 アクセシビリティ向上の実装

### 実装済みの機能

1. **カテゴリフィルタリング**
   - URL: `/blog/category/[category]`
   - 各カテゴリページで記事一覧表示
   - 「ブログ一覧に戻る」ナビゲーション

2. **カテゴリ別記事数表示**
   - サイドバーに各カテゴリの記事数を表示
   - 例: `キャリア(16)`

3. **タグ検索**
   - URL: `/blog/tag/[tag]`
   - 既存機能の強化

### 検討中の機能

| 機能 | 優先度 | 説明 |
|------|--------|------|
| 全文検索 | 中 | 記事タイトル・本文でのキーワード検索 |
| 並び替え | 低 | 日付順・人気順・読了時間順 |
| シリアル読み | 低 | 同一カテゴリの記事を順番に読む機能 |
| お気に入り | 低 | ユーザーが記事を保存（認証が必要） |

---

## 📁 ファイル構造

```
src/
├── app/
│   └── blog/
│       ├── page.tsx                    # ブログ一覧（カテゴリ・タグ表示）
│       ├── [slug]/page.tsx             # 記事詳細
│       ├── tag/[tag]/page.tsx          # タグ検索ページ
│       └── category/[category]/page.tsx  # カテゴリ検索ページ（新規実装）
├── lib/
│   └── posts.ts                      # ブログデータ取得関数
└── components/
    └── NewsletterForm.tsx             # ニュースレター登録フォーム

content/
└── blog/
    ├── 001-knowhow-dependency.md       # 例: ノウハウ依存からの卒業
    ├── 002-ai-thinking-partner.md     # 例: AI思考パートナー
    ├── ...
    └── 100-consistency-power.md       # 例: 継続の力
```

---

## 🚀 使い方

### ユーザー視点

1. **ブログ一覧を見る**: https://takahiro-motoyama.vercel.app/blog
2. **カテゴリで探す**: 左サイドバーのカテゴリをクリック
3. **タグで探す**: 左サイドバーのタグをクリック
4. **記事を読む**: 記事カードをクリック

### 開発者視点

**新しい記事を追加する場合**:
1. `content/blog/` にMarkdownファイルを作成
2. Frontmatterを設定（タイトル、カテゴリ、タグなど）
3. ビルドすると自動的にページに表示

**カテゴリ名を変更する場合**:
- MarkdownファイルのFrontmatterの `category` フィールドを更新
- ビルドすると自動的に反映

---

## 🔗 関連リンク

- [ブログ執筆ガイドライン](./docs/guides/BLOG_GUIDELINES.md)
- [プロジェクト概要](./PROJECT_OVERVIEW.md)
- [プロジェクト進捗](./PROJECT_OVERVIEW_ALL.md)
- [ニュースレター戦略](./.sisyphus/plans/newsletter-strategy.md)

---

## 📝 次のステップ

### 短期的（1週間以内）

1. [ ] カテゴリ名の統一（英語 → 日本語）
2. [ ] 全文検索機能の実装（フロントエンドのみ）
3. [ ] サイトマップの更新（カテゴリページ追加）

### 中期的（1ヶ月以内）

1. [ ] アクセス解析の導入（Vercel Analytics）
2. [ ] ユーザー行動に基づく関連記事改善
3. [ ] 記事の人気順・読了時間順ソート

### 長期的（3ヶ月以上）

1. [ ] Supabaseへの移行検討（Issue #61完了後）
2. [ ] ユーザー認証機能の導入
3. [ ] お気に入り・シリアル読み機能

---

**最終更新**: 2026-01-30
**担当**: PM (Sisyphus)
