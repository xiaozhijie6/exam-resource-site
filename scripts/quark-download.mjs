// Try to download files using the Quark share download API
import puppeteer from 'puppeteer';
import { createWriteStream } from 'fs';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public', 'pdfs');
const SHARE_URL = 'https://pan.quark.cn/s/497af8eb94eb';

async function downloadFile(url, dest, headers = {}) {
  const dir = path.dirname(dest);
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });

  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const req = proto.get(url, { headers, timeout: 60000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400) {
        // Follow redirect
        downloadFile(res.headers.location, dest, headers).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const file = createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
      file.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

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

  let stoken = null;
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('token') && response.request().method() === 'POST') {
      try {
        const ct = response.headers()['content-type'] || '';
        if (ct.includes('json')) {
          const body = await response.json();
          if (body?.data?.stoken) stoken = body.data.stoken;
        }
      } catch {}
    }
  });

  console.log('Loading share page...');
  await page.goto(SHARE_URL, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2000));

  if (!stoken) {
    console.log('Failed to get stoken');
    await browser.close();
    return;
  }
  console.log('stoken:', stoken);

  // Get file listing first
  const detailUrl = `https://drive-h.quark.cn/1/clouddrive/share/sharepage/detail?pr=ucpro&fr=pc&uc_param_str=&ver=2&pwd_id=497af8eb94eb&stok=${encodeURIComponent(stoken)}&pdir_fid=0&force=0&_page=1&_size=200&_fetch_banner=0&_fetch_share=0&_fetch_total=1&_sort=file_type:asc,file_name:asc`;

  const rootData = await page.evaluate(async (url) => {
    const res = await fetch(url, { credentials: 'include' });
    return res.json();
  }, detailUrl);

  const topItems = rootData?.data?.list || [];
  console.log(`\nTop-level items: ${topItems.length}`);

  for (const item of topItems) {
    console.log(`\n--- ${item.file_name} (fid: ${item.fid}, include_items: ${item.include_items}) ---`);

    // Try the download API for this directory
    const downloadUrl = `https://drive-h.quark.cn/1/clouddrive/share/sharepage/download?pr=ucpro&fr=pc&uc_param_str=&pwd_id=497af8eb94eb&stok=${encodeURIComponent(stoken)}&fid=${item.fid}&share_fid_token=${encodeURIComponent(item.share_fid_token || '')}`;

    console.log('Trying download API...');
    try {
      const dlResult = await page.evaluate(async (url) => {
        const res = await fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fid_list: [],
            pwd_id: '497af8eb94eb',
            stoken: url.match(/stok=([^&]+)/)?.[1] || '',
          })
        });
        return res.json();
      }, downloadUrl);
      console.log('Download API response:', JSON.stringify(dlResult, null, 2).substring(0, 1000));
    } catch (e) {
      console.log('Download API error:', e.message);
    }

    // Try to get file list with different approach - maybe the API needs POST
    const listUrl2 = `https://drive-h.quark.cn/1/clouddrive/share/sharepage/detail?pr=ucpro&fr=pc&uc_param_str=&ver=2&pwd_id=497af8eb94eb&stok=${encodeURIComponent(stoken)}&pdir_fid=${item.fid}&force=1&_page=1&_size=200&_fetch_banner=0&_fetch_share=0&_fetch_total=1&_sort=file_type:asc,file_name:asc`;

    // Re-try with cookies loaded from the page
    const cookies = await page.cookies();
    const cookieStr = cookies.map(c => `${c.name}=${c.value}`).join('; ');
    console.log(`\nTrying with page cookies (${cookies.length} cookies)...`);
    console.log('Cookie string:', cookieStr.substring(0, 200));

    const result = await page.evaluate(async (fetchUrl) => {
      try {
        const res = await fetch(fetchUrl, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'x-request-id': 'web-' + Date.now(),
          }
        });
        const text = await res.text();
        return text.substring(0, 500);
      } catch (e) {
        return 'Error: ' + e.message;
      }
    }, listUrl2);
    console.log('Sub-dir listing result:', result);
  }

  await browser.close();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
