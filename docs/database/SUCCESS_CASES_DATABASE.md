# Issue #85: 成功事例のデータベース構築

**作成日**: 2026-01-23
**担当**: コンテンツエンジニア
**対象**: Issue #85 - AIを活用した最速収益化ロードマップの作成

---

## 📋 概要

自身の成功体験（初月10万JPY）に基づく、再現可能な成功事例のデータベースを構築します。

---

## 🎯 データベースの設計

### テーブル構成

#### 1. SuccessCase テーブル（成功事例）

```sql
CREATE TABLE success_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  revenue_amount INTEGER NOT NULL,
  period TEXT NOT NULL CHECK (period IN ('first_month', 'second_month', 'third_month', 'annual')),
  niche TEXT NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_success_cases_revenue_amount ON success_cases(revenue_amount);
CREATE INDEX idx_success_cases_period ON success_cases(period);
CREATE INDEX idx_success_cases_niche ON success_cases(niche);
CREATE INDEX idx_success_cases_user_id ON success_cases(user_id);
CREATE INDEX idx_success_cases_is_public ON success_cases(is_public);
```

#### 2. SuccessCaseFactor テーブル（成功要因）

```sql
CREATE TABLE success_case_factors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  success_case_id UUID NOT NULL REFERENCES success_cases(id) ON DELETE CASCADE,
  factor_category TEXT NOT NULL CHECK (factor_category IN ('efficiency', 'creativity', 'quality', 'repeatability')),
  factor_name TEXT NOT NULL,
  factor_value NUMERIC NOT NULL CHECK (factor_value >= 0 AND factor_value <= 100),
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_success_case_factors_case_id ON success_case_factors(success_case_id);
CREATE INDEX idx_success_case_factors_category ON success_case_factors(factor_category);
```

#### 3. SuccessCaseStep テーブル（成功ステップ）

```sql
CREATE TABLE success_case_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  success_case_id UUID NOT NULL REFERENCES success_cases(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  step_title TEXT NOT NULL,
  step_description TEXT,
  duration_in_hours NUMERIC NOT NULL CHECK (duration_in_hours >= 0),
  ai_tool_used TEXT,
  human_involvement BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_success_case_steps_case_id ON success_case_steps(success_case_id);
CREATE INDEX idx_success_case_steps_step_number ON success_case_steps(step_number);
```

#### 4. SuccessCaseMetric テーブル（成功指標）

```sql
CREATE TABLE success_case_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  success_case_id UUID NOT NULL REFERENCES success_cases(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  metric_unit TEXT,
  recorded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_success_case_metrics_case_id ON success_case_metrics(success_case_id);
CREATE INDEX idx_success_case_metrics_metric_name ON success_case_metrics(metric_name);
```

---

## 📊 初期データの挿入

### 成功事例の初期データ

#### 初月（初月10万JPY）

```sql
INSERT INTO success_cases (id, title, description, revenue_amount, period, niche, user_id, is_public, created_at, updated_at) VALUES
(
  gen_random_uuid(),
  '初月: AI活用による効率化で副業月10万を達成',
  'AI（ChatGPT, Midjourney）を活用してコンテンツ制作を効率化し、デジタル商品（E-book, コース）とコンサルティングで月10万を達成した。',
  100000,
  'first_month',
  'AI活用 / 副業',
  gen_random_uuid(),
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
```

#### 第2月（第2月12万JPY）

```sql
INSERT INTO success_cases (id, title, description, revenue_amount, period, niche, user_id, is_public, created_at, updated_at) VALUES
(
  gen_random_uuid(),
  '第2月: AI活用によるコンテンツ制作のスケールアップ',
  'AI活用による効率化をさらに向上させ、コンテンツ制作のスケールアップを行い、デジタル商品とコンサルティングの収益を12万に増加させた。',
  120000,
  'second_month',
  'AI活用 / 副業',
  gen_random_uuid(),
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
```

#### 第3月（第3月15万JPY）

```sql
INSERT INTO success_cases (id, title, description, revenue_amount, period, niche, user_id, is_public, created_at, updated_at) VALUES
(
  gen_random_uuid(),
  '第3月: AI活用によるコンテンツ制作の自動化と販売チャネルの拡大',
  'AI活用によるコンテンツ制作を自動化し、販売チャネル（ブログ、SNS、メールマガジン）を拡大した。デジタル商品とコンサルティングの収益を15万に増加させた。',
  150000,
  'third_month',
  'AI活用 / 副業',
  gen_random_uuid(),
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
```

### 成功要因の初期データ

#### 効率化（Efficiency）

```sql
-- 初月の効率化要因
INSERT INTO success_case_factors (success_case_id, factor_category, factor_name, factor_value, description) VALUES
(
  (SELECT id FROM success_cases WHERE period = 'first_month'),
  'efficiency',
  'コンテンツ制作時間の短縮',
  60,
  'AI活用により、コンテンツ制作の時間が60%短縮された（4時間 → 1.5時間）。'
);

INSERT INTO success_case_factors (success_case_id, factor_category, factor_name, factor_value, description) VALUES
(
  (SELECT id FROM success_cases WHERE period = 'first_month'),
  'efficiency',
  'リサーチ時間の短縮',
  70,
  'AI活用により、リサーチの時間が70%短縮された（2時間 → 30分）。'
);

INSERT INTO success_case_factors (success_case_id, factor_category, factor_name, factor_value, description) VALUES
(
  (SELECT id FROM success_cases WHERE period = 'first_month'),
  'efficiency',
  '画像生成時間の短縮',
  80,
  'AI活用により、画像生成の時間が80%短縮された（30分 → 5分）。'
);
```

#### 創造性（Creativity）

```sql
-- 初月の創造性要因
INSERT INTO success_case_factors (success_case_id, factor_category, factor_name, factor_value, description) VALUES
(
  (SELECT id FROM success_cases WHERE period = 'first_month'),
  'creativity',
  '多角的な視点の提供',
  90,
  'AIが多角的な視点を提供することで、創造的なアイデア出しが可能になった。'
);

INSERT INTO success_case_factors (success_case_id, factor_category, factor_name, factor_value, description) VALUES
(
  (SELECT id FROM success_cases WHERE period = 'first_month'),
  'creativity',
  'ストーリーテリングの向上',
  85,
  'AIの提案を元に、より魅力的なストーリーテリングが可能になった。'
);
```

#### 品質（Quality）

```sql
-- 初月の品質要因
INSERT INTO success_case_factors (success_case_id, factor_category, factor_name, factor_value, description) VALUES
(
  (SELECT id FROM success_cases WHERE period = 'first_month'),
  'quality',
  '専門用語の調整',
  90,
  'AIの提案を人間が調整し、専門用語を分かりやすく説明した。'
);

INSERT INTO success_case_factors (success_case_id, factor_category, factor_name, factor_value, description) VALUES
(
  (SELECT id FROM success_cases WHERE period = 'first_month'),
  'quality',
  '最新情報の活用',
  85,
  'AIを活用して、常に最新情報を収集・反映した。'
);
```

#### リピート性（Repeatability）

```sql
-- 初月のリピート性要因
INSERT INTO success_case_factors (success_case_id, factor_category, factor_name, factor_value, description) VALUES
(
  (SELECT id FROM success_cases WHERE period = 'first_month'),
  'repeatability',
  'プロンプトの標準化',
  80,
  'プロンプトを標準化することで、同じ品質のコンテンツを安定的に生成できるようになった。'
);

INSERT INTO success_case_factors (success_case_id, factor_category, factor_name, factor_value, description) VALUES
(
  (SELECT id FROM success_cases WHERE period = 'first_month'),
  'repeatability',
  'ワークフローの標準化',
  90,
  'ワークフローを標準化することで、プロセス全体を再現可能にした。'
);
```

### 成功ステップの初期データ

#### 初月の成功ステップ

```sql
INSERT INTO success_case_steps (success_case_id, step_number, step_title, step_description, duration_in_hours, ai_tool_used, human_involvement) VALUES
(
  (SELECT id FROM success_cases WHERE period = 'first_month'),
  1,
  'ニッチの選定',
  'エンジニア向けの技術ブログのニッチを特定した。',
  1,
  'ChatGPT',
  true
);

INSERT INTO success_case_steps (success_case_id, step_number, step_title, step_description, duration_in_hours, ai_tool_used, human_involvement) VALUES
(
  (SELECT id FROM success_cases WHERE period = 'first_month'),
  2,
  'コンテンツカレンダーの作成',
  '4週間のブログ、メール、SNS投稿スケジュールを作成した。',
  2,
  'ChatGPT',
  true
);

INSERT INTO success_case_steps (success_case_id, step_number, step_title, step_description, duration_in_hours, ai_tool_used, human_involvement) VALUES
(
  (SELECT id FROM success_cases WHERE period = 'first_month'),
  3,
  'コンテンツの制作（ブログ記事）',
  'AI活用により、1週間で3本のブログ記事を制作した。',
  10,
  'ChatGPT, Midjourney',
  true
);

INSERT INTO success_case_steps (success_case_id, step_number, step_title, step_description, duration_in_hours, ai_tool_used, human_involvement) VALUES
(
  (SELECT id FROM success_cases WHERE period = 'first_month'),
  4,
  'コンテンツの制作（メールマガジン）',
  'AI活用により、1週間で1通のメールマガジンを制作した。',
  5,
  'ChatGPT',
  true
);

INSERT INTO success_case_steps (success_case_id, step_number, step_title, step_description, duration_in_hours, ai_tool_used, human_involvement) VALUES
(
  (SELECT id FROM success_cases WHERE period = 'first_month'),
  5,
  '販売チャネルの最適化',
  '有料広告（Google Ads）をテスト開始し、CTRとCVを測定した。',
  2,
  'Google Ads',
  true
);

INSERT INTO success_case_steps (success_case_id, step_number, step_title, step_description, duration_in_hours, ai_tool_used, human_involvement) VALUES
(
  (SELECT id FROM success_cases WHERE period = 'first_month'),
  6,
  '収益化の開始',
  - デジタル商品（E-book）の販売を開始した。
  - コンサルティングの提供を開始した。',
  2,
  'Stripe, Calendly',
  true
);
```

### 成功指標（Metrics）の初期データ

#### 初月の成功指標

```sql
INSERT INTO success_case_metrics (success_case_id, metric_name, metric_value, metric_unit, recorded_at) VALUES
(
  (SELECT id FROM success_cases WHERE period = 'first_month'),
  '月間収益',
  100000,
  'JPY',
  CURRENT_TIMESTAMP
);

INSERT INTO success_case_metrics (success_case_id, metric_name, metric_value, metric_unit, recorded_at) VALUES
(
  (SELECT id FROM success_cases WHERE period = 'first_month'),
  'コンテンツ制作時間',
  60,
  'percent',
  CURRENT_TIMESTAMP
);

INSERT INTO success_case_metrics (success_case_id, metric_name, metric_value, metric_unit, recorded_at) VALUES
(
  (SELECT id FROM success_cases WHERE period = 'first_month'),
  'コスト',
  10000,
  'JPY',
  CURRENT_TIMESTAMP
);

INSERT INTO success_case_metrics (success_case_id, metric_name, metric_value, metric_unit, recorded_at) VALUES
(
  (SELECT id FROM success_cases WHERE period = 'first_month'),
  '利益率',
  90,
  'percent',
  CURRENT_TIMESTAMP
);
```

---

## 🔄 APIエンドポイントの設計

### 成功事例の取得（GET /api/success-cases）

#### エンドポイント
```
GET /api/success-cases
GET /api/success-cases/:id
GET /api/success-cases/public
```

#### リクエストパラメータ
- `period`: フィルタリング（`first_month`, `second_month`, `third_month`, `annual`）
- `niche`: フィルタリング（`AI活用`, `副業`, `スキルアップ`）
- `is_public`: パブリックのみを返すかどうか

#### レスポンス形式
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "初月: AI活用による効率化で副業月10万を達成",
      "description": "AI（ChatGPT, Midjourney）を活用してコンテンツ制作を効率化し...",
      "revenue_amount": 100000,
      "period": "first_month",
      "niche": "AI活用 / 副業",
      "factors": [
        {
          "category": "efficiency",
          "name": "コンテンツ制作時間の短縮",
          "value": 60
        }
      ],
      "steps": [
        {
          "step_number": 1,
          "step_title": "ニッチの選定",
          "duration_in_hours": 1,
          "ai_tool_used": "ChatGPT",
          "human_involvement": true
        }
      ],
      "metrics": {
        "monthly_revenue": 100000,
        "content_creation_time_reduction": 60
      }
    }
  ]
}
```

---

## 📊 成功指標（KPIs）

### 成功事例の登録数

| 指標 | 目標 | 測定方法 | 期限 |
|------|------|----------|------|
| パブリック成功事例の登録数 | 10件以上 | データベースのレコード数 | 継続 |

### 成功要因の登録数

| 指標 | 目標 | 測定方法 | 期限 |
|------|------|----------|------|
| 要因カテゴリーの登録数 | 4つ以上 | 成功要因のカテゴリー数 | 継続 |

### 成功ステップの登録数

| 指標 | 目標 | 測定方法 | 期限 |
|------|------|----------|------|
| 成功ステップの登録数 | 6つ以上 | 成功ステップの数 | 継続 |

---

## 🎯 次のステップ

1. ✅ 成功事例のデータベース構築（本ファイル）
2. 🔄 成功事例の登録管理機能の実装
3. 🔄 成功要因の詳細なドキュメント化
4. 🔄 成功事例の公開・非公開の切り替え機能の実装

---

**更新日**: 2026-01-23
**次の更新**: 成功事例の登録管理機能の実装時
