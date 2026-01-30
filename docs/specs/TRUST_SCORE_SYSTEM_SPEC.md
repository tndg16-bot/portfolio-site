# 信頼スコアリングシステムの仕様書

**作成日**: 2026-01-23
**担当**: 開発チーム
**対象**: Issue #84 - 信頼獲得型の案件獲得戦略

---

## 📋 概要

顧客との長期的な信頼関係を数値化し、可視化するシステムの仕様を定義します。

---

## 🎯 信頼スコアの構成要素

### 1. 活動スコア（Activity Score） - 30%

#### 定義
顧客が製品・サービスをどのように活用しているかを測るスコア。

#### 評細な指標
| 指標 | 評細 | 計算方法 | 最大値 |
|------|--------|----------|--------|
| コンテンツ閲覧 | ブログ記事の閲覧数 / 閲覧日数 | min(閲覧数 / 30, 1) × 100 | 100 |
| セッション参加 | ワークショップへの参加回数 | min(参加回数 / 3, 1) × 100 | 100 |
| 機能利用 | 主な機能（ダッシュボード、目標設定など）の利用回数 | min(利用回数 / 20, 1) × 100 | 100 |

#### 計算式
```
活動スコア = (コンテンツ閲覧スコア + セッション参加スコア + 機能利用スコア) / 3
```

### 2. 関係スコア（Relationship Score） - 30%

#### 定義
顧客との関係の深さやコミュニケーションの頻度を測るスコア。

#### 詳細な指標
| 指標 | 詳細 | 計算方法 | 最大値 |
|------|--------|----------|--------|
| コミュニケーションの頻度 | メールの送受回数、メッセージ数 | min(コミュニケーション回数 / 30, 1) × 100 | 100 |
| 報告の提出 | 定期的な進捗報告の提出回数 | min(報告数 / 4, 1) × 100 | 100 |
| フィードバックの提供 | アンケートやレビューへの回答数 | min(フィードバック数 / 5, 1) × 100 | 100 |

#### 計算式
```
関係スコア = (コミュニケーション頻度スコア + 報告提出スコア + フィードバック提供スコア) / 3
```

### 3. 品質スコア（Quality Score） - 20%

#### 定義
顧客からのフィードバックや満足度を測るスコア。

#### 詳細な指標
| 指標 | 詳細 | 計算方法 | 最大値 |
|------|--------|----------|--------|
| 満足度 | ユーザーアンケート（5段階評価） | 満足度 / 5 × 100 | 100 |
| NPSスコア | ネットプロモータースコア（-100〜100） | (NPS + 100) / 2 | 100 |
| 返信率 | メールの開封率やクリック率 | min(開封率 / 80%, 1) × 100 | 100 |

#### 計算式
```
品質スコア = (満足度 + NPSスコア + 返信率) / 3
```

### 4. 収益スコア（Revenue Score） - 10%

#### 定義
顧客が生み出した収益（LTVへの貢献）を測るスコア。

#### 詳細な指標
| 指標 | 詳細 | 計算方法 | 最大値 |
|------|--------|----------|--------|
| 契約金額 | 月額または総契約金額 | min(契約金額 / 500,000, 1) × 100 | 100 |
| 契約期間 | 契約期間（月数） | min(契約期間 / 12, 1) × 100 | 100 |
| 追加購入 | 追加サービスやアップセルの金額 | min(追加購入額 / 200,000, 1) × 100 | 100 |

#### 計算式
```
収益スコア = (契約金額スコア + 契約期間スコア + 追加購入スコア) / 3
```

### 5. 推奨スコア（Referral Score） - 10%

#### 定義
顧客が紹介してくれた他の顧客の品質や数量を測るスコア。

#### 詳細な指標
| 指標 | 詳細 | 計算方法 | 最大値 |
|------|--------|----------|--------|
| 紹介数 | 紹介した顧客の数 | min(紹介数 / 3, 1) × 100 | 100 |
| 紹介品質 | 紹介された顧客の満足度 | 平均紹介品質スコア | 100 |
| 紹介元の種類 | 紹介元がビジネスオーナーか、個人か | ビジネスオーナー: 100, 個人: 50 | 100 |

#### 計算式
```
推奨スコア = (紹介数スコア + 紹介品質スコア + 紹介元の種類スコア) / 3
```

---

## 🔄 信頼スコアの計算

### 全体の計算式

```
信頼スコア = (活動スコア × 0.3) + (関係スコア × 0.3) + (品質スコア × 0.2) + (収益スコア × 0.1) + (推奨スコア × 0.1)
```

最大スコア: 100

### レベル判定

| レベル | スコア範囲 | 説明 | 対応するアクション |
|--------|-----------|------|----------------|
| レベル5 (最高) | 80-100 | 信頼関係が非常に強固。紹介・リピートの獲得が容易。 | 特典プランの提供、リファラルプログラムへの招待 |
| レベル4 (高い) | 60-79 | 信頼関係が強固。紹介・リピートの獲得が可能。 | プロモーション、リファラルインセンティブの提供 |
| レベル3 (標準) | 40-59 | 信頼関係が良好。紹介・リピートの獲得にチャンスあり。 | 定期的なフォローアップ、新規機能の先行提供 |
| レベル2 (低い) | 20-39 | 信頼関係が構築中。紹介・リピートの獲得に時間が必要。 | オンボーディングの強化、コンテンツの提供 |
| レベル1 (最低) | 0-19 | 信頼関係が構築できていない。紹介・リピートの獲得が困難。 | 関係構築の強化、顧客体験の改善 |

---

## 📊 データ構造

### Customer エンティティ

```typescript
interface Customer {
  id: string;
  name: string;
  email: string;
  company?: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'churned';
  trustScore: number;
  trustLevel: number;
  activityScore: number;
  relationshipScore: number;
  qualityScore: number;
  revenueScore: number;
  referralScore: number;
  contracts: Contract[];
  activities: Activity[];
  feedbacks: Feedback[];
  referrals: Referral[];
}

interface Contract {
  id: string;
  customerId: string;
  startDate: string;
  endDate?: string;
  amount: number;
  status: 'active' | 'completed' | 'cancelled';
}

interface Activity {
  id: string;
  customerId: string;
  type: 'content_view' | 'session_attended' | 'feature_used';
  timestamp: string;
  details?: Record<string, any>;
}

interface Feedback {
  id: string;
  customerId: string;
  type: 'satisfaction' | 'nps' | 'open_rate';
  score: number;
  timestamp: string;
}

interface Referral {
  id: string;
  referrerId: string;
  refereeId: string;
  qualityScore: number;
  timestamp: string;
}
```

---

## 🔄 信頼スコアの更新ロジック

### 更新のタイミング

| イベント | 更新頻度 | 更新内容 |
|--------|----------|----------|
| コンテンツ閲覧 | 毎日 | 活動スコアの更新 |
| セッション参加 | 即時 | 活動スコアの更新 |
| メールの送受 | 毎日 | 関係スコアの更新 |
| フィードバックの提供 | 即時 | 品質スコアの更新 |
| 契約の開始・終了 | 即時 | 収益スコアの更新 |
| 紹介の獲得 | 即時 | 推奨スコアの更新 |

### 更新のプロセス

1. **イベントのトリガー**
   - ユーザーがアクションを起こす（コンテンツ閲覧、セッション参加など）

2. **スコアの再計算**
   - トリガーされたイベントに関連するスコアの要素を再計算
   - 例: コンテンツ閲覧数が増えた場合、活動スコアを再計算

3. **全体的な信頼スコアの計算**
   - 各サブスコア（活動、関係、品質、収益、推奨）を最新の値に更新
   - 全体の信頼スコアを計算

4. **レベルの再判定**
   - 新しい信頼スコアに基づいて、レベルを再判定

5. **データの保存**
   - 最新のスコアとレベルをデータベースに保存

6. **通知の送信**
   - スコアが上がった場合、ユーザーに通知を送信
   - レベルが上がった場合、特典を提供

---

## 📝 データ収集方法

### 活動スコアのデータ収集

| データ収集方法 | 詳細 | 実装方法 |
|----------------|--------|----------|
| コンテンツ閲覧数 | Google Analyticsのページビュー数 | Analytics APIの統合 |
| セッション参加回数 | ワークショップの参加者数 | Zoom APIまたはSlack APIの統合 |
| 機能利用回数 | ダッシュボードや目標設定機能の利用回数 | アプリ内のイベントトラッキング |

### 関係スコアのデータ収集

| データ収集方法 | 詳細 | 実装方法 |
|----------------|--------|----------|
| メールの送受回数 | メール配信ツール（Resend）の統計 | Resend APIの統合 |
| 報告の提出回数 | 報告書の提出回数 | アプリ内の提出回数トラッキング |
| フィードバックの提供数 | アンケートやレビューへの回答数 | Typeformまたはアプリ内アンケートの統合 |

### 品質スコアのデータ収集

| データ収集方法 | 詳細 | 実装方法 |
|----------------|--------|----------|
| 満足度 | ユーザーアンケート（5段階評価） | Typeformまたはアプリ内アンケートの統合 |
| NPSスコア | NPSアンケート（-100〜100） | Typeformまたはアプリ内アンケートの統合 |
| 返信率 | メールの開封率やクリック率 | Resend APIの統計 |

### 収益スコアのデータ収集

| データ収集方法 | 詳細 | 実装方法 |
|----------------|--------|----------|
| 契約金額 | 契約金額の記録 | Stripe APIの統計 |
| 契約期間 | 契約期間（月数）の記録 | データベース内の契約期間 |
| 追加購入 | 追加サービスやアップセルの金額の記録 | Stripe APIの統計 |

### 推奨スコアのデータ収集

| データ収集方法 | 詳細 | 実装方法 |
|----------------|--------|----------|
| 紹介数 | 紹介した顧客の数 | データベース内の紹介数 |
| 紹介品質 | 紹介された顧客の満足度 | 紹介された顧客の品質スコアの平均 |
| 紹介元の種類 | 紹介元がビジネスオーナーか、個人か | データベース内の紹介元情報 |

---

## 🎨 信頼スコアの表示

### ダッシュボードでの表示

| 要素 | 詳細 | 設計 |
|------|--------|------|
| 全体の信頼スコア | 0-100の数字で表示 | 大きなフォント、太字 |
| 信頼レベル | レベル1〜5で表示 | バッジまたはプログレスバーで表示 |
| 各サブスコア | 活動、関係、品質、収益、推奨 | 小さな数字で表示 |
| レベルの進捗 | 前回からの変化を表示 | アップまたはダウンアローのアイコン |

### プロフィールページでの表示

| 要素 | 詳細 | 設計 |
|------|--------|------|
| 信頼スコアの履歴 | タイムライン形式で表示 | 過去6ヶ月のスコア推移を表示 |
| レベルの変更履歴 | レベルが変わった日時を表示 | 過去6ヶ月のレベル履歴を表示 |
| 成功事例とのリンク | スコアが上がった要因を表示 | 関連する成功事例や活動へのリンク |

---

## 🔧 実装方法

### データベースの設計

#### Customer テーブル

```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  company TEXT,
  join_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status TEXT NOT NULL DEFAULT 'active',
  trust_score INTEGER NOT NULL DEFAULT 0,
  trust_level INTEGER NOT NULL DEFAULT 1,
  activity_score INTEGER NOT NULL DEFAULT 0,
  relationship_score INTEGER NOT NULL DEFAULT 0,
  quality_score INTEGER NOT NULL DEFAULT 0,
  revenue_score INTEGER NOT NULL DEFAULT 0,
  referral_score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_status ON customers(status);
CREATE INDEX idx_customers_trust_score ON customers(trust_score);
```

#### Contracts テーブル

```sql
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contracts_customer_id ON contracts(customer_id);
CREATE INDEX idx_contracts_status ON contracts(status);
CREATE INDEX idx_contracts_start_date ON contracts(start_date);
```

#### Activities テーブル

```sql
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  details JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activities_customer_id ON activities(customer_id);
CREATE INDEX idx_activities_type ON activities(type);
CREATE INDEX idx_activities_timestamp ON activities(timestamp);
```

#### Feedbacks テーブル

```sql
CREATE TABLE feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  score INTEGER NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_feedbacks_customer_id ON feedbacks(customer_id);
CREATE INDEX idx_feedbacks_type ON feedbacks(type);
CREATE INDEX idx_feedbacks_timestamp ON feedbacks(timestamp);
```

#### Referrals テーブル

```sql
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  referee_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  quality_score INTEGER NOT NULL DEFAULT 0,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX idx_referrals_referee_id ON referrals(referee_id);
CREATE INDEX idx_referrals_timestamp ON referrals(timestamp);
```

### API エンドポイント

#### 信頼スコアの取得

```
GET /api/trust-score/:customerId
```

```typescript
// レスポンス
{
  customerId: "uuid",
  trustScore: 85,
  trustLevel: 4,
  scores: {
    activity: 90,
    relationship: 80,
    quality: 75,
    revenue: 100,
    referral: 100
  },
  history: [
    { date: "2026-01-23", score: 75, level: 3 },
    { date: "2026-01-30", score: 80, level: 3 },
    { date: "2026-02-06", score: 85, level: 4 }
  ]
}
```

#### 信頼スコアの計算トリガー

```
POST /api/trust-score/recalculate/:customerId
```

```typescript
// リクエストボディ
{
  triggerEvent: 'content_view' | 'session_attended' | 'feedback_provided' | 'contract_created' | 'referral_created',
  details: Record<string, any>
}
```

---

## 📊 信頼スコアの統計と分析

### 全体統計

| 指標 | 現在値 | 目標値 | 期限 |
|------|--------|--------|------|
| 平均信頼スコア | 45 | 60以上 | 3ヶ月 |
| レベル4以上の顧客数 | 5人 | 20人以上 | 3ヶ月 |
| レベル5の顧客数 | 1人 | 5人以上 | 6ヶ月 |
| 信頼スコアの推移（平均上昇率） | +5/月 | +10/月 | 3ヶ月 |

### レベル別統計

| レベル | 顧客数 | 割合 | 平均LTV | 平均チャーン期間 |
|--------|--------|------|-------------|----------------|
| レベル5 (80-100) | 1人 | 2% | ¥500,000以上 | 24ヶ月以上 |
| レベル4 (60-79) | 4人 | 10% | ¥300,000以上 | 12ヶ月以上 |
| レベル3 (40-59) | 15人 | 35% | ¥150,000以上 | 6ヶ月以上 |
| レベル2 (20-39) | 12人 | 28% | ¥50,000以上 | 3ヶ月以上 |
| レベル1 (0-19) | 10人 | 25% | ¥10,000以上 | 1ヶ月未満 |

---

## 🎯 信頼スコアの活用

### 顧客セグメンテーション

| セグメント | 信頼スコア範囲 | アクション |
|----------|---------------|--------|
| VIP | 80-100 | プレミア機能の提供、優先サポート、リファラルインセンティブ |
| 重要 | 60-79 | 新規機能の先行提供、定期的なフォローアップ |
| 通常 | 40-59 | 標準的なサポート、定期的なニュースレター |
| 見込み | 20-39 | オンボーディングの強化、コンテンツの提供 |
| 新規 | 0-19 | ウェルカムの提供、関係構築の開始 |

### マーケティング活用

| 信頼スコア | ターゲティング | コンテンツ | チャネル |
|-----------|------------|--------|--------|
| 80-100 | 高度な信頼 | 成功事例の共有、紹介インセンティブ | メール（個人） |
| 60-79 | 中度な信頼 | 成功事例の共有、新規機能の紹介 | メール（個人）+ LinkedIn |
| 40-59 | 初歩的な信頼 | 一般的なコンテンツ、製品の紹介 | メール（一斉） |
| 20-39 | 関係構築中 | 製品情報、ヒント | メール（一斉）+ SNS |
| 0-19 | 新規顧客 | ウェルカム情報、ヒント | メール（一斉）+ SNS |

---

## 📝 ドキュメントの更新

### 作成が必要なドキュメント

- [ ] 信頼スコアリングシステムの仕様書（本ファイル）
- [ ] 信頼スコア計算アルゴリズムの仕様書
- [ ] 信頼スコアの表示ガイドライン

### 更新が必要なドキュメント

- [ ] `docs/guides/TRUST_BUILDING_PROCESS.md` の更新（信頼スコアリングシステムの詳細を追加）
- [ ] `docs/plans/ISSUE_84_TRUST_ACQUISITION_IMPLEMENTATION.md` の更新（実装計画に反映）

---

## 🎯 次のステップ

1. ✅ 信頼スコアリングシステムの仕様書の作成（本ファイル）
2. 🔄 Issue #85: AI活用ロードマップの詳細実装計画の作成（並列開始）

---

**更新日**: 2026-01-23
**次の更新**: Issue #85の実装計画作成時
