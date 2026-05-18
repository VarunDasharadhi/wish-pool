let puppeteer;
try { ({ default: puppeteer } = await import('puppeteer')); }
catch { ({ default: puppeteer } = await import('puppeteer-core')); }
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const word = process.argv[2] || 'Housewarming';

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });

await page.evaluate((w) => {
  const ids = ['swapInner'];
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el) { el.textContent = w; el.classList.remove('exit','enter'); el.style.opacity = '1'; el.style.transform = 'none'; }
  }
  // Stop the cycle so the forced word stays
  const highest = setTimeout(() => {}, 0);
  for (let i = 0; i < highest; i++) clearInterval(i);
}, word);

await new Promise(r => setTimeout(r, 400));

const swapBox = await page.evaluate(() => {
  const el = document.getElementById('swapInner');
  const r = el.getBoundingClientRect();
  const headline = document.querySelector('.hero-headline');
  const hRect = headline.getBoundingClientRect();
  return { swapRight: r.right, swapLeft: r.left, swapWidth: r.width, swapHeight: r.height, headlineRight: hRect.right, headlineLeft: hRect.left, headlineWidth: hRect.width, vw: window.innerWidth };
});
console.log('Box:', JSON.stringify(swapBox));

const out = join(__dirname, 'temporary screenshots', `verify-${word}.png`);
await page.screenshot({ path: out, fullPage: false });
console.log('Saved:', out);
await browser.close();
