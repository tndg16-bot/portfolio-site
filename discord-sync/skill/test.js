#!/usr/bin/env node

/**
 * Discord Sync Skill - Test Script
 * 
 * ローカルテスト用スクリプト
 */

const { main, loadConfig, getCheckInType, getMessage, appendToObsidian, log } = require('./index');
const fs = require('fs').promises;
const path = require('path');

// テスト設定
const TEST_CONFIG = {
  dailyNotesPath: './test-daily-notes',
  discordChannel: '#test-channel',
  morningMessage: '🌅 テスト: おはようございます！',
  eveningMessage: '🌙 テスト: おやすみなさい！',
  checkInTimes: ['09:00', '21:00'],
  timezone: 'Asia/Tokyo',
  waitForReplyMinutes: 30,
  logPath: 'logs/test-discord-sync.log',
  maxRetries: 3,
  retryDelayMs: 5000
};

/**
 * テストディレクトリのセットアップ
 */
async function setupTestEnv() {
  console.log('テスト環境のセットアップ中...');
  
  // テスト用daily notesディレクトリを作成
  try {
    await fs.mkdir(TEST_CONFIG.dailyNotesPath, { recursive: true });
    console.log('✓ テスト用daily notesディレクトリを作成');
  } catch (error) {
    console.error('✗ ディレクトリ作成エラー:', error.message);
  }
  
  // ログディレクトリを作成
  try {
    await fs.mkdir(path.dirname(TEST_CONFIG.logPath), { recursive: true });
    console.log('✓ ログディレクトリを作成');
  } catch (error) {
    console.error('✗ ログディレクトリ作成エラー:', error.message);
  }
}

/**
 * テストディレクトリのクリーンアップ
 */
async function cleanupTestEnv() {
  console.log('\nテスト環境のクリーンアップ中...');
  
  try {
    // テストディレクトリを削除
    await fs.rm('./test-daily-notes', { recursive: true, force: true });
    await fs.rm('./logs', { recursive: true, force: true });
    console.log('✓ テスト環境をクリーンアップ');
  } catch (error) {
    console.error('✗ クリーンアップエラー:', error.message);
  }
}

/**
 * テスト: 設定読み込み
 */
async function testLoadConfig() {
  console.log('\n[テスト] 設定読み込み');
  
  const config = await loadConfig();
  console.log('✓ 設定を読み込みました');
  console.log(`  - dailyNotesPath: ${config.dailyNotesPath}`);
  console.log(`  - discordChannel: ${config.discordChannel}`);
  console.log(`  - checkInTimes: ${config.checkInTimes.join(', ')}`);
  
  return true;
}

/**
 * テスト: チェックインタイプ判定
 */
async function testCheckInType() {
  console.log('\n[テスト] チェックインタイプ判定');
  
  const config = await loadConfig();
  const checkInType = getCheckInType(config);
  console.log(`✓ チェックインタイプ: ${checkInType}`);
  
  const message = getMessage(checkInType, config);
  console.log(`✓ メッセージ: ${message}`);
  
  return true;
}

/**
 * テスト: Obsidian追記
 */
async function testAppendToObsidian() {
  console.log('\n[テスト] Obsidian追記');
  
  const content = 'テストメッセージです';
  const result = await appendToObsidian(content, TEST_CONFIG);
  
  if (result.success) {
    console.log('✓ Obsidianに追記しました');
    console.log(`  - パス: ${result.path}`);
    
    // 内容を確認
    const fileContent = await fs.readFile(result.path, 'utf-8');
    console.log(`  - 内容（最初の100文字）: ${fileContent.substring(0, 100)}...`);
    
    return true;
  } else {
    console.error('✗ Obsidian追記に失敗:', result.error);
    return false;
  }
}

/**
 * テスト: メイン処理
 */
async function testMain() {
  console.log('\n[テスト] メイン処理');
  
  try {
    await main();
    console.log('✓ メイン処理が正常に完了しました');
    return true;
  } catch (error) {
    console.error('✗ メイン処理でエラー:', error.message);
    return false;
  }
}

/**
 * すべてのテストを実行
 */
async function runAllTests() {
  console.log('========================================');
  console.log('Discord Sync Skill - テスト実行');
  console.log('========================================');
  
  const results = {
    setup: false,
    loadConfig: false,
    checkInType: false,
    appendToObsidian: false,
    main: false,
    cleanup: false
  };
  
  // セットアップ
  results.setup = true;
  await setupTestEnv();
  
  // テスト実行
  results.loadConfig = await testLoadConfig();
  results.checkInType = await testCheckInType();
  results.appendToObsidian = await testAppendToObsidian();
  results.main = await testMain();
  
  // クリーンアップ
  await cleanupTestEnv();
  results.cleanup = true;
  
  // 結果サマリー
  console.log('\n========================================');
  console.log('テスト結果サマリー');
  console.log('========================================');
  for (const [test, passed] of Object.entries(results)) {
    const icon = passed ? '✓' : '✗';
    console.log(`${icon} ${test}`);
  }
  
  const allPassed = Object.values(results).every(v => v);
  console.log('\n' + (allPassed ? '✓ すべてのテストに成功しました' : '✗ 一部のテストに失敗しました'));
  
  return allPassed;
}

// テスト実行
if (require.main === module) {
  runAllTests()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('テスト実行中にエラー:', error);
      process.exit(1);
    });
}

module.exports = {
  runAllTests,
  testLoadConfig,
  testCheckInType,
  testAppendToObsidian,
  testMain
};
