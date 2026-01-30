# 共通データベーススキーマ設計

**作成日**: 2026-01-23
**担当**: デベースエンジニア
**対象**: Issues #83, #84, #85（共通データベース）

---

## 📋 概要

3つのBusiness Issues（#83: 自己決定プロセス、#84: 信頼スコアリング、#85: AI活用ワークフロー）で共有して使用するデータベースのスキーマを設計します。

---

## 🎯 設計原則

### 1. 正規化（Normalization）
- 重複を排除し、最小のデータ項目で構成
- 適切なデータ型の使用
- 明確なリレーションの定義

### 2. 性能（Performance）
- インデックスの戦略的な設定
- クエリの最適化
- データのパーティション（必要に応じて）

### 3. 拡張性（Scalability）
- 将来的な機能追加を考慮
- 柔軟なデータ構造を維持

### 4. セキュリティ（Security）
- 顧客データの保護
- アクセス権限の管理
- データの暗号化（必要に応じて）

---

## 🗂️ テーブル構成

### 1. ユーザーテーブル（users）

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  company TEXT,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_company ON users(company);
```

**説明**: ユーザー認証と基本情報の管理。

---

### 2. タスクテーブル（tasks）

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('completed', 'in_progress', 'pending', 'blocked')),
  priority TEXT NOT NULL CHECK (priority IN ('critical', 'high', 'medium', 'low')),
  assignee TEXT NOT NULL DEFAULT 'development-team',
  due_date DATE NOT NULL,
  dependencies JSONB DEFAULT '[]',
  issue_number INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_issue_number ON tasks(issue_number);
```

**説明**: タスクの管理。Issue #83（自己決定）、Issue #84（信頼構築）、Issue #85（AI活用）のタスクを統合して管理。

---

### 3. 決定プロセス記録テーブル（self_determination_processes）

```sql
CREATE TABLE self_determination_processes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL CHECK (step_number >= 1 AND step_number <= 6),
  step_title TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('completed', 'in_progress', 'pending')),
  content JSONB NOT NULL,
  completed_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_self_determination_processes_user_id ON self_determination_processes(user_id);
CREATE INDEX idx_self_determination_processes_step_number ON self_determination_processes(step_number);
CREATE INDEX idx_self_determination_processes_status ON self_determination_processes(status);
```

**説明**: 自己決定プロセスの6つのステップ（現状の明確化、目標の設定、選択肢の提示、内なる基準での評価、決定と実行、振り返りの学習）の記録。

---

### 4. 問いかけテンプレートテーブル（questioning_scripts）

```sql
CREATE TABLE questioning_scripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('situation', 'goal', 'options', 'values', 'intuition', 'decision', 'reflection')),
  question TEXT NOT NULL,
  follow_up_questions TEXT[],
  answer_type TEXT NOT NULL CHECK (answer_type IN ('text', 'choice', 'rating')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_questioning_scripts_category ON questioning_scripts(category);
```

**説明**: 自己決定プロセスで使用する問いかけのテンプレート。

---

### 5. 信頼スコア関連テーブル（trust_scores）

```sql
-- 信頼スコアの履歴テーブル
CREATE TABLE trust_score_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_score INTEGER NOT NULL CHECK (activity_score >= 0 AND activity_score <= 100),
  relationship_score INTEGER NOT NULL CHECK (relationship_score >= 0 AND relationship_score <= 100),
  quality_score INTEGER NOT NULL CHECK (quality_score >= 0 AND quality_score <= 100),
  revenue_score INTEGER NOT NULL CHECK (revenue_score >= 0 AND revenue_score <= 100),
  referral_score INTEGER NOT NULL CHECK (referral_score >= 0 AND referral_score <= 100),
  total_trust_score INTEGER NOT NULL CHECK (total_trust_score >= 0 AND total_trust_score <= 100),
  trust_level INTEGER NOT NULL CHECK (trust_level >= 1 AND trust_level <= 5),
  recorded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_trust_score_history_user_id ON trust_score_history(user_id);
CREATE INDEX idx_trust_score_history_recorded_at ON trust_score_history(recorded_at);
CREATE INDEX idx_trust_score_history_total_trust_score ON trust_score_history(total_trust_score);
```

**説明**: 信頼スコアの履歴を記録。

---

### 6. 活動ログテーブル（activities）

```sql
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('content_view', 'session_attended', 'feature_used', 'email_sent', 'form_submitted')),
  details JSONB,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activities_user_id ON activities(user_id);
CREATE INDEX idx_activities_type ON activities(type);
CREATE INDEX idx_activities_timestamp ON activities(timestamp);
```

**説明**: ユーザーの活動を記録。信頼スコアの活動スコアの計算に使用。

---

### 7. フィードバックテーブル（feedbacks）

```sql
CREATE TABLE feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('satisfaction', 'nps', 'open_rate')),
  score INTEGER NOT NULL CHECK (score >= -100 AND score <= 100),
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_feedbacks_user_id ON feedbacks(user_id);
CREATE INDEX idx_feedbacks_type ON feedbacks(type);
CREATE INDEX idx_feedbacks_timestamp ON feedbacks(timestamp);
```

**説明**: ユーザーからのフィードバックを記録。信頼スコアの品質スコアの計算に使用。

---

### 8. 契約テーブル（contracts）

```sql
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE,
  amount INTEGER NOT NULL CHECK (amount >= 0),
  status TEXT NOT NULL CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contracts_user_id ON contracts(user_id);
CREATE INDEX idx_contracts_status ON contracts(status);
CREATE INDEX idx_contracts_start_date ON contracts(start_date);
```

**説明**: ユーザーとの契約情報を記録。信頼スコアの収益スコアの計算に使用。

---

### 9. 紹引テーブル（referrals）

```sql
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  referee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quality_score INTEGER NOT NULL CHECK (quality_score >= 0 AND quality_score <= 100),
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX idx_referrals_referee_id ON referrals(referee_id);
CREATE INDEX idx_referrals_timestamp ON referrals(timestamp);
```

**説明**: ユーザーによる紹介情報を記録。信頼スコアの紹介スコアの計算に使用。

---

### 10. AIプロンプトテンプレートテーブル（ai_prompt_templates）

```sql
CREATE TABLE ai_prompt_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('content_creation', 'research', 'code_generation', 'marketing')),
  title TEXT NOT NULL,
  template TEXT NOT NULL,
  context TEXT,
  temperature DECIMAL(3, 2) NOT NULL CHECK (temperature >= 0 AND temperature <= 1),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_prompt_templates_category ON ai_prompt_templates(category);
CREATE INDEX idx_ai_prompt_templates_title ON ai_prompt_templates(title);
```

**説明**: AI活用ワークフローで使用するプロンプトテンプレート。

---

### 11. ジャーナルテーブル（journals）

```sql
CREATE TABLE journals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_journals_user_id ON journals(user_id);
CREATE INDEX idx_journals_created_at ON journals(created_at);
CREATE INDEX idx_journals_tags ON journals(tags);
```

**説明**: ユーザーが自己決定プロセスで学んだことや、AI活用で成功した経験などを記録するジャーナル。

---

## 🔗 テーブル間のリレーション

### ER図（Entity Relationship Diagram）

```
users (1) ──┐
           │
           ├─ (N) tasks
           │
           ├─ (N) self_determination_processes
           │
           ├─ (N) trust_score_history
           │
           ├─ (N) activities
           │
           ├─ (N) feedbacks
           │
           ├─ (N) contracts
           │
           ├─ (N) referrals (as referrer)
           │
           ├─ (N) referrals (as referee)
           │
           ├─ (N) journals
           │
           └─ (N) ai_prompt_templates (shared)

questioning_scripts (1) ── (N) self_determination_processes
```

### リレーションの説明

1. **users**:
   - **1:N tasks**: ユーザーは複数のタスクを持てる
   - **1:N self_determination_processes**: ユーザーは複数の自己決定プロセスを持てる
   - **1:N trust_score_history**: ユーザーは複数の信頼スコア履歴を持てる
   - **1:N activities**: ユーザーは複数の活動を持てる
   - **1:N feedbacks**: ユーザーは複数のフィードバックを持てる
   - **1:N contracts**: ユーザーは複数の契約を持てる
   - **1:N referrals (referrer)**: ユーザーは複数の紹介を行える
   - **1:N referrals (referee)**: ユーザーは複数の紹介を受けられる
   - **1:N journals**: ユーザーは複数のジャーナルを持てる

2. **questioning_scripts**:
   - **1:N self_determination_processes**: 問いかけテンプレートは、自己決定プロセスの各ステップで使用される

---

## 📊 共通のデータ型定義

### JSONB型の使用

各テーブルで`JSONB`型を使用するフィールドの構造：

| テーブル | フィールド | データ構造 |
|---------|---------|----------|
| tasks | dependencies | `[string]` (依存タスクのIDリスト) |
| self_determination_processes | content | `{ currentSituation: string, goals: string, options: string[], values: string[], decision: string, reflection: string }` |
| activities | details | `{ [key: string]: any }` (詳細な活動情報) |
| journals | content | `{ [key: string]: any }` (ジャーナルの詳細な内容) |

---

## 🔒 セキュリティの考慮事項

### 1. アクセス権限の管理

| ロール | アクセス可能なテーブル | 説明 |
|-------|-------------------|------|
| 管理者 | すべてのテーブル（CRUD可能） | 全てのデータにアクセス可能 |
| ユーザー | 自分のデータのみ（読み取り・一部書き込み可能） | 自分のタスク、プロセス、ジャーナルなどにアクセス可能 |
| 閲発者 | 閲発者用のデータのみ（読み取り専用） | 公開されている情報のみアクセス可能 |

### 2. データの暗号化

以下のフィールドは、暗号化して保存することを推奨：

- `users.email`
- `users.password_hash`
- `contracts.amount`

### 3. トランザクション管理

トランザクションが発生する可能性のある操作：

- 信頼スコアの更新
- 契約の作成・更新
- 支払い処理
- 紹引の作成

これらの操作は、ACID（Atomicity, Consistency, Isolation, Durability）を考慮して実装する必要があります。

---

## 📝 マイグレーションスクリプト

### 初期データの作成

```sql
-- 問いかけテンプレートの初期データ
INSERT INTO questioning_scripts (category, question, follow_up_questions, answer_type) VALUES
('situation', '今の状況をどう理解していますか？', ['何が起きているのか、客観的に言えますか？', '何を決定する必要がありますか？'], 'text'),
('goal', 'どんなゴールを目指しますか？', ['そのゴールがあなたにとってなぜ重要ですか？', 'どのゴールを優先しますか？'], 'text'),
('options', 'どのような選択肢がありますか？', ['それぞれのメリットとデメリットは何ですか？'], 'choice'),
('values', '自分の価値観は何ですか？', ['どの価値観が最も重要ですか？'], 'rating'),
('intuition', '自分の直感は何を言っていますか？', ['その選択肢を選ぶと楽しそうか？', ['その選択肢を選ぶと不安を感じるか？']], 'rating'),
('decision', 'どの選択肢を選びますか？', ['その理由は何ですか？', ['いつから実行しますか？']], 'text'),
('reflection', '期待通りにいきましたか？', ['何を学びましたか？', ['次回はどう改善できますか？']], 'text');

-- AIプロンプトテンプレートの初期データ
INSERT INTO ai_prompt_templates (category, title, template, context, temperature) VALUES
('content_creation', 'ブログ記事のアイデア出し', 'ブログ記事のアイデアを10個出してください。ターゲットはエンジニア向けです。トピックはAI活用、副業、スキルアップです。', NULL, 0.7),
('content_creation', 'ブログ記事のアウトライン作成', '「AI活用による効率化」というタイトルで記事を書くためのアウトラインを作成してください。見出し、H2、H3、箇条書きを含めてください。', NULL, 0.7),
('content_creation', 'ブログ記事のドラフト作成', '以下のアウトラインに基づいて、記事のドラフトを書いてください。本文は約1,500文字です。トーンは丁寧で専門的です。', NULL, 0.7);
```

---

## 🚀 次のステップ

1. ✅ 共通データベーススキーマ設計の作成（本ファイル）
2. 🔄 Prismaスキーマの作成
3. 🔄 データベースマイグレーションスクリプトの作成
4. 🔄 APIエンドポイントの実装計画の策定

---

**更新日**: 2026-01-23
**次の更新**: Prismaスキーマの作成時
