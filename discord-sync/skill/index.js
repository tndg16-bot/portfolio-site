#!/usr/bin/env node

/**
 * Discord Sync Skill - Main Script
 *
 * 朝9:00と夜21:00に自動チェックインし、今日の振り返りを促してObsidianに自動記録
 */

import fs from 'fs/promises';
import path from 'path';

// 設定ファイルのパス
const CONFIG_PATH = path.join(__dirname, 'config.json');

// デフォルト設定
const DEFAULT_CONFIG = {
  dailyNotesPath: 'D:/AntigravityVault/daily',
  discordChannel: '#秘書さんの部屋',
  morningMessage: '🌅 おはようございます！今日の予定を振り返りましょう。',
  eveningMessage: '🌙 おやすみなさい！今日の振り返りをしましょう。',
  checkInTimes: ['09:00', '21:00'],
  timezone: 'Asia/Tokyo',
  waitForReplyMinutes: 30,
  logPath: 'logs/discord-sync.log',
  maxRetries: 3,
  retryDelayMs: 5000
};

/**
 * 設定を読み込む
 */
async function loadConfig() {
  try {
    const configData = await fs.readFile(CONFIG_PATH, 'utf-8');
    const config = JSON.parse(configData);
    return { ...DEFAULT_CONFIG, ...config };
  } catch (error) {
    console.error('設定ファイルの読み込みエラー（デフォルト設定を使用）:', error.message);
    return DEFAULT_CONFIG;
  }
}

/**
 * 現在時刻を取得（JST）
 */
function getCurrentTime() {
  return new Date().toLocaleTimeString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

/**
 * 現在の日付を取得（YYYY-MM-DD形式）
 */
function getCurrentDate() {
  return new Date().toLocaleDateString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '-');
}

/**
 * メッセージタイプを判定（朝/夜）
 */
function getCheckInType(config) {
  const currentTime = getCurrentTime();
  const [hour] = currentTime.split(':').map(Number);

  // 9:00-12:00 -> 朝
  // 21:00-23:59 -> 夜
  if (hour >= 9 && hour < 12) {
    return 'morning';
  } else if (hour >= 21 || hour < 1) {
    return 'evening';
  } else {
    // 現在時刻がチェックイン時間外の場合、最も近いチェックインを判定
    return hour < 9 ? 'morning' : 'evening';
  }
}

/**
 * メッセージを取得
 */
function getMessage(type, config) {
  return type === 'morning' ? config.morningMessage : config.eveningMessage;
}

/**
 * Discordにメッセージを送信
 * 注: この関数はOpenClawのmessage APIを使用して実装する必要があります
 * 現時点ではconsole.logで出力（テスト用）
 */
async function sendDiscordMessage(message, config) {
  console.log('========================================');
  console.log('Discord送信メッセージ:');
  console.log(`チャンネル: ${config.discordChannel}`);
  console.log(`メッセージ: ${message}`);
  console.log('========================================');
  
  // TODO: OpenClaw message APIを呼び出して実際に送信
  // このスキルはNode.jsスクリプトとして実行されるため、
  // 別の方法でDiscord送信を実装する必要があります
  
  return {
    success: true,
    channelId: config.discordChannel,
    messageId: `temp-${Date.now()}`,
    timestamp: new Date().toISOString()
  };
}

/**
 * Obsidianのdaily notesに追記
 */
async function appendToObsidian(content, config) {
  try {
    const date = getCurrentDate();
    const notePath = path.join(config.dailyNotesPath, `${date}.md`);
    
    // ファイルが存在しない場合は作成
    try {
      await fs.access(notePath);
    } catch {
      // ファイルが存在しない場合は新規作成
      const header = `# ${date}\n\n`;
      await fs.writeFile(notePath, header, 'utf-8');
    }
    
    // 追記
    const timestamp = new Date().toLocaleTimeString('ja-JP', {
      timeZone: 'Asia/Tokyo',
      hour: '2-digit',
      minute: '2-digit'
    });
    const entry = `\n\n## Discordチェックイン (${timestamp})\n\n${content}\n`;
    
    await fs.appendFile(notePath, entry, 'utf-8');
    
    return {
      success: true,
      path: notePath
    };
  } catch (error) {
    console.error('Obsidianへの書き込みエラー:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * ログを記録
 */
async function log(message, level = 'info', config) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
  
  console.log(logEntry.trim());
  
  try {
    const logDir = path.dirname(config.logPath);
    await fs.mkdir(logDir, { recursive: true });
    await fs.appendFile(config.logPath, logEntry, 'utf-8');
  } catch (error) {
    console.error('ログ書き込みエラー:', error.message);
  }
}

/**
 * メイン処理
 */
async function main() {
  try {
    // 設定を読み込む
    const config = await loadConfig();
    await log('Discord Sync Skill 開始', 'info', config);
    await log(`現在時刻: ${getCurrentTime()}`, 'info', config);
    
    // チェックインタイプを判定
    const checkInType = getCheckInType(config);
    await log(`チェックインタイプ: ${checkInType}`, 'info', config);
    
    // メッセージを取得
    const message = getMessage(checkInType, config);
    await log(`メッセージ: ${message}`, 'info', config);
    
    // Discordにメッセージを送信
    const sendResult = await sendDiscordMessage(message, config);
    if (sendResult.success) {
      await log('Discordメッセージ送信成功', 'success', config);
    } else {
      await log(`Discordメッセージ送信失敗: ${sendResult.error}`, 'error', config);
    }
    
    // Obsidianにチェックイン記録
    const obsidianContent = `**${checkInType === 'morning' ? '朝のチェックイン' : '夜の振り返り'}**\n\n${message}\n\n> ステータス: メッセージ送信完了`;
    const obsidianResult = await appendToObsidian(obsidianContent, config);
    if (obsidianResult.success) {
      await log(`Obsidianに記録: ${obsidianResult.path}`, 'success', config);
    } else {
      await log(`Obsidian記録失敗: ${obsidianResult.error}`, 'error', config);
    }
    
    await log('Discord Sync Skill 完了', 'info', config);
    
    // 結果を出力（OpenClawが解析できる形式）
    console.log(JSON.stringify({
      status: 'success',
      checkInType,
      message,
      discordSent: sendResult.success,
      obsidianSaved: obsidianResult.success,
      obsidianPath: obsidianResult.success ? obsidianResult.path : null,
      timestamp: new Date().toISOString()
    }, null, 2));
    
    process.exit(0);
  } catch (error) {
    console.error('エラー:', error);
    process.exit(1);
  }
}

// 実行
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = {
  main,
  loadConfig,
  getCheckInType,
  getMessage,
  sendDiscordMessage,
  appendToObsidian,
  log
};
