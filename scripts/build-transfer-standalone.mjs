/**
 * 导出两店调货演示为自包含单文件 HTML（可 file:// 打开，无 CDN / 无模块加载）。
 *
 * 用法：
 *   node scripts/build-transfer-standalone.mjs
 *   node scripts/build-transfer-standalone.mjs --out /path/to/transfer-demo-standalone.html
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DEMO = path.join(ROOT, 'transfer-demo');

const DEFAULT_OUT = path.join(DEMO, 'transfer-demo-standalone.html');

function read(rel) {
  return fs.readFileSync(path.join(DEMO, rel), 'utf8');
}

function stripModuleSyntax(logicSrc, appSrc) {
  const logic = logicSrc
    .replace(/^export\s+/gm, '')
    .replace(/default:\s*\{\s*const _exhaustive = \/\*\* @type \{never\} \*\/ \((\w+)\);\s*return _exhaustive;\s*\}/g, 'default: return String($1);');

  const app = appSrc
    .replace(/^import\s*\{[\s\S]*?\}\s*from\s*['"]\.\/logic\.js['"];\s*/m, '')
    .replace(/\/\*\*\s*@type\s*\{import\('\.\/logic\.js'\)\.TransferState\}\s*\*\//, '')
    .replace(
      /setLesson\(\/\*\*\s*@type\s*\{'rules' \| 'state' \| 'impl' \| 'verify'\}\s*\*\/\s*\(key\)\)/g,
      'setLesson(key)'
    )
    .replace(
      /default:\s*\{\s*const _exhaustive = \/\*\* @type \{never\} \*\/ \(([^)]+)\);\s*void _exhaustive;\s*\}/g,
      'default: break;'
    );

  return `${logic}\n${app}\n`;
}

function buildHtml({ css, bodyInner, script }) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <title>两店调货小样 · 模拟演示 — 文心雕码（自包含离线版）</title>
  <meta name="description" content="模拟演示：西店与东店调货，理解规则、状态、实现与验收。非真实门店系统。可 file:// 离线打开。" />
  <style>
${css}
  </style>
</head>
<body>
${bodyInner}
  <script>
(function () {
'use strict';
${script}
})();
  </script>
</body>
</html>
`;
}

function main() {
  const outArgIdx = process.argv.indexOf('--out');
  const outPath =
    outArgIdx >= 0 && process.argv[outArgIdx + 1]
      ? path.resolve(process.argv[outArgIdx + 1])
      : DEFAULT_OUT;

  const css = read('styles.css');
  const indexHtml = read('index.html');
  const logicSrc = read('logic.js');
  const appSrc = read('app.js');

  const bodyMatch = indexHtml.match(/<body>([\s\S]*)<\/body>/i);
  if (!bodyMatch) throw new Error('无法从 index.html 解析 body');

  let bodyInner = bodyMatch[1]
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(
      /<a class="back-link" href="\.\.\/index\.html">← 返回文心雕码首页<\/a>/,
      '<span class="back-link" style="cursor:default;color:var(--ink-muted);">文心雕码 · 自包含离线版（可 file:// 打开）</span>'
    )
    .trim();

  // 再强调一次模拟声明（页顶已有角标，此处加离线提示不影响交互）
  if (!bodyInner.includes('自包含离线版')) {
    bodyInner = bodyInner.replace(
      '<span class="sim-badge"',
      '<span class="sim-badge" title="offline"'
    );
  }

  const script = stripModuleSyntax(logicSrc, appSrc);
  const html = buildHtml({ css, bodyInner, script });

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(JSON.stringify({ ok: true, outPath, bytes: Buffer.byteLength(html, 'utf8') }));
}

main();
