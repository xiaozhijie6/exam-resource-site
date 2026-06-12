import puppeteer from 'puppeteer';
import { existsSync, mkdirSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public', 'pdfs');
const SHARE_URL = 'https://pan.quark.cn/s/497af8eb94eb';

// Ensure dirs exist
[path.join(PUBLIC_DIR, 'cet4'), path.join(PUBLIC_DIR, 'cet6')].forEach(d => {
  if (!existsSync(d)) mkdirSync(d, { recursive: true });
});

async function main() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
  );

  // Intercept API responses
  const apiResponses = [];
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('share') || url.includes('clouddrive')) {
      try {
        const ct = response.headers()['content-type'] || '';
        if (ct.includes('json')) {
          const body = await response.json();
          apiResponses.push({ url, body });
          console.log('  JSON response:', url.substring(0, 100));
        }
      } catch {}
    }
  });

  page.on('request', (request) => {
    const url = request.url();
    if (url.includes('share') || url.includes('clouddrive')) {
      console.log('  Request:', request.method(), url.substring(0, 120));
    }
  });

  console.log('Opening share page...');
  await page.goto(SHARE_URL, { waitUntil: 'networkidle2', timeout: 60000 });

  // Wait for async data loading
  await new Promise(r => setTimeout(r, 5000));

  // Screenshot
  await page.screenshot({ path: path.resolve(__dirname, 'quark-page.png'), fullPage: false });
  console.log('Screenshot saved.');

  // Print captured API responses (truncated)
  console.log('\n=== Captured API Responses ===');
  for (const r of apiResponses) {
    console.log('\nURL:', r.url);
    const str = JSON.stringify(r.body, null, 2);
    console.log(str.substring(0, 5000));
    console.log('...(truncated)' );
  }

  if (apiResponses.length === 0) {
    // Try to extract from page
    console.log('\nNo API responses captured. Trying page context...');
    const pageInfo = await page.evaluate(() => {
      const keys = Object.keys(window).filter(k =>
        k.startsWith('__') || k.includes('data') || k.includes('state') || k.includes('config')
      );
      return { keys, url: location.href, title: document.title };
    });
    console.log('Page info:', JSON.stringify(pageInfo, null, 2));
  }

  await browser.close();

  // Save responses
  if (apiResponses.length > 0) {
    await writeFile(
      path.resolve(__dirname, 'quark-api.json'),
      JSON.stringify(apiResponses, null, 2)
    );
    console.log('\nSaved to quark-api.json');
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
