import puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs';

const SHOTS_DIR = path.resolve('screenshots');
fs.mkdirSync(SHOTS_DIR, { recursive: true });

const BASE = 'http://localhost:5173';

const pages = [
  { name: '01-homepage', url: BASE, desc: '首页 — Hero + 考试入口 + 热门资源' },
  { name: '02-exam-cet4', url: `${BASE}/exam/cet4`, desc: '英语四级 — 左侧筛选面板 + 右侧资源列表' },
  { name: '03-exam-cet6', url: `${BASE}/exam/cet6`, desc: '英语六级 — 考试首页' },
  { name: '04-exam-kaoyan', url: `${BASE}/exam/kaoyan`, desc: '考研 — 考试首页' },
  { name: '05-exam-gongkao', url: `${BASE}/exam/gongkao`, desc: '考公 — 考试首页' },
  { name: '06-papers', url: `${BASE}/exam/cet4/papers`, desc: '四级真题列表页' },
  { name: '07-methods', url: `${BASE}/exam/cet4/methods`, desc: '四级学习方法列表' },
  { name: '08-method-detail', url: `${BASE}/exam/cet4/method/cet4-method-listening`, desc: '学习方法详情 — Markdown渲染' },
  { name: '09-teachers', url: `${BASE}/exam/cet4/teachers`, desc: '四级名师推荐' },
  { name: '10-pricing', url: `${BASE}/exam/cet4/pricing`, desc: '四级收费方案 + 联系方式' },
  { name: '11-contact', url: `${BASE}/contact`, desc: '联系页 — 购买流程 + 微信/QQ' },
  { name: '12-search', url: `${BASE}/search?q=真题`, desc: '搜索结果页' },
  { name: '13-topic', url: `${BASE}/topic/cet4-topic-sprint`, desc: '考前冲刺专题页' },
];

async function main() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const p of pages) {
    console.log(`\n📸 ${p.name}: ${p.desc}`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    try {
      await page.goto(p.url, { waitUntil: 'networkidle2', timeout: 30000 });
      // Extra wait for React hydration
      await new Promise(r => setTimeout(r, 1500));
      await page.screenshot({
        path: path.join(SHOTS_DIR, `${p.name}.png`),
        fullPage: true,
      });
      console.log(`  ✅ saved: screenshots/${p.name}.png`);
    } catch (e) {
      console.log(`  ❌ failed: ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\n✅ All screenshots saved to screenshots/');
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
