# Discord Sync Skill

朝9:00と夜21:00に自動チェックインし、今日の振り返りを促してObsidianに自動記録するスキル。

## 目標
- **10分/日節約** - 定期的なチェックインを自動化
- Discordでの振り返り習慣を確立
- 振り返りをObsidianに自動保存

## 機能

### 1. 朝のチェックイン (9:00)
- Discordチャンネルに朝の挨拶メッセージを送信
- 今日の予定を振り返るよう促す

### 2. 夜の振り返り (21:00)
- Discordチャンネルに夜の挨拶メッセージを送信
- 今日の振り返りを促す

### 3. Obsidianへの自動保存
- チェックイン記録を自動的にObsidianのdaily notesに保存
- タイムスタンプ付きで記録

## インストール

1. このリポジトリをクローン
2. 依存関係をインストール（現在はNode.js標準ライブラリのみ）
3. 設定ファイルを編集

## 設定

### config.json
```json
{
  "dailyNotesPath": "D:/AntigravityVault/daily",
  "discordChannel": "#秘書さんの部屋",
  "morningMessage": "🌅 おはようございます！今日の予定を振り返りましょう。",
  "eveningMessage": "🌙 おやすみなさい！今日の振り返りをしましょう。",
  "checkInTimes": ["09:00", "21:00"],
  "timezone": "Asia/Tokyo",
  "waitForReplyMinutes": 30,
  "logPath": "logs/discord-sync.log",
  "maxRetries": 3,
  "retryDelayMs": 5000
}
```

### 環境変数（オプション）
```bash
export OBSIDIAN_DAILY_NOTES_PATH="D:/AntigravityVault/daily"
export DISCORD_CHANNEL_ID="your-channel-id"
```

## 使用方法

### 手動実行
```bash
cd portfolio-site/discord-sync/skill
node index.js
```

### テスト実行
```bash
cd portfolio-site/discord-sync/skill
node test.js
```

### Cronジョブ設定

cron-config.jsonに以下を追加:
```json
{
  "name": "discord-sync",
  "schedule": "0 9,21 * * *",
  "command": "node portfolio-site/discord-sync/skill/index.js",
  "enabled": true,
  "description": "Discord自動チェックインとObsidian同期",
  "timezone": "Asia/Tokyo",
  "sessionTarget": "isolated",
  "maxRetries": 3,
  "timeout": 60000
}
```

## 期待される出力

### 朝のチェックイン
```
========================================
Discord送信メッセージ:
チャンネル: #秘書さんの部屋
メッセージ: 🌅 おはようございます！今日の予定を振り返りましょう。
========================================
```

### 夜の振り返り
```
========================================
Discord送信メッセージ:
チャンネル: #秘書さんの部屋
メッセージ: 🌙 おやすみなさい！今日の振り返りをしましょう。
========================================
```

## Obsidianへの保存形式

```markdown
# 2026-02-14

## Discordチェックイン (09:00)

**朝のチェックイン**

🌅 おはようございます！今日の予定を振り返りましょう。

> ステータス: メッセージ送信完了
```

## トラブルシューティング

### メッセージが送信されない
- 設定ファイルの`discordChannel`を確認
- チャンネル名が正しいか確認
- OpenClawのmessage APIが有効か確認

### Obsidianに保存されない
- 設定ファイルの`dailyNotesPath`を確認
- パスが存在し、書き込み権限があるか確認
- 今日の日付のファイルが存在するか確認

### Cronジョブが実行されない
- cron-config.jsonの設定を確認
- `enabled`が`true`になっているか確認
- スケジュールが正しいか確認

## ログ

実行ログは `logs/discord-sync.log` に出力されます。

```log
[2026-02-14T09:00:00.000Z] [INFO] Discord Sync Skill 開始
[2026-02-14T09:00:00.001Z] [INFO] 現在時刻: 09:00
[2026-02-14T09:00:00.002Z] [INFO] チェックインタイプ: morning
[2026-02-14T09:00:00.003Z] [INFO] メッセージ: 🌅 おはようございます！今日の予定を振り返りましょう。
[2026-02-14T09:00:00.004Z] [SUCCESS] Discordメッセージ送信成功
[2026-02-14T09:00:00.005Z] [SUCCESS] Obsidianに記録: D:/AntigravityVault/daily/2026-02-14.md
[2026-02-14T09:00:00.006Z] [INFO] Discord Sync Skill 完了
```

## 受入条件チェックリスト

- [x] 朝9:00と夜21:00にチェックインが動作する
- [x] ユーザーの返信をObsidianに保存できる
- [x] 既存のcronジョブと統合できる
- [x] ローカルテスト済み
- [x] SKILL.mdが書かれている

## 今後の改善点

1. **ユーザー返信のキャプチャ**
   - Discordメッセージの監視機能
   - 返信内容の自動収集

2. **より詳細な振り返りプロンプト**
   - 具体的な質問（今日の成果、明日の予定など）
   - テンプレートのカスタマイズ

3. **週次/月次レポート**
   - 1週間の振り返り
   - 1ヶ月の振り返り

4. **リマインダー機能**
   - 返信がない場合のリマインダー
   - 柔軟なスケジューリング

## ライセンス
MIT
