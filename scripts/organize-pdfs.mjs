// Flatens Chinese-named Quark PDF folders into clean English paths
import { copyFile, mkdir, readdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PDFS = path.resolve(__dirname, '..', 'public', 'pdfs');

const MAP = {
  cet4: {
    '2021年06月CET4': { year: 2021, month: 6 },
    '2021年12月CET4': { year: 2021, month: 12 },
    '2022年06月CET4': { year: 2022, month: 6 },
    '2022年09月CET4': { year: 2022, month: 9 },
    '2022年12月CET4': { year: 2022, month: 12 },
    '2023年03月CET4': { year: 2023, month: 3 },
    '2023年06月CET4': { year: 2023, month: 6 },
    '2023年12月CET4': { year: 2023, month: 12 },
    '2024年6月CET4': { year: 2024, month: 6 },
    '2024年12月CET4': { year: 2024, month: 12 },
  },
  cet6: {
    '2021年06月CET6': { year: 2021, month: 6 },
    '2021年12月CET6': { year: 2021, month: 12 },
    '2022年06月CET6': { year: 2022, month: 6 },
    '2022年09月CET6': { year: 2022, month: 9 },
    '2022年12月CET6': { year: 2022, month: 12 },
    '2023年3月CET6': { year: 2023, month: 3 },
    '2023年06月CET6': { year: 2023, month: 6 },
    '2023年12月CET6': { year: 2023, month: 12 },
    '2024年6月CET6': { year: 2024, month: 6 },
    '2024年12月CET6': { year: 2024, month: 12 },
  },
};

async function findFiles(dir, pattern) {
  const files = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        files.push(...await findFiles(full, pattern));
      } else if (e.isFile() && e.name.endsWith('.pdf')) {
        files.push(full);
      }
    }
  } catch {}
  return files;
}

function getType(filename) {
  const name = filename.replace(/\.pdf$/i, '');
  if (/答案|解析|详解|及答案/.test(name)) return 'answer';
  if (/听力原文|听力/.test(name)) return 'audio';
  return 'paper';
}

function getSet(filename) {
  const m = filename.match(/第(\d)套/);
  return m ? parseInt(m[1]) : 0;
}

async function main() {
  const results = { cet4: {}, cet6: {} };

  for (const [exam, years] of Object.entries(MAP)) {
    console.log(`\n=== ${exam.toUpperCase()} ===`);

    for (const [dirName, { year, month }] of Object.entries(years)) {
      const srcDir = path.join(PDFS, exam, dirName);
      if (!existsSync(srcDir)) {
        console.log(`  SKIP ${dirName} — not found`);
        continue;
      }

      const allPdfs = await findFiles(srcDir);
      console.log(`\n  ${dirName} (${year}.${String(month).padStart(2, '0')}) — ${allPdfs.length} PDFs`);

      // Group by set
      const sets = {};
      for (const f of allPdfs) {
        const set = getSet(path.basename(f));
        const type = getType(path.basename(f));
        const rel = path.relative(path.join(PDFS, exam), f);

        if (!sets[set]) sets[set] = { paper: null, answer: null, audio: null };
        if (type === 'paper' && !sets[set].paper) {
          sets[set].paper = rel;
          // Prefer smaller/reviewable files, skip "扫描版" alternatives if there's a better one
        } else if (type === 'answer' && !sets[set].answer) {
          sets[set].answer = rel;
        } else if (type === 'audio' && !sets[set].audio) {
          sets[set].audio = rel;
        }
      }

      // If set 0 (no set number) and we have numbered sets, skip set 0
      // If set 0 is the only thing, use it as set 1
      const setKeys = Object.keys(sets).map(Number).filter(k => k > 0);
      if (setKeys.length === 0 && sets[0]) {
        // Treat set 0 as a combined/all-in-one file
        const entryKey = `${exam}-${year}-${String(month).padStart(2, '0')}`;
        results[exam][entryKey] = {
          year, month,
          paper: sets[0].paper,
          answer: sets[0].answer,
          audio: sets[0].audio,
          combined: true,
        };
        console.log(`    → Combined file: ${sets[0].paper}`);
      }

      for (const setNum of (setKeys.length > 0 ? setKeys : [])) {
        const s = sets[setNum];
        const entryKey = `${exam}-${year}-${String(month).padStart(2, '0')}-set${setNum}`;
        results[exam][entryKey] = {
          year, month, set: setNum,
          paper: s.paper,
          answer: s.answer,
          audio: s.audio,
        };
        console.log(`    Set ${setNum}: paper=${s.paper?.substring(0,50) || '—'}  answer=${s.answer?.substring(0,50) || '—'}  audio=${s.audio?.substring(0,50) || '—'}`);
      }

      // Also check for the old-style "2022年09月四级真题听力原文.pdf" etc at top level
      for (const f of allPdfs) {
        const base = path.basename(f);
        if (!f.includes('第') && !f.includes('套')) {
          const type = getType(base);
          if (type === 'audio') {
            // Shared transcript for all sets
            const entryKey = `${exam}-${year}-${String(month).padStart(2, '0')}`;
            if (results[exam][entryKey]) {
              results[exam][entryKey].sharedAudio = path.relative(path.join(PDFS, exam), f);
            }
          }
          if (type === 'answer' && /全/.test(base)) {
            const entryKey = `${exam}-${year}-${String(month).padStart(2, '0')}`;
            if (results[exam][entryKey]) {
              results[exam][entryKey].sharedAnswer = path.relative(path.join(PDFS, exam), f);
            } else if (setKeys.length === 0) {
              // This is the only answer
              results[exam][entryKey] = {
                ...results[exam][entryKey],
                answer: path.relative(path.join(PDFS, exam), f),
              };
            }
          }
        }
      }
    }
  }

  // Save the map as JSON for reference
  const mapJson = {};
  for (const [exam, entries] of Object.entries(results)) {
    mapJson[exam] = {};
    for (const [key, val] of Object.entries(entries)) {
      mapJson[exam][key] = val;
    }
  }

  const outPath = path.resolve(__dirname, 'pdf-map.json');
  await writeFile(outPath, JSON.stringify(mapJson, null, 2));
  console.log(`\n\nMap saved to ${outPath}`);
  console.log(`CET-4 entries: ${Object.keys(results.cet4).length}`);
  console.log(`CET-6 entries: ${Object.keys(results.cet6).length}`);
}

main().catch(err => { console.error(err); process.exit(1); });
