// Screenshot utility — Usage: node screenshot.mjs http://localhost:3000 [label]
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';

async function run() {
  const dir = join(__dirname, 'temporary screenshots');
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });

  let n = 1;
  while (existsSync(join(dir, `screenshot-${n}${label}.png`))) n++;
  const out = join(dir, `screenshot-${n}${label}.png`);

  let puppeteer;
  try {
    ({ default: puppeteer } = await import('puppeteer'));
  } catch {
    try {
      ({ default: puppeteer } = await import('puppeteer-core'));
    } catch {
      console.error('puppeteer not found. Run: npm install puppeteer');
      process.exit(1);
    }
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: out, fullPage: false });
  await browser.close();

  console.log(`Screenshot saved: ${out}`);
}

run().catch(e => { console.error(e.message); process.exit(1); });
