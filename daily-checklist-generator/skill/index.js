/**
 * Daily Checklist Generator
 * Extracts incomplete tasks from Obsidian daily notes and generates a prioritized checklist
 */

import fs from 'fs';
import path from 'path';

// Load configuration
let config;
try {
  const configPath = path.join(__dirname, 'config.json');
  if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } else {
    config = {
      dailyNotesPath: './daily',
      priorityMarkers: ['!!!', '!!', '!'],
      dueDatePatterns: ['@due', '@today', '@tomorrow'],
      maxTasks: 20
    };
  }
} catch (error) {
  console.error('Error loading config:', error.message);
  config = {
    dailyNotesPath: './daily',
    priorityMarkers: ['!!!', '!!', '!'],
    dueDatePatterns: ['@due', '@today', '@tomorrow'],
    maxTasks: 20
  };
}

/**
 * Log message with timestamp
 */
function log(level, message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] ${message}`);
}

/**
 * Read all markdown files from a directory
 */
function readDailyNotes(notesPath) {
  try {
    if (!fs.existsSync(notesPath)) {
      log('ERROR', `Daily notes directory not found: ${notesPath}`);
      return [];
    }

    const files = fs.readdirSync(notesPath);
    const markdownFiles = files
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(notesPath, file));

    log('INFO', `Found ${markdownFiles.length} markdown files in ${notesPath}`);
    return markdownFiles;
  } catch (error) {
    log('ERROR', `Error reading daily notes: ${error.message}`);
    return [];
  }
}

/**
 * Extract incomplete tasks from markdown content
 */
function extractIncompleteTasks(content) {
  const tasks = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Match incomplete task: - [ ] with optional priority markers and due dates
    const taskMatch = line.match(/^[\s\t]*-\s\[\s\]\s+(.+)$/);

    if (taskMatch) {
      const taskText = taskMatch[1].trim();
      const markers = [];

      // Check for priority markers
      config.priorityMarkers.forEach(marker => {
        if (taskText.includes(marker)) {
          markers.push(marker);
        }
      });

      // Check for due date patterns
      let urgency = 'low'; // default
      config.dueDatePatterns.forEach(pattern => {
        if (taskText.toLowerCase().includes(pattern)) {
          if (pattern === '@due' || pattern === '@today') {
            urgency = 'high';
          } else if (pattern === '@tomorrow') {
            urgency = 'medium';
          }
        }
      });

      // Clean task text (remove priority markers for display)
      let cleanTask = taskText;
      config.priorityMarkers.forEach(marker => {
        cleanTask = cleanTask.replace(new RegExp(marker, 'g'), '').trim();
      });

      tasks.push({
        text: cleanTask,
        originalText: taskText,
        line: index + 1,
        urgency: urgency,
        hasMarkers: markers.length > 0
      });
    }
  });

  return tasks;
}

/**
 * Calculate priority score for a task
 */
function calculatePriorityScore(task) {
  let urgencyScore = 1; // low
  let importanceScore = 1; // no marker

  // Urgency scores
  if (task.urgency === 'high') urgencyScore = 3;
  else if (task.urgency === 'medium') urgencyScore = 2;

  // Importance scores based on markers
  const originalText = task.originalText;
  if (originalText.includes('!!!')) importanceScore = 3;
  else if (originalText.includes('!!')) importanceScore = 2;
  else if (originalText.includes('!')) importanceScore = 1.5;

  // Final score
  return urgencyScore * importanceScore;
}

/**
 * Generate prioritized checklist
 */
function generateChecklist(notesPath) {
  log('INFO', 'Starting checklist generation...');

  // Read all daily notes
  const noteFiles = readDailyNotes(notesPath);

  if (noteFiles.length === 0) {
    log('WARN', 'No daily notes found');
    return { success: true, tasks: [], message: 'No daily notes found' };
  }

  // Extract tasks from all notes
  const allTasks = [];
  noteFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const tasks = extractIncompleteTasks(content);
      tasks.forEach(task => {
        task.sourceFile = path.basename(file);
        task.score = calculatePriorityScore(task);
      });
      allTasks.push(...tasks);
    } catch (error) {
      log('ERROR', `Error reading file ${file}: ${error.message}`);
    }
  });

  if (allTasks.length === 0) {
    log('INFO', 'No incomplete tasks found');
    return {
      success: true,
      tasks: [],
      message: 'No incomplete tasks found',
      stats: { totalTasks: 0, high: 0, medium: 0, low: 0 }
    };
  }

  // Sort by priority score (descending)
  allTasks.sort((a, b) => b.score - a.score);

  // Limit to maxTasks
  const limitedTasks = allTasks.slice(0, config.maxTasks);

  // Calculate statistics
  const stats = {
    totalTasks: allTasks.length,
    high: allTasks.filter(t => t.score >= 6).length,
    medium: allTasks.filter(t => t.score >= 3 && t.score < 6).length,
    low: allTasks.filter(t => t.score < 3).length
  };

  log('INFO', `Generated checklist with ${limitedTasks.length} tasks (total: ${allTasks.length})`);

  return {
    success: true,
    tasks: limitedTasks,
    stats: stats,
    message: `Found ${allTasks.length} incomplete tasks, showing top ${limitedTasks.length}`
  };
}

/**
 * Format checklist for display
 */
function formatChecklist(result) {
  if (!result.success || result.tasks.length === 0) {
    return result.message || 'No tasks to display';
  }

  let output = `\n📋 **今日のチェックリスト**\n`;
  output += `*合計: ${result.stats.totalTasks}件（高優先: ${result.stats.high}, 中: ${result.stats.medium}, 低: ${result.stats.low}）*\n\n`;

  result.tasks.forEach((task, index) => {
    const priorityEmoji = task.score >= 6 ? '🔴' : task.score >= 3 ? '🟡' : '🟢';
    output += `${priorityEmoji} ${index + 1}. ${task.text}\n`;
  });

  if (result.stats.totalTasks > result.tasks.length) {
    output += `\n*他 ${result.stats.totalTasks - result.tasks.length} 件は省略されています*`;
  }

  return output;
}

/**
 * Main entry point for skill execution
 */
function main(args) {
  const notesPath = args.path || config.dailyNotesPath;

  try {
    log('INFO', `Daily Checklist Generator started with path: ${notesPath}`);

    const result = generateChecklist(notesPath);
    const formattedOutput = formatChecklist(result);

    return {
      success: true,
      output: formattedOutput,
      data: result
    };
  } catch (error) {
    log('ERROR', `Error in main: ${error.message}`);
    return {
      success: false,
      output: `Error: ${error.message}`,
      error: error
    };
  }
}

// Export for skill framework
export default {
  name: 'daily-checklist-generator',
  description: 'Extracts incomplete tasks from Obsidian daily notes and generates a prioritized checklist',
  version: '1.0.0',
  main: main,
  generateChecklist: generateChecklist,
  formatChecklist: formatChecklist
};
