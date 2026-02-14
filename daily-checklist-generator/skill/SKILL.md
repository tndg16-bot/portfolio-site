# Daily Checklist Generator

## Description

Obsidianのデイリーノートから未完了タスクを自動抽出し、優先順位付けしたチェックリストを生成するスキル。

## Purpose

- **時間節約**: 毎日15分のタスク整理時間を節約
- **効率化**: 朝の通知と統合してタスク管理を自動化
- **優先順位**: 緊急度と重要度に基づいてタスクを自動ソート

## Usage

### Basic Usage

```
daily-checklist-generator
```

### Custom Path

```
daily-checklist-generator --path "C:/path/to/your/daily/notes"
```

## Configuration

Edit `config.json` to customize:

```json
{
  "dailyNotesPath": "D:/AntigravityVault/daily",
  "priorityMarkers": ["!!!", "!!", "!"],
  "dueDatePatterns": ["@due", "@today", "@tomorrow"],
  "maxTasks": 20,
  "timezone": "Asia/Tokyo"
}
```

### Config Options

- `dailyNotesPath`: Path to your Obsidian daily notes directory
- `priorityMarkers`: Priority markers for importance (highest to lowest)
- `dueDatePatterns`: Patterns to detect task urgency
- `maxTasks`: Maximum number of tasks to display
- `timezone`: Timezone for date calculations

## Task Format

Tasks should be in Obsidian's standard markdown task format:

```markdown
- [ ] Low priority task
- [ ] ! Medium priority task
- [ ] !! High priority task
- [ ] !!! Urgent task
- [ ] Task due today @today
- [ ] Task due tomorrow @tomorrow
- [ ] !!! Urgent task due today @due
```

## Priority Algorithm

Priority is calculated as: **Urgency × Importance**

### Urgency Scores
- **High (3)**: `@due`, `@today`
- **Medium (2)**: `@tomorrow`
- **Low (1)**: No due date pattern

### Importance Scores
- **3**: `!!!`
- **2**: `!!`
- **1.5**: `!`
- **1**: No marker

### Final Score Examples
- `!!! + @due` = 3 × 3 = **9** (Highest)
- `! + @today` = 3 × 1.5 = **4.5**
- `!!!` = 1 × 3 = **3**
- `! + @tomorrow` = 2 × 1.5 = **3**
- No markers = 1 × 1 = **1** (Lowest)

## Integration with Morning Secretary

This skill integrates seamlessly with the morning-secretary skill:

```javascript
// In morning-secretary integration
const checklist = require('./daily-checklist-generator');
const result = checklist.generateChecklist(config.dailyNotesPath);
const formatted = checklist.formatChecklist(result);

// Include in morning notification
morningMessage += '\n' + formatted;
```

## Output Format

```
📋 今日のチェックリスト
*合計: 15件（高優先: 3, 中: 5, 低: 7）*

🔴 1. !!! Urgent task due today @due
🔴 2. !! Another important task @today
🟡 3. Medium priority task
🟢 4. Low priority task
...
```

## API Reference

### Main Functions

#### `main(args)`
Main entry point for skill execution

- **args.path**: Custom path to daily notes (optional)
- **Returns**: `{ success, output, data }`

#### `generateChecklist(notesPath)`
Generate prioritized checklist from daily notes

- **notesPath**: Path to daily notes directory
- **Returns**: `{ success, tasks, stats, message }`

#### `formatChecklist(result)`
Format checklist result for display

- **result**: Result object from generateChecklist
- **Returns**: Formatted string with emojis and statistics

## Error Handling

The skill handles various error scenarios:

- ✅ Directory not found → Returns message "No daily notes found"
- ✅ No markdown files → Returns message "No daily notes found"
- ✅ No incomplete tasks → Returns message "No incomplete tasks found"
- ✅ File read errors → Logged and skipped
- ✅ Invalid config → Falls back to defaults

## Logging

All operations are logged with timestamps:

```
[2026-02-14T16:33:00.000Z] [INFO] Starting checklist generation...
[2026-02-14T16:33:00.100Z] [INFO] Found 30 markdown files in D:/AntigravityVault/daily
[2026-02-14T16:33:00.500Z] [INFO] Generated checklist with 20 tasks (total: 45)
```

## Performance

- ⚡ Fast: Scans 30+ files in <1 second
- 💾 Low memory: Streaming file reads
- 🔧 Configurable: Limit tasks to reduce output size

## Requirements

- Node.js (built-in modules: `fs`, `path`)
- Obsidian daily notes in markdown format
- Tasks in `- [ ]` format

## License

MIT

## Author

Generated for tndg16-bot portfolio project

## Changelog

### v1.0.0 (2026-02-14)
- Initial release
- Task extraction from Obsidian daily notes
- Priority calculation algorithm
- morning-secretary integration
- Error handling and logging
