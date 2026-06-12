// 从新疆第二医学院下载四六级真题PDF，重命名保存到 public/pdfs/
import { createWriteStream } from 'fs';
import { mkdir } from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PDF_DIR = path.resolve(ROOT, 'public', 'pdfs');
const BASE = 'https://www.xjsmc.edu.cn';

// 下载映射：{ fileId, 目标文件名, 考试目录, 说明 }
const DOWNLOADS = [
  // === CET-4 ===
  { fid: '11994554', dest: 'cet4/2024-06-paper.pdf', desc: 'CET4 2024年6月 第1套' },
  { fid: '11994549', dest: 'cet4/2023-12-paper.pdf', desc: 'CET4 2023年12月 第1套' },
  { fid: '11994544', dest: 'cet4/2023-06-paper.pdf', desc: 'CET4 2023年6月 第1套' },

  // === CET-6 ===
  { fid: '11994569', dest: 'cet6/2024-06-paper.pdf', desc: 'CET6 2024年6月 第1套' },
  { fid: '11994564', dest: 'cet6/2023-12-paper.pdf', desc: 'CET6 2023年12月 第1套' },
  { fid: '11994559', dest: 'cet6/2023-06-paper.pdf', desc: 'CET6 2023年6月 第1套（备用）' },
];

const REFERER = 'https://www.xjsmc.edu.cn/yywhb/info/1081/1510.htm';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0';

async function downloadFile(fid, destPath, desc) {
  const url = `${BASE}/system/_content/download.jsp?urltype=news.DownloadAttachUrl&owner=1838905640&wbfileid=${fid}`;
  console.log(`\n📥 下载: ${desc}`);
  console.log(`   URL: ${url}`);

  const resp = await fetch(url, {
    headers: { 'Referer': REFERER, 'User-Agent': UA },
  });

  if (!resp.ok) {
    console.log(`   ❌ HTTP ${resp.status}`);
    return null;
  }

  const contentType = resp.headers.get('content-type') || '';
  if (!contentType.includes('pdf') && !contentType.includes('octet-stream')) {
    console.log(`   ⚠️  Content-Type: ${contentType}（可能不是PDF）`);
  }

  const buf = Buffer.from(await resp.arrayBuffer());
  const fullPath = path.resolve(PDF_DIR, destPath);

  // 确保目录存在
  await mkdir(path.dirname(fullPath), { recursive: true });

  // 写入文件
  const stream = createWriteStream(fullPath);
  await new Promise((resolve, reject) => {
    stream.write(buf, (err) => {
      if (err) reject(err);
      else {
        stream.end();
        resolve();
      }
    });
  });

  const sizeKB = (buf.length / 1024).toFixed(1);
  const sizeMB = (buf.length / (1024 * 1024)).toFixed(1);
  const displaySize = buf.length > 1024 * 1024 ? `${sizeMB}MB` : `${sizeKB}KB`;
  console.log(`   ✅ 保存: ${destPath} (${displaySize})`);
  return { path: destPath, size: buf.length };
}

async function main() {
  console.log('🚀 开始下载四六级真题PDF...\n');
  console.log(`   输出目录: ${PDF_DIR}\n`);

  let success = 0, failed = 0;
  const results = [];

  for (const dl of DOWNLOADS) {
    try {
      const result = await downloadFile(dl.fid, dl.dest, dl.desc);
      if (result) {
        success++;
        results.push(result);
      } else {
        failed++;
      }
    } catch (e) {
      console.log(`   ❌ 错误: ${e.message}`);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`\n📊 完成: 成功 ${success} 个, 失败 ${failed} 个`);

  // 列出所有已下载的文件
  console.log('\n📁 public/pdfs/ 目录内容:');
  for (const d of ['cet4', 'cet6', 'kaoyan', 'gongkao']) {
    const fs = await import('fs');
    const dir = path.resolve(PDF_DIR, d);
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.pdf'));
      console.log(`   ${d}/ : ${files.join(', ') || '(空)'}`);
    }
  }

  return { success, failed, results };
}

main().catch(e => {
  console.error('致命错误:', e);
  process.exit(1);
});
