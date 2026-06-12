import puppeteer from 'puppeteer';
import * as path from 'path';
import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SHARE_URL = 'https://pan.quark.cn/s/497af8eb94eb';

// From the captured root listing
const ITEMS = {
  cet4: { fid: 'eb5f0c78fe4340cbb0c517ed78c7971c', token: 'f6a0b32b90784c9eca1e8b0abadcdff5', name: '四级真题' },
  cet6: { fid: 'd8a1a5f7d6d748efac29e6a821c2c8ed', token: '6056241c4f93f1b8ae5aba1cce475eb7', name: '六级真题' },
};

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
    try {
      const ct = response.headers()['content-type'] || '';
      if (ct.includes('json') && url.includes('token') && response.request().method() === 'POST') {
        const body = await response.json();
        if (body?.data?.stoken) stoken = body.data.stoken;
      }
    } catch {}
  });

  console.log('Opening share page...');
  await page.goto(SHARE_URL, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3000));
  console.log('stoken:', stoken);

  const allData = {};

  const fetchDir = async (label, fid, shareFidToken, pageNum = 1) => {
    const url = `https://drive-h.quark.cn/1/clouddrive/share/sharepage/detail?pr=ucpro&fr=pc&uc_param_str=&ver=2&pwd_id=497af8eb94eb&stok=${encodeURIComponent(stoken)}&pdir_fid=${fid}&force=0&_page=${pageNum}&_size=200&_fetch_banner=0&_fetch_share=0&fetch_relate_conversation=0&_fetch_total=1&_sort=file_type:asc,file_name:asc&share_fid_token=${encodeURIComponent(shareFidToken)}`;

    console.log(`\n${label} (page ${pageNum})...`);
    const result = await page.evaluate(async (fetchUrl) => {
      const res = await fetch(fetchUrl, { credentials: 'include' });
      return res.json();
    }, url);

    const list = result?.data?.list || [];
    console.log(`  ${list.length} items`);
    for (const item of list.slice(0, 5)) {
      const icon = item.dir ? '📁' : '📄';
      const size = item.size ? `${(item.size / 1024 / 1024).toFixed(1)}MB` : '';
      console.log(`  ${icon} ${item.file_name} ${size}`);
    }
    if (list.length > 5) console.log(`  ... and ${list.length - 5} more`);

    return result;
  };

  // Try listing CET-4 with share_fid_token
  console.log('\n=== Trying with share_fid_token ===');
  const cet4Result = await fetchDir('CET-4', ITEMS.cet4.fid, ITEMS.cet4.token);
  allData.cet4 = cet4Result;

  // Recursively list subdirectories
  const cet4List = cet4Result?.data?.list || [];
  for (const item of cet4List) {
    if (item.dir && item.share_fid_token) {
      const subResult = await fetchDir(`CET-4/${item.file_name}`, item.fid, item.share_fid_token);
      allData[`cet4.${item.file_name}`] = subResult;

      const subList = subResult?.data?.list || [];
      for (const subItem of subList) {
        if (subItem.dir && subItem.share_fid_token) {
          const subSubResult = await fetchDir(`CET-4/${item.file_name}/${subItem.file_name}`, subItem.fid, subItem.share_fid_token);
          allData[`cet4.${item.file_name}.${subItem.file_name}`] = subSubResult;
        }
      }
    }
  }

  const cet6Result = await fetchDir('CET-6', ITEMS.cet6.fid, ITEMS.cet6.token);
  allData.cet6 = cet6Result;

  const cet6List = cet6Result?.data?.list || [];
  for (const item of cet6List) {
    if (item.dir && item.share_fid_token) {
      const subResult = await fetchDir(`CET-6/${item.file_name}`, item.fid, item.share_fid_token);
      allData[`cet6.${item.file_name}`] = subResult;

      const subList = subResult?.data?.list || [];
      for (const subItem of subList) {
        if (subItem.dir && subItem.share_fid_token) {
          const subSubResult = await fetchDir(`CET-6/${item.file_name}/${subItem.file_name}`, subItem.fid, subItem.share_fid_token);
          allData[`cet6.${item.file_name}.${subItem.file_name}`] = subSubResult;
        }
      }
    }
  }

  await browser.close();

  await writeFile(
    path.resolve(__dirname, 'quark-file-tree.json'),
    JSON.stringify(allData, null, 2)
  );
  console.log('\nSaved to quark-file-tree.json');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
