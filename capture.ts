import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--trace-warnings']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 640, height: 400 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  await page.screenshot({ path: 'calendar.png' });

  await browser.close();
})();
