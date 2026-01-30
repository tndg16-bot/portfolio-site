# APIエンドポイントの実装計画

**作成日**: 2026-01-23
**担当**: 開発チーム
**対象**: Issues #83, #84, #85（共通データベースAPI）

---

## 📋 概要

共通データベース（Prisma + PostgreSQL）を活用した、3つのBusiness Issuesに対応するAPIエンドポイントを設計・実装します。

---

## 🔄 APIエンドポイントの構成

### ベースURL
```
/api
```

### レスポンス形式

#### 成功レスポンス
```typescript
{
  success: true,
  data: any,
  message?: string,
  timestamp: string
}
```

#### エラーレスポンス
```typescript
{
  success: false,
  error: {
    code: string,
    message: string,
    details?: any
  },
  timestamp: string
}
```

---

## 📊 Issue #83: 自己決定プロセスの実装

### 1. 自己決定ダッシュボード

#### GET /api/self-determination/dashboard
- **説明**: ユーザーの自己決定プロセスのダッシュボードデータを取得
- **認証**: 必要（Bearer Token）
- **クエリパラメータ**: なし
- **リクエストボディ**: なし
- **レスポンス**:
  ```json
  {
    "success": true,
    "data": {
      "currentStep": 3,
      "totalSteps": 6,
      "progressPercentage": 50,
      "completedSteps": [
        {
          "stepNumber": 1,
          "stepTitle": "現状の明確化",
          "status": "completed",
          "completedAt": "2026-01-20T10:00:00Z"
        },
        {
          "stepNumber": 2,
          "stepTitle": "目標の設定",
          "status": "completed",
          "completedAt": "2026-01-21T14:00:00Z"
        }
      ]
    },
    "timestamp": "2026-01-23T12:00:00Z"
  }
  ```

#### POST /api/self-determination/steps/{stepNumber}/complete
- **説明**: 指定されたステップを完了とする
- **認証**: 必要（Bearer Token）
- **パスパラメータ**: `stepNumber` (1-6)
- **リクエストボディ**:
  ```json
  {
    "content": {
      "currentSituation": "現在の状況の詳細...",
      "goals": "達成したい目標...",
      "options": "検討した選択肢...",
      "values": "重視する価値観...",
      "intuition": "直感的な感覚...",
      "decision": "決定内容..."
    },
    "completedAt": "2026-01-23T14:00:00Z"
  }
  ```
- **レスポンス**:
  ```json
  {
    "success": true,
    "data": {
      "stepNumber": 3,
      "status": "completed",
      "completedAt": "2026-01-23T14:00:00Z"
    },
    "message": "ステップ3が完了しました"
  }
  ```

### 2. 問いかけスクリプト

#### GET /api/self-determination/scripts
- **説明**: 自己決定プロセスで使用する問いかけスクリプトの一覧を取得
- **認証**: 必要（Bearer Token）
- **クエリパラメータ**: `category` (オプション)
- **レスポンス**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "script-1",
        "category": "situation",
        "question": "現在の状況をどう理解していますか？",
        "followUpQuestions": [
          "何が起きているのか、客観的に言えますか？",
          "何を決定する必要がありますか？"
        ],
        "answerType": "text"
      }
    ]
  }
  ```

### 3. ジャーナル

#### GET /api/self-determination/journals
- **説明**: ユーザーのジャーナル一覧を取得
- **認証**: 必要（Bearer Token）
- **クエリパラメータ**: `page` (デフォルト: 1), `limit` (デフォルト: 10), `tags` (オプション)
- **レスポンス**:
  ```json
  {
    "success": true,
    "data": {
      "journals": [
        {
          "id": "journal-1",
          "title": "自己決定プロセスの振り返り",
          "content": {
            "stepNumber": 3,
            "reflection": "自分の価値観を確認できました"
          },
          "tags": ["#自己決定", "#価値観"],
          "createdAt": "2026-01-23T10:00:00Z"
        }
      ],
      "pagination": {
        "page": 1,
        "limit": 10,
        "total": 25
      }
    }
  }
  ```

#### POST /api/self-determination/journals
- **説明**: 新しいジャーナルを作成
- **認証**: 必要（Bearer Token）
- **リクエストボディ**:
  ```json
  {
    "title": "自己決定プロセスの振り返り",
    "content": {
      "stepNumber": 3,
      "reflection": "自分の価値観を確認できました"
    },
    "tags": ["#自己決定", "#価値観"]
  }
  ```
- **レスポンス**:
  ```json
  {
    "success": true,
    "data": {
      "id": "journal-1",
      "title": "自己決定プロセスの振り返り",
      "content": {
        "stepNumber": 3,
        "reflection": "自分の価値観を確認できました"
      },
      "tags": ["#自己決定", "#価値観"],
      "createdAt": "2026-01-23T14:00:00Z"
    },
    "message": "ジャーナルを作成しました"
  }
  ```

---

## 📊 Issue #84: 信頼スコアリングシステムの実装

### 1. 信頼スコアの取得

#### GET /api/trust-score/:userId
- **説明**: 指定されたユーザーの信頼スコアと履歴を取得
- **認証**: 必要（Bearer Token）
- **パスパラメータ**: `userId` (UUID)
- **レスポンス**:
  ```json
  {
    "success": true,
    "data": {
      "userId": "user-123",
      "trustScore": 85,
      "trustLevel": 4,
      "scores": {
        "activity": 90,
        "relationship": 80,
        "quality": 75,
        "revenue": 100,
        "referral": 100
      },
      "history": [
        {
          "date": "2026-01-23",
          "score": 75,
          "level": 3
        },
        {
          "date": "2026-01-30",
          "score": 80,
          "level": 3
        },
        {
          "date": "2026-02-06",
          "score": 85,
          "level": 4
        }
      ]
    },
    "timestamp": "2026-01-23T12:00:00Z"
  }
  ```

### 2. 信頼スコアの再計算トリガー

#### POST /api/trust-score/recalculate/:customerId
- **説明**: 信頼スコアを再計算するトリガーイベント
- **認証**: 必要（Bearer Token）
- **パスパラメータ**: `customerId` (UUID)
- **リクエストボディ**:
  ```json
  {
    "triggerEvent": "content_view",
    "details": {
      "contentId": "blog-1",
      "viewCount": 1
    }
  }
  ```
- **トリガーイベントの種類**:
  - `content_view`: コンテンツ閲覧
  - `session_attended`: セッション参加
  - `feedback_provided`: フィードバックの提供
  - `contract_created`: 契約の作成
  - `referral_created`: 紹介の獲得
- **レスポンス**:
  ```json
  {
    "success": true,
    "data": {
      "userId": "user-123",
      "trustScore": 85,
      "trustLevel": 4,
      "changed": true
    },
    "message": "信頼スコアが更新されました"
  }
  ```

---

## 📊 Issue #85: AI活用ワークフローの実装

### 1. AIプロンプトテンプレート

#### GET /api/ai-prompts/templates
- **説明**: AIプロンプトテンプレートの一覧を取得
- **認証**: 必要（Bearer Token）
- **クエリパラメータ**: `category` (オプション), `search` (オプション)
- **レスポンス**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "template-1",
        "category": "content_creation",
        "title": "ブログ記事のアイデア出し",
        "template": "ブログ記事のアイデアを10個出してください。...",
        "context": "エンジニア向けの技術ブログ",
        "temperature": 0.7,
        "createdAt": "2026-01-23T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 40
    }
  }
  ```

#### POST /api/ai-prompts/templates
- **説明**: 新しいAIプロンプトテンプレートを作成
- **認証**: 必要（Bearer Token）
- **リクエストボディ**:
  ```json
  {
    "category": "content_creation",
    "title": "ブログ記事のアイデア出し",
    "template": "ブログ記事のアイデアを10個出してください...",
    "context": "エンジニア向けの技術ブログ",
    "temperature": 0.7
  }
  ```
- **レスポンス**:
  ```json
  {
    "success": true,
    "data": {
      "id": "template-1",
      "category": "content_creation",
      "title": "ブログ記事のアイデア出し",
      "template": "ブログ記事のアイデアを10個出してください...",
      "context": "エンジニア向けの技術ブログ",
      "temperature": 0.7,
      "createdAt": "2026-01-23T14:00:00Z"
    },
    "message": "プロンプトテンプレートを作成しました"
  }
  ```

### 2. AI生成（ChatGPT / Claude APIのラッパー）

#### POST /api/ai/generate
- **説明**: AI（ChatGPT, Claude）を活用してコンテンツを生成
- **認証**: 必要（Bearer Token）
- **リクエストボディ**:
  ```json
  {
    "provider": "openai",
    "model": "gpt-4",
    "prompt": "ブログ記事のアイデアを10個出してください。ターゲットはエンジニア...",
    "temperature": 0.7,
    "maxTokens": 1000
  }
  ```
- **プロバイダーの種類**: `openai`, `anthropic`, `google`
- **レスポンス**:
  ```json
  {
    "success": true,
    "data": {
      "provider": "openai",
      "model": "gpt-4",
      "generatedContent": "ブログ記事のアイデア10個...\n1. ChatGPTでコードを書く10倍速くなる方法...\n2. AI活用で副業開始ガイド...\n...",
      "tokensUsed": 523,
      "cost": 0.01
    },
    "timestamp": "2026-01-23T12:00:00Z"
  }
  ```

---

## 📊 共通の認証エンドポイント

### POST /api/auth/register
- **説明**: 新規ユーザー登録
- **リクエストボディ**:
  ```json
  {
    "email": "user@example.com",
    "name": "User Name",
    "password": "password123",
    "company": "Company Name"
  }
  ```
- **レスポンス**:
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": "user-123",
        "email": "user@example.com",
        "name": "User Name",
        "createdAt": "2026-01-23T12:00:00Z"
      },
      "token": "jwt_token_here"
    },
    "message": "登録が完了しました"
  }
  ```

### POST /api/auth/login
- **説明**: ログイン
- **リクエストボディ**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **レスポンス**:
  ```json
  {
    "success": true,
    "data": {
      "token": "jwt_token_here",
      "user": {
        "id": "user-123",
        "email": "user@example.com",
        "name": "User Name"
      }
    },
    "message": "ログインに成功しました"
  }
  ```

---

## 🔒 認証と認可（Authentication & Authorization）

### JWT認証

1. **トークンの生成**:
   - ログイン時にJWT（JSON Web Token）を生成
   - 有効期限: 7日
   - シークレットキー: 環境変数 `JWT_SECRET`

2. **トークンの検証**:
   - 各APIエンドポイントで `Authorization: Bearer <token>` ヘッダーを検証
   - トークンの有効期限と署名を確認

3. **権限の確認**:
   - 管理者エンドポイント: `ADMIN` ロールが必要
   - ユーザーエンドポイント: 自分のデータへのアクセス権限

### ミドルウェア（Middleware）

```typescript
// middleware/auth.ts
import { NextResponse } from 'next/server';
import { verifyToken } from './auth-utils';

export async function authMiddleware(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: 'トークンがありません' } },
      { status: 401 }
    );
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json(
      { success: false, error: { code: 'INVALID_TOKEN', message: '無効なトークンです' } },
      { status: 401 }
    );
  }

  // ユーザー情報をリクエストに追加
  (request as any).user = decoded;

  return NextResponse.next();
}
```

---

## 📝 エラーハンドリング

### 標準的なHTTPステータスコード

| ステータスコード | 説明 | 使用例 |
|----------|------|----------|
| 200 OK | 成功 | GETリクエストの成功、POSTリクエストの成功 |
| 201 Created | リソース作成成功 | POSTリクエストで新しいリソース作成 |
| 400 Bad Request | リクエストが不正 | バリデーションエラー、必須フィールドの欠落 |
| 401 Unauthorized | 認証エラー | 無効なトークン、パスワードが間違っている |
| 403 Forbidden | アクセス権限 | リソースへのアクセス権限、管理権限が必要 |
| 404 Not Found | リソースが見つからない | 存在しないID、存在しないエンドポイント |
| 500 Internal Server Error | サーバーエラー | 予期せぬエラー、データベース接続エラー |

### カスタムエラーコード

| エラーコード | 説明 |
|----------|------|
| `SELF_DETERMINATION_STEP_NOT_FOUND` | 指定されたステップが見つからない |
| `SELF_DETERMINATION_INVALID_STATUS` | 無効なステータスが指定された |
| `TRUST_SCORE_USER_NOT_FOUND` | 指定されたユーザーが見つからない |
| `AI_PROMPT_TEMPLATE_DUPLICATE` | 同じカテゴリとタイトルのテンプレートが既に存在 |
| `AI_GENERATION_FAILED` | AI生成に失敗した（APIエラーなど） |
| `AUTHENTICATION_FAILED` | 認証に失敗した（メールまたはパスワードが間違っている） |
| `DUPLICATE_EMAIL` | 既に登録されているメールアドレス |

---

## 📊 APIの実装スケジュール

### 第1週：ベーシックAPIの実装
| 日付 | タスク | 期限 |
|------|------|------|
| 1/23 (木) | ミドルウェアの実装 | 1/24 (金) |
| 1/24 (金) | 認証エンドポイントの実装 | 1/25 (土) |
| 1/25 (土) | Issue #83のAPIエンドポイントの実装 | 1/27 (月) |
| 1/26 (日) | Issue #84のAPIエンドポイントの実装 | 1/28 (火) |

### 第2週：Business IssuesのAPIエンドポイントの実装
| 日付 | タスク | 期限 |
|------|------|------|
| 1/27 (月) | Issue #85のAPIエンドポイントの実装 | 1/28 (火) |
| 1/28 (火) | AIラッパーの実装（ChatGPT, Claude） | 1/29 (水) |
| 1/29 (水) | APIの統合とテスト | 1/30 (木) |
| 1/30 (木) | ドキュメントの更新と完了報告 | 1/31 (金) |

---

## 📝 ドキュメントの更新

### 作成が必要なドキュメント
- [ ] APIエンドポイントの仕様書（本ファイル）
- [ ] ミドルウェアの実装ガイドライン
- [ ] エラーハンドリングのマニュアル

### 更新が必要なドキュメント
- [ ] `docs/database/COMMON_DATABASE_SCHEMA.md` の更新（APIエンドポイントの反映）
- [ ] `prisma/schema.prisma` の更新（API要件の反映）

---

## 🎯 次のステップ

1. ✅ APIエンドポイントの実装計画の作成（本ファイル）
2. 🔄 ミドルウェアの実装（認証・認可）
3. 🔄 Issue #83のAPIエンドポイントの実装
4. 🔄 Issue #84のAPIエンドポイントの実装
5. 🔄 Issue #85のAPIエンドポイントの実装

---

**更新日**: 2026-01-23
**次の更新**: ミドルウェアの実装開始時
