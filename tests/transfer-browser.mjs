/**
 * 两店调货 — Playwright 浏览器行为证据
 * 覆盖：正常流、越序收货、重复发货/收货、重置；桌面+手机视口；控制台无异常。
 *
 * 运行（需先 npm run dev）：
 *   node tests/transfer-browser.mjs
 */
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ARTIFACT_DIR =
  process.env.TRANSFER_DEMO_ARTIFACT_DIR ||
  path.join(ROOT, 'tests', 'artifacts', 'transfer-demo');
const BASE = process.env.TRANSFER_DEMO_BASE || 'http://127.0.0.1:3000/transfer-demo/';

fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

/**
 * @param {import('playwright').Page} page
 */
async function readCounts(page) {
  return page.evaluate(() => ({
    west: Number(document.getElementById('west-count')?.textContent || NaN),
    transit: Number(document.getElementById('transit-count')?.textContent || NaN),
    east: Number(document.getElementById('east-count')?.textContent || NaN),
    total: Number(document.getElementById('total-count')?.textContent || NaN),
    status: document.getElementById('ticket-status')?.textContent?.trim() || '',
    feedback: document.getElementById('feedback')?.textContent?.trim() || '',
    shipDisabled: document.getElementById('btn-ship')?.disabled ?? true,
    receiveDisabled: document.getElementById('btn-receive')?.disabled ?? true
  }));
}

/**
 * @param {import('playwright').Browser} browser
 * @param {{ width: number, height: number, name: string }} viewport
 */
async function runScenario(browser, viewport) {
  const consoleErrors = [];
  const page = await browser.newPage({
    viewport: { width: viewport.width, height: viewport.height }
  });
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(String(err)));

  await page.goto(BASE, { waitUntil: 'networkidle' });

  // 入口可读性：关键按钮可见
  await assert.ok(await page.locator('#btn-ship').isVisible());
  await assert.ok(await page.locator('#btn-receive').isVisible());
  await assert.ok(await page.locator('#btn-reset').isVisible());
  await assert.ok(await page.getByText('模拟演示').first().isVisible());

  let c = await readCounts(page);
  assert.deepEqual(
    { west: c.west, transit: c.transit, east: c.east, total: c.total, status: c.status },
    { west: 12, transit: 0, east: 0, total: 12, status: '待发出' }
  );
  assert.equal(c.shipDisabled, false);
  assert.equal(c.receiveDisabled, false);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, `${viewport.name}-01-initial.png`),
    fullPage: true
  });

  // 越序收货：可点，但规则拒绝，库存不变
  await page.locator('#btn-receive').click();
  c = await readCounts(page);
  assert.equal(c.west, 12);
  assert.equal(c.transit, 0);
  assert.equal(c.east, 0);
  assert.equal(c.status, '待发出');
  assert.match(c.feedback, /不能越序收货|尚未发出/);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, `${viewport.name}-01b-reject-receive.png`),
    fullPage: true
  });

  // 正常流：发货
  await page.locator('#btn-ship').click();
  c = await readCounts(page);
  assert.deepEqual(
    { west: c.west, transit: c.transit, east: c.east, total: c.total, status: c.status },
    { west: 6, transit: 6, east: 0, total: 12, status: '已发出' }
  );
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, `${viewport.name}-02-shipped.png`),
    fullPage: true
  });

  // 重复发货：不重复减库存
  await page.locator('#btn-ship').click();
  c = await readCounts(page);
  assert.equal(c.west, 6);
  assert.equal(c.transit, 6);
  assert.equal(c.east, 0);
  assert.match(c.feedback, /不能重复发货|已发出/);

  // 正常流：收货
  await page.locator('#btn-receive').click();
  c = await readCounts(page);
  assert.deepEqual(
    { west: c.west, transit: c.transit, east: c.east, total: c.total, status: c.status },
    { west: 6, transit: 0, east: 6, total: 12, status: '已收货' }
  );
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, `${viewport.name}-03-received.png`),
    fullPage: true
  });

  // 重复收货
  await page.locator('#btn-receive').click();
  c = await readCounts(page);
  assert.equal(c.west, 6);
  assert.equal(c.transit, 0);
  assert.equal(c.east, 6);
  assert.equal(c.status, '已收货');
  assert.match(c.feedback, /不能重复确认|已收货/);

  // 重置
  await page.locator('#btn-reset').click();
  c = await readCounts(page);
  assert.deepEqual(
    { west: c.west, transit: c.transit, east: c.east, total: c.total, status: c.status },
    { west: 12, transit: 0, east: 0, total: 12, status: '待发出' }
  );
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, `${viewport.name}-04-reset.png`),
    fullPage: true
  });

  assert.equal(consoleErrors.length, 0, `控制台异常: ${consoleErrors.join(' | ')}`);
  await page.close();
  return { viewport: viewport.name, consoleErrors: consoleErrors.length };
}

async function main() {
  // 额外：未发货时用 JS 直接触发逻辑层拒绝文案（按钮禁用之外的证据）
  // 浏览器场景以上述点击为准。

  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined
  });

  const results = [];
  try {
    results.push(await runScenario(browser, { width: 1280, height: 800, name: 'desktop' }));
    results.push(await runScenario(browser, { width: 390, height: 844, name: 'mobile' }));
  } finally {
    await browser.close();
  }

  const summary = {
    ok: true,
    base: BASE,
    artifactDir: ARTIFACT_DIR,
    results
  };
  const summaryPath = path.join(ARTIFACT_DIR, 'browser-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
