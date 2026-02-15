# Morning Routine Combined

朝9時にデイリーチェックリスト生成とDiscordチェックインを統合して実行するスキル。

## 概要

このスキルは、毎朝9時に以下の2つの機能を1つのジョブで実行します：

1. **デイリーチェックリスト生成**: Obsidianのデイリーノートから未完了タスクを抽出し、優先順位付けしたチェックリストを生成
2. **Discord自動チェックイン**: Discordチャンネルに朝の挨拶メッセージとチェックリストを送信し、Obsidianに自動記録

## インストール

```bash
# スキルディレクトリに移動
cd portfolio-site/morning-routine-combined/skill

# 依存関係をインストール（Node.js標準モジュールのみのため不要）
# npm install
```

## 設定

`config.json` を編集して設定をカスタマイズしてください。

```json
{
  "dailyNotesPath": "D:/AntigravityVault/daily",
  "discordChannel": "#秘書さんの部屋",
  "morningMessage": "🌅 おはようございます！今日の予定を振り返りましょう。",
  "priorityMarkers": ["!!!", "!!", "!"],
  "dueDatePatterns": ["@due", "@today", "@tomorrow"],
  "maxTasks": 20,
  "timezone": "Asia/Tokyo"
}
```

## 使用方法

### 手動実行

```bash
node index.js
```

### テスト実行

```bash
# テスト用のデイリーノートを作成
node test.js
```

## Cronジョブ設定

OpenClawのcronシステムに以下のジョブを追加します：

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

注: このジョブを追加した後、以下の既存ジョブを削除または無効化してください：
- `daily-checklist-generator` ジョブ（もしあれば）
- `discord-sync` ジョブの朝9時部分（21時部分は残す）

## 出力例

```
🌅 おはようございます！今日の予定を振り返りましょう。

📋 今日のチェックリスト
*合計: 15件（高優先: 3, 中: 5, 低: 7）*

🔴 1. !!! 緊急のタスク @due
🔴 2. !! 重要なタスク @today
🟡 3. 中程度の優先度のタスク
🟢 4. 低優先度のタスク
...
```

## 優先順位計算

優先順位は **緊急度 × 重要度** で計算されます：

- **緊急度**: `@due/@today` (3), `@tomorrow` (2), なし (1)
- **重要度**: `!!!` (3), `!!` (2), `!` (1.5), なし (1)

例: `!!! + @due` = 3 × 3 = **9**（最高優先）

## ログ

実行ログは `logs/morning-routine-combined.log` に出力されます。

## トラブルシューティング

### チェックリストが生成されない
- デイリーノートパスが正しいか確認
- 未完了タスクがあるか確認（`- [ ]`形式）

### メッセージが送信されない
- Discordチャンネル設定を確認
- ボットの権限を確認

## ライセンス

MIT

## 著者

tndg16-bot portfolio project
