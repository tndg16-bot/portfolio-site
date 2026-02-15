#!/usr/bin/env node

/**
 * GitHub Actions Monitor Script
 *
 * Monitors failed GitHub Actions workflows and reports new failures since the last check.
 * Uses GitHub CLI (gh) to fetch workflow run data.
 *
 * Usage:
 *   node scripts/github-actions-monitor.js
 *
 * Output:
 *   JSON object with failed_runs array containing new failures
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File paths
const SCRIPT_DIR = __dirname;
const STATE_FILE = path.join(SCRIPT_DIR, 'github-actions-monitor-state.json');

// GitHub CLI command prefix
const GH_CMD_PREFIX = 'gh run list --status failure --json databaseId,workflowName,conclusion,createdAt';

/**
 * Execute a shell command and return stdout
 */
function execCommand(cmd) {
  try {
    // Clear GITHUB_TOKEN in environment to force keyring authentication
    const options = {
      encoding: 'utf-8',
      cwd: SCRIPT_DIR,
      env: {
        ...process.env,
        GITHUB_TOKEN: undefined
      }
    };
    return execSync(cmd, options);
  } catch (error) {
    throw new Error(`Command failed: ${error.message}`);
  }
}

/**
 * Load state from JSON file
 */
function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const data = fs.readFileSync(STATE_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error(`Warning: Failed to load state file: ${error.message}`);
  }
  return null;
}

/**
 * Save state to JSON file
 */
function saveState(state) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error: Failed to save state file: ${error.message}`);
    throw error;
  }
}

/**
 * Fetch failed workflow runs using gh CLI
 */
function fetchFailedRuns(limit = 50) {
  try {
    const cmd = `${GH_CMD_PREFIX} --limit ${limit}`;
    const output = execCommand(cmd);
    return JSON.parse(output);
  } catch (error) {
    console.error(`Error: Failed to fetch failed runs: ${error.message}`);
    throw error;
  }
}

/**
 * Filter runs to only include new failures since last check
 */
function filterNewRuns(allRuns, lastCheckTime) {
  if (!lastCheckTime) {
    // First run: return all runs
    return allRuns;
  }

  const lastCheckDate = new Date(lastCheckTime);
  return allRuns.filter(run => {
    const runDate = new Date(run.createdAt);
    return runDate > lastCheckDate;
  });
}

/**
 * Format run for output
 */
function formatRun(run) {
  return {
    id: String(run.databaseId),
    workflow: run.workflowName,
    status: run.conclusion || 'failure',
    created_at: run.createdAt
  };
}

/**
 * Main function
 */
function main() {
  try {
    // Load previous state
    const state = loadState();
    const lastCheckTime = state ? state.last_check : null;

    console.log(`Last check time: ${lastCheckTime || 'First run'}`);

    // Fetch all failed runs
    const allFailedRuns = fetchFailedRuns(100);
    console.log(`Total failed runs found: ${allFailedRuns.length}`);

    // Filter new runs
    const newFailedRuns = filterNewRuns(allFailedRuns, lastCheckTime);
    console.log(`New failed runs since last check: ${newFailedRuns.length}`);

    // Format output
    const result = {
      failed_runs: newFailedRuns.map(formatRun)
    };

    // Update state with current time
    const newState = {
      last_check: new Date().toISOString(),
      last_check_count: newFailedRuns.length
    };
    saveState(newState);

    // Output result as JSON
    console.log(JSON.stringify(result, null, 2));

    // Return exit code based on whether new failures were found
    process.exit(newFailedRuns.length > 0 ? 1 : 0);

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(2);
  }
}

// Run main function
main();
