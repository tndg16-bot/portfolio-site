# Issueラベルの標準化ガイドライン

**作成日**: 2026-01-23
**目的**: GitHub Issuesのラベル体系を標準化し、管理を効率化する

---

## 📋 ラベル体系の定義

### カテゴリー別ラベル

#### 1. ステータス（Status）

| ラベル名 | 色 | 説明 | 使用例 |
|--------|------|------|--------|
| `status: to do` | 6D6D6 (Gray) | 未着手 | 新しいタスク、これから開始するタスク |
| `status: in progress` | 0EA5E9 (Blue) | 進行中 | 現在作業中のタスク |
| `status: in review` | F59E0B (Amber) | レビュー待ち | コードレビュー待ち、レビュー中 |
| `status: blocked` | E11D48 (Red) | ブロック中 | 依存関係でブロックされているタスク |
| `status: done` | 10B981 (Emerald) | 完了 | 完了したタスク、実装済みのタスク |
| `status: cancelled` | F95050 (Pink) | キャンセル | 中止・キャンセルされたタスク |

#### 2. 優先度（Priority）

| ラベル名 | 色 | 説明 | 使用例 |
|--------|------|------|--------|
| `priority: critical` | DC2626 (Red) | 最優先 | 緊急のタスク、すぐに対応が必要 |
| `priority: high` | EA580C (Orange) | 高優先 | 今週中に完了するタスク |
| `priority: medium` | 14B8A6 (Teal) | 中優先 | 今月中に完了するタスク |
| `priority: low` | 6B7280 (Gray) | 低優先 | 時間のある時に行うタスク |

#### 3. 種別（Type）

| ラベル名 | 色 | 説明 | 使用例 |
|--------|------|------|--------|
| `type: bug` | F97316 (Red) | バグ修正 | 既存機能の不具合の修正 |
| `type: feature` | 2563EB (Purple) | 新規機能 | 新しい機能の追加 |
| `type: enhancement` | 0369A1 (Blue) | 改善 | 既存機能の改善 |
| `type: documentation` | 0EA5E9 (Blue) | ドキュメント | ドキュメントの作成・更新 |
| `type: research` | 8B5CF6 (Cyan) | 調査・研究 | リサーチ、調査、分析 |
| `type: task` | 6D6D6 (Gray) | タスク | 一般的なタスク、作業 |

#### 4. チーム（Team）

| ラベル名 | 色 | 説明 | 使用例 |
|--------|------|------|--------|
| `team: design` | EC4899 (Pink) | デザイン | UI/UXデザイン、フロントエンド |
| `team: engineering` | 3B82F6 (Blue) | エンジニアリング | バックエンド、API、インフラ |
| `team: content` | 10B981 (Emerald) | コンテンツ | ブログ記事、SNS投稿、メール配信 |
| `team: marketing` | 8B5CF6 (Cyan) | マーケティング | マーケティング戦略、広告、SEO |
| `team: business` | 14B8A6 (Teal) | ビジネス | ビジネス戦略、契約、パートナーシップ |

#### 5. 関連Issue（Related）

| ラベル名 | 色 | 説明 | 使用例 |
|--------|------|------|--------|
| `issue: #51` | 2563EB (Purple) | ブログ読みやすさ改善 | Issue #51に関連するタスク |
| `issue: #83` | 14B8A6 (Teal) | 自己決定製品 | Issue #83に関連するタスク |
| `issue: #84` | 10B981 (Emerald) | 信頼獲得戦略 | Issue #84に関連するタスク |
| `issue: #85` | 8B5CF6 (Cyan) | AI活用ロードマップ | Issue #85に関連するタスク |

---

## 📊 ラベルの使用ルール

### 1. ステータス（Status）の使用ルール

- `status: to do`: 新しいIssueを作成した時は必ず付与
- `status: in progress`: 作業を開始した時には必ず付与
- `status: in review`: レビューをリクエストした時や、PRを作成した時に付与
- `status: blocked`: 依存関係でブロックされている時は必ず付与し、理由をコメントに記述
- `status: done`: 完了した時には必ず付与（他のステータスラベルは削除）
- `status: cancelled`: 中止・キャンセルした時には付与（他のステータスラベルは削除）

**注意**: 1つのIssueには必ず1つのステータスラベルのみ付与すること

### 2. 優先度（Priority）の使用ルール

- `priority: critical`: 今週中に完了しないと重大な影響があるタスク
- `priority: high`: 今週中に完了する必要があるタスク
- `priority: medium`: 今月中に完了するタスク
- `priority: low`: 時間のある時に行うタスク

**注意**: 1つのIssueには必ず1つの優先度ラベルのみ付与すること

### 3. 種別（Type）の使用ルール

- `type: bug`: 既存機能の不具合を修正するタスク
- `type: feature`: 新しい機能を追加するタスク
- `type: enhancement`: 既存機能を改善するタスク
- `type: documentation`: ドキュメントの作成・更新・改善
- `type: research`: リサーチ、調査、分析、市場調査
- `type: task`: 上記に当てはまらない一般的なタスク

**注意**: 1つのIssueには必ず1つの種別ラベルのみ付与すること

### 4. チーム（Team）の使用ルール

- `team: design`: デザインに関連するタスク
- `team: engineering`: エンジニアリングに関連するタスク
- `team: content`: コンテンツ制作に関連するタスク
- `team: marketing`: マーケティングに関連するタスク
- `team: business`: ビジネスに関連するタスク

**注意**: 1つのIssueには必ず1つのチームラベルのみ付与すること（明確なチームがない場合は不要）

### 5. 関連Issue（Related）の使用ルール

- `issue: #xx`: 特定のIssue番号に関連するタスク
- 複数の関連Issueにまたがる場合は、複数のラベルを付与してもOK
- 大きなIssueのサブタスクは、親Issueの番号を付与

---

## 🔧 ラベルの作成手順

### GitHub Web UIでの作成

1. `https://github.com/tndg16-bot/portfolio-site/labels` にアクセス
2. "Create label" をクリック
3. 上記のラベル体系を参考にラベルを作成

### GitHub CLIでの作成

```bash
# ステータスの作成
gh label create "status: to do" --color 6D6D6 --description "未着手"
gh label create "status: in progress" --color 0EA5E9 --description "進行中"
gh label create "status: in review" --color F59E0B --description "レビュー待ち"
gh label create "status: blocked" --color E11D48 --description "ブロック中"
gh label create "status: done" --color 10B981 --description "完了"
gh label create "status: cancelled" --color F95050 --description "キャンセル"

# 優先度の作成
gh label create "priority: critical" --color DC2626 --description "最優先"
gh label create "priority: high" --color EA580C --description "高優先"
gh label create "priority: medium" --color 14B8A6 --description "中優先"
gh label create "priority: low" --color 6B7280 --description "低優先"

# 種別の作成
gh label create "type: bug" --color F97316 --description "バグ修正"
gh label create "type: feature" --color 2563EB --description "新規機能"
gh label create "type: enhancement" --color 0369A1 --description "改善"
gh label create "type: documentation" --color 0EA5E9 --description "ドキュメント"
gh label create "type: research" --color 8B5CF6 --description "調査・研究"
gh label create "type: task" --color 6D6D6 --description "タスク"

# チームの作成
gh label create "team: design" --color EC4899 --description "デザイン"
gh label create "team: engineering" --color 3B82F6 --description "エンジニアリング"
gh label create "team: content" --color 10B981 --description "コンテンツ"
gh label create "team: marketing" --color 8B5CF6 --description "マーケティング"
gh label create "team: business" --color 14B8A6 --description "ビジネス"

# 関連Issueの作成
gh label create "issue: #51" --color 2563EB --description "ブログ読みやすさ改善"
gh label create "issue: #83" --color 14B8A6 --description "自己決定製品"
gh label create "issue: #84" --color 10B981 --description "信頼獲得戦略"
gh label create "issue: #85" --color 8B5CF6 --description "AI活用ロードマップ"
```

---

## 📋 Issue作成のテンプレート

### 新規Issueの作成

```markdown
## タイトル

### 説明
Issueの目的と期待される成果を記述

### 背景（オプション）
なぜこのIssueが必要なのかを記述

### 受け入れ基準（オプション）
どうなったら完了とみなすのかを記述

### タスク（オプション）
具体的なタスクを箇条書きで記述

### 関連Issue（オプション）
関連するIssue番号を記述

### 担当チーム
[ ] design
[ ] engineering
[ ] content
[ ] marketing
[ ] business
```

### ラベルの付与ルール

新規Issueを作成した時は、必ず以下のラベルを付与：

1. **必須**:
   - `status: to do`

2. **オプション**（状況に応じて）:
   - `priority: critical`, `priority: high`, `priority: medium`, `priority: low`
   - `type: bug`, `type: feature`, `type: enhancement`, `type: documentation`, `type: research`, `type: task`
   - `team: design`, `team: engineering`, `team: content`, `team: marketing`, `team: business`
   - `issue: #51`, `issue: #83`, `issue: #84`, `issue: #85`

---

## 🔍 既存のIssueの整理

### ラベルの付与状況の確認

1. `https://github.com/tndg16-bot/portfolio-site/issues` にアクセス
2. 各Issueのラベルを確認
3. 欠けているラベルを追加
4. 重複しているラベルを削除

### Issueの分類

- [ ] Issue #51: ブログ読みやすさ改善
  - ステータス: `status: done`
  - 優先度: `priority: high`
  - 種別: `type: feature` / `type: enhancement`
  - チーム: `team: content` / `team: design`
  - 関連: `issue: #51`

- [ ] Issue #83: 自己決定に基づく独自の商品設計
  - ステータス: `status: to do`
  - 優先度: `priority: high`
  - 種別: `type: feature` / `type: research`
  - チーム: `team: business` / `team: design`
  - 関連: `issue: #83`

- [ ] Issue #84: 信頼獲得型の案件獲得戦略
  - ステータス: `status: to do`
  - 優先度: `priority: high`
  - 種別: `type: feature` / `type: research`
  - チーム: `team: business` / `team: marketing`
  - 関連: `issue: #84`

- [ ] Issue #85: AIを活用した最速収益化ロードマップの作成
  - ステータス: `status: to do`
  - 優先度: `priority: high`
  - 種別: `type: feature` / `type: research`
  - チーム: `team: business` / `team: content`
  - 関連: `issue: #85`

---

## 📊 ラベルの統計

### 現在のラベルの使用状況

| カテゴリー | ラベル数 | 使用例 |
|----------|---------|--------|
| ステータス | 6 | to do, in progress, in review, blocked, done, cancelled |
| 優先度 | 4 | critical, high, medium, low |
| 種別 | 6 | bug, feature, enhancement, documentation, research, task |
| チーム | 5 | design, engineering, content, marketing, business |
| 関連Issue | 4 | #51, #83, #84, #85 |
| 合計 | 25 | - |

---

## 🔄 メンテナンス

### 定期的なメンテナンス

- [ ] 週に1回、ラベルの使用状況を確認
- [ ] 月に1回、ラベル体系の見直し
- [ ] 新しいラベルが必要な場合、議論して追加

### ラベルの見直し

- [ ] ラベルの色を見直し、視覚的な一貫性を確保
- [ ] 使用頻度の低いラベルを削除
- [ ] 重複しているラベルを統合

---

## 📝 次のステップ

1. ✅ ラベル体系の定義完了
2. ⏳ GitHubでのラベルの作成
3. ⏳ 既存のIssueへのラベルの付与
4. ⏳ ラベルの使用ルールの周知
5. ⏳ 定期的なメンテナンスの開始

---

**更新日**: 2026-01-23
**次の更新**: ラベルの作成完了時または月次見直し時
