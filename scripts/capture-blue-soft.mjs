import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const storeDir = '/cursor/stores/self/artifacts';
const optDir = '/opt/cursor/artifacts';

const shots = [
  {
    file: 'ui-blue-soft-dict-desktop.png',
    size: '1440,1100',
    url: 'http://127.0.0.1:5173/?tab=dict'
  },
  {
    file: 'ui-blue-soft-dict-mobile.png',
    size: '390,844',
    url: 'http://127.0.0.1:5173/?tab=dict'
  }
];

fs.mkdirSync(storeDir, { recursive: true });
fs.mkdirSync(optDir, { recursive: true });

function runChrome(screenshotPath, url, size) {
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
        `--window-size=${size}`,
        '--virtual-time-budget=12000',
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
      else reject(new Error(`chrome exit ${code}: ${err.slice(-500)}`));
    });
  });
}

for (const shot of shots) {
  const target = path.join(storeDir, shot.file);
  console.log('capturing', shot.file, shot.size);
  await runChrome(target, shot.url, shot.size);
  fs.copyFileSync(target, path.join(optDir, shot.file));
  console.log('ok', shot.file, fs.statSync(target).size, 'bytes');
}

console.log('done');
