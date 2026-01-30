# 信頼スコアリングシステムのデータベース詳細設計

**作成日**: 2026-01-23
**担当**: デベースエンジニア
**対象**: Issue #84 - 信頼獲得型の案件獲得戦略

---

## 📋 概要

信頼スコアリングシステムを支えるデータベースの詳細設計を行います。PostgreSQL + Prismaを使用し、拡張性と性能を考慮します。

---

## 🗂️ テーブル設計の詳細

### 1. Users テーブル（ユーザー管理）

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL CHECK (char_length(email) >= 5 AND char_length(email) <= 255),
  name TEXT NOT NULL CHECK (char_length(name) >= 1 AND char_length(name) <= 255),
  company TEXT CHECK (char_length(company) >= 1 AND char_length(company) <= 255),
  password_hash TEXT NOT NULL CHECK (char_length(password_hash) >= 60),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- インデックスの追加
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_company ON users(company);
CREATE INDEX idx_users_created_at ON users(created_at);

-- 複合ユニーク制約
CREATE UNIQUE INDEX idx_users_email_company ON users(email, company);

-- デフォルト値の設定
ALTER TABLE users ALTER COLUMN name SET DEFAULT '';
ALTER TABLE users ALTER COLUMN company SET DEFAULT NULL;
```

**詳細**:
- `id`: UUID型、一意な識別子
- `email`: TEXT型、5〜255文字、一意制約
- `name`: TEXT型、1〜255文字
- `company`: TEXT型、1〜255文字、NULL可能
- `password_hash`: TEXT型、60文字以上（ハッシュ化されたパスワード）
- `created_at` / `updated_at`: TIMESTAMP型、自動更新

### 2. Tasks テーブル（タスク管理）

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL CHECK (char_length(title) >= 1 AND char_length(title) <= 255),
  description TEXT CHECK (char_length(description) >= 1 AND char_length(description) <= 1000),
  status TEXT NOT NULL CHECK (status IN ('completed', 'in_progress', 'pending', 'blocked')),
  priority TEXT NOT NULL CHECK (priority IN ('critical', 'high', 'medium', 'low')),
  assignee TEXT NOT NULL DEFAULT 'development-team' CHECK (char_length(assignee) >= 1 AND char_length(assignee) <= 100),
  due_date DATE NOT NULL CHECK (due_date >= CURRENT_DATE),
  dependencies JSONB DEFAULT '[]' CHECK (jsonb_typeof(dependencies) = 'array'),
  issue_number INTEGER CHECK (issue_number >= 1),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- インデックスの追加
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_issue_number ON tasks(issue_number);

-- 複合ユニーク制約（ユーザーごとの一意性）
CREATE UNIQUE INDEX idx_tasks_user_title ON tasks(user_id, title);
```

**詳細**:
- `id`: UUID型
- `user_id`: UUID型、usersテーブルへの外部キー
- `status`: ENUM型、`completed`, `in_progress`, `pending`, `blocked`
- `priority`: ENUM型、`critical`, `high`, `medium`, `low`
- `assignee`: TEXT型、担当者（デフォルト: 'development-team'）
- `due_date`: DATE型、期限（未来の日付のみ）
- `dependencies`: JSONB型、依存タスクのID配列
- `issue_number`: INTEGER型、GitHub Issueの番号

### 3. SelfDeterminationProcesses テーブル（自己決定プロセス）

```sql
CREATE TABLE self_determination_processes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL CHECK (step_number >= 1 AND step_number <= 6),
  step_title TEXT NOT NULL CHECK (char_length(step_title) >= 1 AND char_length(step_title) <= 100),
  status TEXT NOT NULL CHECK (status IN ('completed', 'in_progress', 'pending')),
  content JSONB NOT NULL CHECK (jsonb_typeof(content) = 'object'),
  completed_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- インデックスの追加
CREATE INDEX idx_self_determination_processes_user_id ON self_determination_processes(user_id);
CREATE INDEX idx_self_determination_processes_step_number ON self_determination_processes(step_number);
CREATE INDEX idx_self_determination_processes_status ON self_determination_processes(status);

-- 複合ユニーク制約（ユーザーごとの一意性）
CREATE UNIQUE INDEX idx_self_determination_processes_user_step ON self_determination_processes(user_id, step_number);
```

**詳細**:
- `step_number`: INTEGER型、1〜6（6つのステップ）
- `step_title`: TEXT型、ステップのタイトル
- `status`: ENUM型、`completed`, `in_progress`, `pending`
- `content`: JSONB型、ステップの詳細な内容（例: `{ "currentSituation": "...", "goals": "..." }`）
- `completed_at`: TIMESTAMP型、完了日時（NULL可能）

### 4. QuestioningScripts テーブル（問いかけスクリプト）

```sql
CREATE TABLE questioning_scripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('situation', 'goal', 'options', 'values', 'intuition', 'decision', 'reflection')),
  question TEXT NOT NULL CHECK (char_length(question) >= 10 AND char_length(question) <= 255),
  follow_up_questions TEXT[] NOT NULL CHECK (array_length(follow_up_questions) >= 1 AND array_length(follow_up_questions) <= 5),
  answer_type TEXT NOT NULL CHECK (answer_type IN ('text', 'choice', 'rating')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- インデックスの追加
CREATE INDEX idx_questioning_scripts_category ON questioning_scripts(category);
CREATE INDEX idx_questioning_scripts_answer_type ON questioning_scripts(answer_type);
```

**詳細**:
- `category`: ENUM型、問いのカテゴリー
- `question`: TEXT型、10〜255文字
- `follow_up_questions`: TEXT配列、1〜5個
- `answer_type`: ENUM型、`text`, `choice`, `rating`

### 5. TrustScoreHistory テーブル（信頼スコア履歴）

```sql
CREATE TABLE trust_score_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_score INTEGER NOT NULL DEFAULT 0 CHECK (activity_score >= 0 AND activity_score <= 100),
  relationship_score INTEGER NOT NULL DEFAULT 0 CHECK (relationship_score >= 0 AND relationship_score <= 100),
  quality_score INTEGER NOT NULL DEFAULT 0 CHECK (quality_score >= 0 AND quality_score <= 100),
  revenue_score INTEGER NOT NULL DEFAULT 0 CHECK (revenue_score >= 0 AND revenue_score <= 100),
  referral_score INTEGER NOT NULL DEFAULT 0 CHECK (referral_score >= 0 AND referral_score <= 100),
  total_trust_score INTEGER NOT NULL DEFAULT 0 CHECK (total_trust_score >= 0 AND total_trust_score <= 100),
  trust_level INTEGER NOT NULL DEFAULT 1 CHECK (trust_level >= 1 AND trust_level <= 5),
  recorded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- インデックスの追加
CREATE INDEX idx_trust_score_history_user_id ON trust_score_history(user_id);
CREATE INDEX idx_trust_score_history_recorded_at ON trust_score_history(recorded_at);
CREATE INDEX idx_trust_score_history_total_trust_score ON trust_score_history(total_trust_score);
CREATE INDEX idx_trust_score_history_trust_level ON trust_score_history(trust_level);
```

**詳細**:
- `activity_score`: 活動スコア、0〜100
- `relationship_score`: 関係スコア、0〜100
- `quality_score`: 品質スコア、0〜100
- `revenue_score`: 収益スコア、0〜100
- `referral_score`: 紹介スコア、0〜100
- `total_trust_score`: 全体の信頼スコア、0〜100
- `trust_level`: 信頼レベル、1〜5

### 6. Activities テーブル（活動ログ）

```sql
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('content_view', 'session_attended', 'feature_used', 'email_sent', 'form_submitted')),
  details JSONB DEFAULT 'NULL',
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- インデックスの追加
CREATE INDEX idx_activities_user_id ON activities(user_id);
CREATE INDEX idx_activities_type ON activities(type);
CREATE INDEX idx_activities_timestamp ON activities(timestamp);
```

**詳細**:
- `type`: ENUM型、活動の種類
- `details`: JSONB型、詳細情報
- `timestamp`: TIMESTAMP型、活動のタイムスタンプ

### 7. Feedbacks テーブル（フィードバック）

```sql
CREATE TABLE feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('satisfaction', 'nps', 'open_rate')),
  score INTEGER NOT NULL CHECK (
    CASE
      WHEN type = 'satisfaction' THEN (score >= 1 AND score <= 5)
      WHEN type = 'nps' THEN (score >= -100 AND score <= 100)
      WHEN type = 'open_rate' THEN (score >= 0 AND score <= 100)
      ELSE FALSE
    END
  ),
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- インデックスの追加
CREATE INDEX idx_feedbacks_user_id ON feedbacks(user_id);
CREATE INDEX idx_feedbacks_type ON feedbacks(type);
CREATE INDEX idx_feedbacks_timestamp ON feedbacks(timestamp);
```

**詳細**:
- `type`: ENUM型、フィードバックの種類
- `score`: INTEGER型、スコア（制約あり）
- `timestamp`: TIMESTAMP型、フィードバックのタイムスタンプ

### 8. Contracts テーブル（契約）

```sql
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  start_date DATE NOT NULL CHECK (start_date >= CURRENT_DATE),
  end_date DATE CHECK (end_date IS NULL OR end_date >= start_date),
  amount INTEGER NOT NULL CHECK (amount >= 0),
  status TEXT NOT NULL CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- インデックスの追加
CREATE INDEX idx_contracts_user_id ON contracts(user_id);
CREATE INDEX idx_contracts_status ON contracts(status);
CREATE INDEX idx_contracts_start_date ON contracts(start_date);
CREATE INDEX idx_contracts_amount ON contracts(amount);
```

**詳細**:
- `start_date`: DATE型、契約開始日（未来の日付のみ）
- `end_date`: DATE型、契約終了日（NULLまたは開始日以降）
- `amount`: INTEGER型、契約金額（0以上）
- `status`: ENUM型、`active`, `completed`, `cancelled`

### 9. Referrals テーブル（紹介）

```sql
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  referee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quality_score INTEGER NOT NULL DEFAULT 0 CHECK (quality_score >= 0 AND quality_score <= 100),
  business_owner_type TEXT NOT NULL CHECK (business_owner_type IN ('business_owner', 'individual')),
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- インデックスの追加
CREATE INDEX idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX idx_referrals_referee_id ON referrals(referee_id);
CREATE INDEX idx_referrals_timestamp ON referrals(timestamp);
CREATE INDEX idx_referrals_quality_score ON referrals(quality_score);

-- 複合ユニーク制約（紹介元と紹介先の組み合わせの一意性）
CREATE UNIQUE INDEX idx_referrals_referee_referrer ON referrals(referee_id, referrer_id);
```

**詳細**:
- `referrer_id`: UUID型、紹介元ユーザーID
- `referee_id`: UUID型、紹介先ユーザーID
- `quality_score`: INTEGER型、紹介品質スコア、0〜100
- `business_owner_type`: ENUM型、`business_owner`, `individual`

### 10. Journals テーブル（ジャーナル）

```sql
CREATE TABLE journals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL CHECK (char_length(title) >= 1 AND char_length(title) <= 255),
  content JSONB NOT NULL CHECK (jsonb_typeof(content) = 'object'),
  tags TEXT[] DEFAULT '[]',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- インデックスの追加
CREATE INDEX idx_journals_user_id ON journals(user_id);
CREATE INDEX idx_journals_created_at ON journals(created_at);
CREATE INDEX idx_journals_tags ON journals(tags);

-- GINインデックスの追加（タグ検索用）
CREATE INDEX idx_journals_tags_gin ON journals USING GIN (tags);
```

**詳細**:
- `title`: TEXT型、タイトル（1〜255文字）
- `content`: JSONB型、ジャーナルの詳細な内容
- `tags`: TEXT配列、タグ

---

## 🔒 データベースのパフォーマンス最適化

### 1. インデックスの戦略的設定

```sql
-- ユーザーテーブルのインデックス
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
CREATE INDEX CONCURRENTLY idx_users_company ON users(company);
CREATE INDEX CONCURRENTLY idx_users_created_at ON users(created_at);
CREATE INDEX CONCURRENTLY idx_users_email_company ON users(email, company);

-- タスクテーブルのインデックス
CREATE INDEX CONCURRENTLY idx_tasks_user_id ON tasks(user_id);
CREATE INDEX CONCURRENTLY idx_tasks_status ON tasks(status);
CREATE INDEX CONCURRENTLY idx_tasks_priority ON tasks(priority);
CREATE INDEX CONCURRENTLY idx_tasks_due_date ON tasks(due_date);
CREATE INDEX CONCURRENTLY idx_tasks_issue_number ON tasks(issue_number);
CREATE INDEX CONCURRENTLY idx_tasks_user_title ON tasks(user_id, title);

-- 信頼スコア履歴テーブルのインデックス
CREATE INDEX CONCURRENTLY idx_trust_score_history_user_id ON trust_score_history(user_id);
CREATE INDEX CONCURRENTLY idx_trust_score_history_recorded_at ON trust_score_history(recorded_at DESC);
CREATE INDEX CONCURRENTLY idx_trust_score_history_total_trust_score ON trust_score_history(total_trust_score);
CREATE INDEX CONCURRENTLY idx_trust_score_history_trust_level ON trust_score_history(trust_level);

-- 活動ログテーブルのインデックス
CREATE INDEX CONCURRENTLY idx_activities_user_id ON activities(user_id);
CREATE INDEX CONCURRENTLY idx_activities_type ON activities(type);
CREATE INDEX CONCURRENTLY idx_activities_timestamp ON activities(timestamp);

-- フィードバックテーブルのインデックス
CREATE INDEX CONCURRENTLY idx_feedbacks_user_id ON feedbacks(user_id);
CREATE INDEX CONCURRENTLY idx_feedbacks_type ON feedbacks(type);
CREATE INDEX CONCURRENTLY idx_feedbacks_timestamp ON feedbacks(timestamp);

-- 契約テーブルのインデックス
CREATE INDEX CONCURRENTLY idx_contracts_user_id ON contracts(user_id);
CREATE INDEX CONCURRENTLY idx_contracts_status ON contracts(status);
CREATE INDEX CONCURRENTLY idx_contracts_start_date ON contracts(start_date);
CREATE INDEX CONCURRENTLY idx_contracts_amount ON contracts(amount);

-- 紹引テーブルのインデックス
CREATE INDEX CONCURRENTLY idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX CONCURRENTLY idx_referrals_referee_id ON referrals(referee_id);
CREATE INDEX CONCURRENTLY idx_referrals_timestamp ON referrals(timestamp);
CREATE INDEX CONCURRENTLY idx_referrals_quality_score ON referrals(quality_score);
CREATE INDEX CONCURRENTLY idx_referrals_referee_referrer ON referrals(referee_id, referrer_id);

-- ジャーナルテーブルのインデックス
CREATE INDEX CONCURRENTLY idx_journals_user_id ON journals(user_id);
CREATE INDEX CONCURRENTLY idx_journals_created_at ON journals(created_at);
CREATE INDEX CONCURRENTLY idx_journals_tags ON journals(tags);
CREATE INDEX CONCURRENTLY idx_journals_tags_gin ON journals USING GIN (tags);
```

### 2. パーティション戦略

```sql
-- 信頼スコア履歴テーブルのパーティション（月次）
CREATE TABLE trust_score_history_2026_01 PARTITION OF trust_score_history
FOR VALUES FROM ('2026-01-01') TO ('2026-01-31');

CREATE TABLE trust_score_history_2026_02 PARTITION OF trust_score_history
FOR VALUES FROM ('2026-02-01') TO ('2026-02-28');

-- 月次パーティションの自動作成（PostgreSQL 14+）
-- ALTER TABLE trust_score_history ADD CONSTRAINT trust_score_history_check
-- EXCLUDE USING (trust_score_history)
-- VALIDATION (recorded_at >= '2026-01-01' AND recorded_at < '2026-02-01');
```

---

## 🔄 トランザクション管理

### 信頼スコアの更新トランザクション

```sql
-- トランザクションの開始
BEGIN;

-- 活動スコアの再計算
SELECT
  ROUND(
    (COUNT(CASE WHEN a.type = 'content_view' THEN 1 END) / 30.0 * 100) +
    (COUNT(CASE WHEN a.type = 'session_attended' THEN 1 END) / 3.0 * 100) +
    (COUNT(CASE WHEN a.type = 'feature_used' THEN 1 END) / 20.0 * 100)
  ) / 3
FROM activities a
WHERE a.user_id = $1
AND a.timestamp >= CURRENT_DATE - INTERVAL '30 days'
INTO @activity_score;

-- 関係スコアの再計算
SELECT
  ROUND(
    (COUNT(CASE WHEN b.type = 'email_sent' THEN 1 END) / 30.0 * 100) +
    (COUNT(CASE WHEN b.type = 'report_submitted' THEN 1 END) / 4.0 * 100) +
    (COUNT(CASE WHEN b.type = 'feedback_provided' THEN 1 END) / 5.0 * 100)
  ) / 3
FROM feedbacks b
WHERE b.user_id = $1
AND b.timestamp >= CURRENT_DATE - INTERVAL '30 days'
INTO @relationship_score;

-- 品質スコアの再計算
SELECT
  ROUND(
    (AVG(CASE WHEN c.type = 'satisfaction' THEN c.score END) / 5.0 * 100) +
    ((AVG(CASE WHEN c.type = 'nps' THEN c.score END) + 100) / 2.0 * 100) +
    (AVG(CASE WHEN c.type = 'open_rate' THEN c.rate END) / 80.0 * 100)
  ) / 3
FROM feedbacks c
LEFT JOIN (
  SELECT user_id, AVG(rate) AS rate
  FROM feedbacks
  WHERE type = 'open_rate'
  AND timestamp >= CURRENT_DATE - INTERVAL '30 days'
  GROUP BY user_id
) o ON c.user_id = o.user_id
WHERE c.user_id = $1
AND c.timestamp >= CURRENT_DATE - INTERVAL '30 days'
INTO @quality_score;

-- 収益スコアの再計算
SELECT
  ROUND(
    (SUM(amount) / 500000.0 * 100) +
    (SUM(EXTRACT(EPOCH FROM (end_date - start_date)) / 86400) / 12.0 * 100)
  ) / 2
FROM contracts
WHERE user_id = $1
AND end_date IS NULL
INTO @revenue_score;

-- 紹介スコアの再計算
SELECT
  ROUND(
    (COUNT(*) / 3.0 * 100) +
    (AVG(quality_score) * 1.0) +
    (CASE WHEN COUNT(CASE WHEN business_owner_type = 'business_owner' THEN 1 END) > 0 THEN 100 ELSE 50 END * 1.0)
  ) / 3
FROM referrals
WHERE referrer_id = $1
INTO @referral_score;

-- 全体の信頼スコアの計算
SELECT
  ROUND(
    (@activity_score * 0.3) +
    (@relationship_score * 0.3) +
    (@quality_score * 0.2) +
    (@revenue_score * 0.1) +
    (@referral_score * 0.1)
  )
INTO @total_trust_score;

-- 信頼レベルの判定
SELECT
  CASE
    WHEN @total_trust_score >= 80 THEN 5
    WHEN @total_trust_score >= 60 THEN 4
    WHEN @total_trust_score >= 40 THEN 3
    WHEN @total_trust_score >= 20 THEN 2
    ELSE 1
  END
INTO @trust_level;

-- 信頼スコア履歴への追加
INSERT INTO trust_score_history (
  user_id,
  activity_score,
  relationship_score,
  quality_score,
  revenue_score,
  referral_score,
  total_trust_score,
  trust_level,
  recorded_at
)
VALUES (
  $1,
  @activity_score,
  @relationship_score,
  @quality_score,
  @revenue_score,
  @referral_score,
  @total_trust_score,
  @trust_level,
  CURRENT_TIMESTAMP
);

-- トランザクションのコミット
COMMIT;
```

---

## 📊 データベースのバックアップと復旧

### バックアップスクリプト

```bash
# 全テーブルのバックアップ
pg_dump -U postgres -d portfolio > backup_$(date +%Y%m%d_%H%M%S).sql

# 特定テーブルのバックアップ
pg_dump -U postgres -d portfolio -t users > backup_users_$(date +%Y%m%d_%H%M%S).sql
pg_dump -U postgres -d portfolio -t trust_score_history > backup_trust_score_history_$(date +%Y%m%d_%H%M%S).sql

# スキーマのみのバックアップ
pg_dump -U postgres -d portfolio --schema-only > backup_schema_$(date +%Y%m%d_%H%M%S).sql
```

### 復旧スクリプト

```bash
# バックアップからの復旧
psql -U postgres -d portfolio < backup_20260123_120000.sql

# スキーマのみの復旧
psql -U postgres -d portfolio < backup_schema_20260123_120000.sql
```

---

## 🚀 次のステップ

1. ✅ データベース詳細設計の完了（本ファイル）
2. 🔄 Prismaスキーマの更新
3. 🔄 マイグレーションスクリプトの作成
4. 🔄 信頼スコア計算ストアドプロシージャの実装
5. 🔄 APIルートのテスト

---

**更新日**: 2026-01-23
**次回更新**: Prismaスキーマの更新時
