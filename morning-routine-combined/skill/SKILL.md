# Morning Routine Combined Skill

## 概要
毎朝9時に以下の2つの機能を統合して実行するスキルです：
1. **デイリーチェックリスト生成**: Obsidianのデイリーノートから未完了タスクを抽出し、優先順位付けしたチェックリストを生成
2. **Discord自動チェックイン**: Discordチャンネルに朝の挨拶メッセージとチェックリストを送信し、Obsidianに自動記録

## 目標
- 15分/日節約（タスク整理 + チェックイン）
- 朝のルーチンを1つのジョブで完結
- 効率的なタスク管理と定期的なチェックインの統合

## 機能
1. **デイリーチェックリスト生成**
   - Obsidianのデイリーノートをスキャン
   - `- [ ]` 形式の未完了タスクを抽出
   - 優先順位を自動付け（緊急度×重要度）
   - 最大20件まで表示（設定可能）

2. **Discord朝のチェックイン (9:00)**
   - Discordチャンネルに朝の挨拶メッセージを送信
   - チェックリストを含めて送信
   - 今日の予定を振り返るよう促す

3. **Obsidianへの自動保存**
   - 朝のチェックイン記録をObsidianのdaily notesに追記
   - チェックリストも保存

## 使用方法

### 手動実行
```bash
node index.js
```

### Cronジョブ設定
```json
{
  "name": "morning-routine-combined",
  "schedule": "0 9 * * *",
  "command": "node portfolio-site/morning-routine-combined/skill/index.js",
  "enabled": true,
  "description": "朝のデイリーノート通知とDiscordチェックイン（朝9:00）",
  "timezone": "Asia/Tokyo"
}
```

## 設定ファイル (config.json)
```json
{
  "dailyNotesPath": "D:/AntigravityVault/daily",
  "discordChannel": "#秘書さんの部屋",
  "morningMessage": "🌅 おはようございます！今日の予定を振り返りましょう。",
  "priorityMarkers": ["!!!", "!!", "!"],
  "dueDatePatterns": ["@due", "@today", "@tomorrow"],
  "maxTasks": 20,
  "timezone": "Asia/Tokyo",
  "logPath": "logs/morning-routine-combined.log",
  "maxRetries": 3,
  "retryDelayMs": 5000
}
```

## 設定オプション

- `dailyNotesPath`: Obsidianのdaily notesディレクトリパス
- `discordChannel`: Discordチャンネル名（例: `#秘書さんの部屋`）
- `morningMessage`: 朝の挨拶メッセージ
- `priorityMarkers`: 重要度マーカー（高から低の順）
- `dueDatePatterns`: 緊急度を判定するための日付パターン
- `maxTasks`: 表示する最大タスク数
- `timezone`: タイムゾーン
- `logPath`: ログファイルのパス

## 優先順位アルゴリズム

優先順位は **緊急度 × 重要度** で計算されます。

### 緊急度スコア
- **高 (3)**: `@due`, `@today`
- **中 (2)**: `@tomorrow`
- **低 (1)**: 日付パターンなし

### 重要度スコア
- **3**: `!!!`
- **2**: `!!`
- **1.5**: `!`
- **1**: マーカーなし

### スコア例
- `!!! + @due` = 3 × 3 = **9**（最高）
- `! + @today` = 3 × 1.5 = **4.5**
- `!!!` = 1 × 3 = **3**
- `! + @tomorrow` = 2 × 1.5 = **3**
- マーカーなし = 1 × 1 = **1**（最低）

## 出力形式

```
🌅 おはようございます！今日の予定を振り返りましょう。

📋 今日のチェックリスト
*合計: 15件（高優先: 3, 中: 5, 低: 7）*

🔴 1. !!! Urgent task due today @due
🔴 2. !! Another important task @today
🟡 3. Medium priority task
🟢 4. Low priority task
...
```

## エラーハンドリング

- ✅ デイリーノートディレクトリがない → メッセージを送信して続行
- ✅ 未完了タスクがない → メッセージのみ送信
- ✅ Discord送信エラー → リトライ処理（最大3回）
- ✅ Obsidian書き込みエラー → ログに記録して続行

## ログ

実行ログは `logs/morning-routine-combined.log` に出力されます。

```
[2026-02-15T09:00:00.000Z] [INFO] Morning Routine Combined 開始
[2026-02-15T09:00:00.100Z] [INFO] ステップ1: デイリーチェックリスト生成
[2026-02-15T09:00:00.500Z] [SUCCESS] チェックリスト生成完了: 20件（合計: 45件）
[2026-02-15T09:00:00.600Z] [INFO] ステップ2: Discordメッセージ作成
[2026-02-15T09:00:00.700Z] [INFO] ステップ3: Discordメッセージ送信
[2026-02-15T09:00:01.000Z] [SUCCESS] Discordメッセージ送信成功
[2026-02-15T09:00:01.100Z] [INFO] ステップ4: Obsidianに記録
[2026-02-15T09:00:01.200Z] [SUCCESS] Obsidianに記録: D:/AntigravityVault/daily/2026-02-15.md
[2026-02-15T09:00:01.300Z] [INFO] Morning Routine Combined 完了
```

## 統合前のジョブ

このスキルは以下の2つのジョブを統合しました：
1. **朝のデイリーノート通知** (daily-checklist-generator)
2. **Discord自動同步スキル（朝9時）** (discord-sync)

注: Discordの夜のチェックイン（21:00）は `discord-sync` ジョブとして継続実行されます。

## 依存関係

- Node.js >= 18
- fs/promises (Node.js標準)
- message API (Discord送信 - 要実装)

## トラブルシューティング

### チェックリストが生成されない
- デイリーノートパスを確認
- 未完了タスクがあるか確認
- ファイル権限を確認

### メッセージが送信されない
- DiscordチャンネルIDを確認
- ボットの権限を確認
- ネットワーク接続を確認

### Obsidianに保存されない
- daily notesパスを確認
- ファイル書き込み権限を確認
- 今日の日付のファイルが作成されるか確認

## ライセンス
MIT
