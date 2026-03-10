/**
 * Integration Module: Daily Checklist + Morning Secretary
 * Integrates daily-checklist-generator with morning-secretary
 */

import checklist from '../../../openclaw-skills/daily-checklist-generator/index.js';

// Path to daily notes (from config)
const DEFAULT_DAILY_NOTES_PATH = 'D:/AntigravityVault/daily';

/**
 * Add checklist to morning briefing
 */
async function addChecklistToBriefing(briefing, config = {}) {
  const dailyNotesPath = config.dailyNotesPath || DEFAULT_DAILY_NOTES_PATH;

  try {
    // Generate checklist
    const result = checklist.generateChecklist(dailyNotesPath);

    if (!result.success || result.tasks.length === 0) {
      // No tasks found, return original briefing
      return briefing;
    }

    // Format checklist
    const formattedChecklist = checklist.formatChecklist(result);

    // Add checklist to briefing (before the tips section)
    const lines = briefing.split('\n');
    const tipsIndex = lines.findIndex(line => line.includes('💡 今日のヒント'));

    if (tipsIndex === -1) {
      // If tips section not found, append at end
      return briefing + '\n' + formattedChecklist;
    }

    // Insert checklist before tips
    lines.splice(tipsIndex, 0, formattedChecklist);
    return lines.join('\n');
  } catch (error) {
    console.error('Error adding checklist to briefing:', error.message);
    // Return original briefing if integration fails
    return briefing;
  }
}

/**
 * Generate morning briefing with checklist
 */
async function generateBriefingWithChecklist(events, weather, config) {
  // Import morning-secretary's generateMorningBriefing
  import morningSecretary from '../morning-secretary/index.js';

  // Generate original briefing
  const briefing = morningSecretary.generateMorningBriefing(events, weather, config);

  // Add checklist
  const briefingWithChecklist = await addChecklistToBriefing(briefing, config);

  return briefingWithChecklist;
}

export {
  addChecklistToBriefing,
  generateBriefingWithChecklist
};
