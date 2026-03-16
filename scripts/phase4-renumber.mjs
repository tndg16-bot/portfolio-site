import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDir = path.join(process.cwd(), 'content/blog');
const archiveDir = path.join(blogDir, '_archive');

// Ensure _archive exists
if (!fs.existsSync(archiveDir)) {
  fs.mkdirSync(archiveDir, { recursive: true });
}

// Define surviving articles (Tier A + all rewritten/new)
const survivingNumbers = new Set([
  // Tier A (high quality, keep as-is)
  '002', '003', '004', '006', '007', '008', '009', '010', '014',
  '016', '018', '028', '032', '034', '036', '038', '044',
  '063', '069', '072', '078', '084', '087', '090',
  // Phase 1 rewrites
  '001', '005', '021', '029', '031', '039', '050', '059', '145', '243',
  // Phase 2 merges (primary articles)
  '025', '043', '077', '097', '120', '122', '124', '139', '151', '154', '155', '185',
  // Phase 2 Tier B rewrites
  '011', '012', '013', '015', '017', '020', '022', '023', '024', '026', '027', '030',
  '033', '035', '037', '040', '045', '047', '053', '066', '071', '098', '102', '104',
  // Phase 3 Tier B rewrites
  '116', '117', '126', '159', '207', '214', '216', '219', '221', '223',
  '268', '270', '271', '272', '274', '276', '277', '278', '300', '301',
  // Series articles (321-325)
  '321', '322', '323', '324', '325',
  // New articles (326-345)
  '326', '327', '328', '329', '330', '331', '332', '333', '334', '335',
  '336', '337', '338', '339', '340', '341', '342', '343', '344', '345',
]);

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md')).sort();

const surviving = [];
const toArchive = [];

for (const file of files) {
  const fullPath = path.join(blogDir, file);
  const content = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(content);
  const num = file.match(/^(\d+)/)?.[1] || '';

  // Skip already published:false
  if (data.published === false) {
    toArchive.push({ file, reason: 'published:false' });
    continue;
  }

  if (survivingNumbers.has(num)) {
    surviving.push({ num, file, slug: data.slug, fullPath });
  } else {
    toArchive.push({ file, reason: 'not in surviving set' });
  }
}

console.log(`Surviving: ${surviving.length}`);
console.log(`To archive: ${toArchive.length}`);

// DRY RUN first
const dryRun = process.argv.includes('--dry-run');
const execute = process.argv.includes('--execute');

if (!dryRun && !execute) {
  console.log('\nUsage: node scripts/phase4-renumber.mjs --dry-run OR --execute');
  console.log('\nSurviving articles that will be renumbered:');
  surviving.forEach((a, i) => {
    const newNum = String(i + 1).padStart(3, '0');
    const newFile = a.file.replace(/^\d+/, newNum);
    console.log(`  ${a.file} -> ${newFile}`);
  });
  console.log('\nArticles to archive:');
  toArchive.slice(0, 20).forEach(a => console.log(`  ${a.file} (${a.reason})`));
  if (toArchive.length > 20) console.log(`  ... and ${toArchive.length - 20} more`);
  process.exit(0);
}

if (dryRun) {
  console.log('\n=== DRY RUN ===');
  console.log('\nRenaming:');
  surviving.forEach((a, i) => {
    const newNum = String(i + 1).padStart(3, '0');
    const newFile = a.file.replace(/^\d+/, newNum);
    if (a.file !== newFile) {
      console.log(`  ${a.file} -> ${newFile}`);
    }
  });
  console.log('\nArchiving:');
  toArchive.forEach(a => console.log(`  ${a.file}`));
  process.exit(0);
}

if (execute) {
  console.log('\n=== EXECUTING ===');

  // Step 1: Archive non-surviving articles
  console.log('\nArchiving...');
  for (const a of toArchive) {
    const src = path.join(blogDir, a.file);
    const dest = path.join(archiveDir, a.file);
    if (fs.existsSync(src)) {
      fs.renameSync(src, dest);
      console.log(`  Archived: ${a.file}`);
    }
  }

  // Step 2: Renumber surviving articles
  // First, move all to temp names to avoid conflicts
  console.log('\nRenumbering (phase 1: temp names)...');
  const tempDir = path.join(blogDir, '_temp_renumber');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  for (const a of surviving) {
    const src = path.join(blogDir, a.file);
    const dest = path.join(tempDir, a.file);
    if (fs.existsSync(src)) {
      fs.renameSync(src, dest);
    }
  }

  console.log('Renumbering (phase 2: final names)...');
  for (let i = 0; i < surviving.length; i++) {
    const a = surviving[i];
    const newNum = String(i + 1).padStart(3, '0');
    const newFile = a.file.replace(/^\d+/, newNum);
    const src = path.join(tempDir, a.file);
    const dest = path.join(blogDir, newFile);
    fs.renameSync(src, dest);
    if (a.file !== newFile) {
      console.log(`  ${a.file} -> ${newFile}`);
    }
  }

  // Remove temp dir
  fs.rmdirSync(tempDir);

  console.log(`\nDone! ${surviving.length} articles renumbered, ${toArchive.length} archived.`);
}
