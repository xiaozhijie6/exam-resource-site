// Quick screenshot script using Puppeteer
import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = path.resolve(__dirname, '..', 'screenshots');

const PAGES = [
  { name: 'homepage', url: 'http://localhost:5173' },
  { name: 'exam-cet4', url: 'http://localhost:5173/exam/cet4' },
  { name: 'contact', url: 'http://localhost:5173/contact' },
];

async function main() {
  if (!existsSync(SCREENSHOTS_DIR)) {
    await mkdir(SCREENSHOTS_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const pageInfo of PAGES) {
    console.log(`Taking screenshot: ${pageInfo.name} (${pageInfo.url})`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(pageInfo.url, { waitUntil: 'networkidle0', timeout: 30000 });
    // Scroll to ensure lazy content loads
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= document.body.scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 500));

    const outPath = path.join(SCREENSHOTS_DIR, pageInfo.name + '.png');
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`  Saved: ${outPath}`);
    await page.close();
  }

  await browser.close();
  console.log('\nDone! All screenshots saved to screenshots/');
}

main().catch(err => { console.error(err); process.exit(1); });
