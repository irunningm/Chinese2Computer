import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = '/opt/cursor/artifacts';
const storeDir = '/cursor/stores/bc-1329ebac-b4f4-411b-9ae0-537c19f166c2/artifacts';

const palettes = [
  { id: 'magazine-bold', file: 'style-magazine-bold.png' },
  { id: 'poster-bold', file: 'style-poster-bold.png' }
];

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(storeDir, { recursive: true });

function runChrome(screenshotPath, url) {
  return new Promise((resolve, reject) => {
    const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'wenxin-chrome-'));
    const child = spawn(
      'google-chrome',
      [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--hide-scrollbars',
        `--user-data-dir=${profile}`,
        '--force-device-scale-factor=1',
        '--window-size=1280,900',
        '--virtual-time-budget=8000',
        `--screenshot=${screenshotPath}`,
        url
      ],
      { stdio: ['ignore', 'pipe', 'pipe'] }
    );
    let err = '';
    child.stderr.on('data', (d) => {
      err += d.toString();
    });
    child.on('close', (code) => {
      fs.rmSync(profile, { recursive: true, force: true });
      if (code === 0 && fs.existsSync(screenshotPath)) resolve();
      else reject(new Error(`chrome exit ${code}: ${err.slice(-400)}`));
    });
  });
}

for (const p of palettes) {
  const target = path.join(outDir, p.file);
  const url = `http://127.0.0.1:3000/?tab=dict&palette=${p.id}`;
  console.log('capturing', p.id, '→', target);
  await runChrome(target, url);
  try {
    fs.copyFileSync(target, path.join(storeDir, p.file));
  } catch (e) {
    if (e?.code !== 'EXDEV' && !String(e?.message || e).includes('same file')) throw e;
  }
  console.log('ok', p.file, fs.statSync(target).size, 'bytes');
}

console.log('done');
