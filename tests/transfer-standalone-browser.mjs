/**
 * 自包含 HTML · file:// 离线点按验收
 * 运行：node tests/transfer-standalone-browser.mjs
 */
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const HTML_PATH =
  process.env.TRANSFER_STANDALONE_HTML ||
  path.join(
    '/cursor/stores/bc-1329ebac-b4f4-411b-9ae0-537c19f166c2/media/transfer-demo',
    'transfer-demo-standalone.html'
  );

const ARTIFACT_DIR =
  process.env.TRANSFER_STANDALONE_ARTIFACT_DIR ||
  path.join(
    '/cursor/stores/bc-1329ebac-b4f4-411b-9ae0-537c19f166c2/media/transfer-demo',
    'standalone-verify'
  );

async function readCounts(page) {
  return page.evaluate(() => ({
    west: Number(document.getElementById('west-count')?.textContent || NaN),
    transit: Number(document.getElementById('transit-count')?.textContent || NaN),
    east: Number(document.getElementById('east-count')?.textContent || NaN),
    total: Number(document.getElementById('total-count')?.textContent || NaN),
    status: document.getElementById('ticket-status')?.textContent?.trim() || '',
    feedback: document.getElementById('feedback')?.textContent?.trim() || ''
  }));
}

async function main() {
  assert.ok(fs.existsSync(HTML_PATH), `缺少 standalone 文件: ${HTML_PATH}`);
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

  const fileUrl = pathToFileURL(HTML_PATH).href;
  const consoleErrors = [];
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(String(err)));

  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  assert.ok(await page.getByText('模拟演示').first().isVisible());
  assert.ok(await page.getByText('自包含离线版').first().isVisible());

  let c = await readCounts(page);
  assert.deepEqual(
    { west: c.west, transit: c.transit, east: c.east, total: c.total, status: c.status },
    { west: 12, transit: 0, east: 0, total: 12, status: '待发出' }
  );
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'file-01-initial.png'),
    fullPage: true
  });

  // 越序
  await page.locator('#btn-receive').click();
  c = await readCounts(page);
  assert.equal(c.west, 12);
  assert.equal(c.east, 0);
  assert.match(c.feedback, /不能越序收货|尚未发出/);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'file-02-reject-receive.png'),
    fullPage: true
  });

  // 发货
  await page.locator('#btn-ship').click();
  c = await readCounts(page);
  assert.deepEqual(
    { west: c.west, transit: c.transit, east: c.east, total: c.total, status: c.status },
    { west: 6, transit: 6, east: 0, total: 12, status: '已发出' }
  );
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'file-03-shipped.png'),
    fullPage: true
  });

  // 重复发货
  await page.locator('#btn-ship').click();
  c = await readCounts(page);
  assert.equal(c.west, 6);
  assert.equal(c.transit, 6);
  assert.match(c.feedback, /不能重复发货|已发出/);

  // 收货
  await page.locator('#btn-receive').click();
  c = await readCounts(page);
  assert.deepEqual(
    { west: c.west, transit: c.transit, east: c.east, total: c.total, status: c.status },
    { west: 6, transit: 0, east: 6, total: 12, status: '已收货' }
  );
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'file-04-received.png'),
    fullPage: true
  });

  // 重复收货
  await page.locator('#btn-receive').click();
  c = await readCounts(page);
  assert.equal(c.east, 6);
  assert.match(c.feedback, /不能重复确认|已收货/);

  // 重置
  await page.locator('#btn-reset').click();
  c = await readCounts(page);
  assert.deepEqual(
    { west: c.west, transit: c.transit, east: c.east, total: c.total, status: c.status },
    { west: 12, transit: 0, east: 0, total: 12, status: '待发出' }
  );
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'file-05-reset.png'),
    fullPage: true
  });

  // 手机视口再扫一眼
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'file-mobile-shipped-flow.png'),
    fullPage: true
  });

  assert.equal(consoleErrors.length, 0, `控制台异常: ${consoleErrors.join(' | ')}`);
  await browser.close();

  const summary = {
    ok: true,
    mode: 'file://',
    htmlPath: HTML_PATH,
    fileUrl,
    artifactDir: ARTIFACT_DIR,
    consoleErrors: 0
  };
  fs.writeFileSync(
    path.join(ARTIFACT_DIR, 'standalone-file-verify.json'),
    JSON.stringify(summary, null, 2)
  );
  // 同步一份到父目录便于发现
  fs.writeFileSync(
    path.join(path.dirname(HTML_PATH), 'STANDALONE-VERIFY.md'),
    [
      '# 自包含 HTML · file:// 验证',
      '',
      `- HTML：\`${HTML_PATH}\``,
      `- 打开方式：用浏览器打开该文件（file://），无需 npm / 无需联网 CDN`,
      `- 结果：正常发货/收货、越序拒绝、重复拒绝、重置 — **全部通过**；控制台错误 0`,
      `- 截图目录：\`${ARTIFACT_DIR}\``,
      ''
    ].join('\n')
  );
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
