import puppeteer from 'puppeteer';
import * as path from 'path';
import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SHARE_URL = 'https://pan.quark.cn/s/497af8eb94eb';

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
  );

  // Log ALL API requests
  const allApiCalls = [];
  page.on('request', (request) => {
    const url = request.url();
    if (url.includes('quark') || url.includes('clouddrive') || url.includes('album')) {
      allApiCalls.push({ method: request.method(), url, postData: request.postData() });
      console.log(`REQ ${request.method()} ${url.substring(0, 150)}`);
    }
  });

  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('/detail') || url.includes('/list') || url.includes('/sort')) {
      try {
        const ct = response.headers()['content-type'] || '';
        if (ct.includes('json')) {
          const body = await response.json();
          const listLen = body?.data?.list?.length || 0;
          console.log(`RES ${response.status()} ${url.substring(0, 120)} list=${listLen}`);
          if (listLen > 0) {
            console.log('  Files:', body.data.list.slice(0,5).map(i => i.file_name).join(', '));
          }
        }
      } catch {}
    }
  });

  console.log('=== Loading share page ===');
  await page.goto(SHARE_URL, { waitUntil: 'networkidle2', timeout: 60000 });

  // Wait and see what renders
  await new Promise(r => setTimeout(r, 3000));

  // Take full-page screenshot
  await page.screenshot({ path: path.resolve(__dirname, 'quark-share.png'), fullPage: true });
  console.log('Screenshot saved');

  // Get page content - look for file/folder elements
  const pageContent = await page.evaluate(() => {
    // Find clickable elements that might be folders
    const links = [...document.querySelectorAll('a, [role="button"], .folder, .file-item, [class*="folder"], [class*="file"]')];
    return {
      title: document.title,
      bodyText: document.body.innerText.substring(0, 2000),
      clickableCount: links.length,
      someClasses: links.slice(0, 10).map(el => ({ tag: el.tagName, class: el.className?.substring?.(0, 80), text: el.textContent?.substring?.(0, 50) })),
    };
  });
  console.log('\nPage content:');
  console.log('Title:', pageContent.title);
  console.log('Clickable elements:', pageContent.clickableCount);
  console.log('Sample elements:', JSON.stringify(pageContent.someClasses, null, 2));
  console.log('\nBody text (first 2000 chars):');
  console.log(pageContent.bodyText);

  // Try clicking on the CET-4 directory
  console.log('\n=== Trying to click CET-4 folder ===');
  const clicked = await page.evaluate(() => {
    // Find elements that contain "四级"
    const allElements = [...document.querySelectorAll('*')];
    const cet4Els = allElements.filter(el =>
      el.textContent?.includes('四级') && el.children.length === 0
    );
    return cet4Els.map(el => ({ tag: el.tagName, class: el.className?.substring?.(0,80), text: el.textContent?.substring?.(0,60) }));
  });
  console.log('Elements containing 四级:', JSON.stringify(clicked.slice(0, 10), null, 2));

  // Wait more and check if any new API calls
  await new Promise(r => setTimeout(r, 2000));

  // Check if there were detail calls for subdirectories
  const detailCalls = allApiCalls.filter(c => c.url.includes('/detail'));
  console.log(`\nTotal detail API calls: ${detailCalls.length}`);
  detailCalls.forEach(c => console.log(`  ${c.url.substring(0, 150)}`));

  await browser.close();

  // Save all API calls
  await writeFile(path.resolve(__dirname, 'quark-api-calls.json'), JSON.stringify(allApiCalls, null, 2));
  console.log('\nAll API calls saved');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
