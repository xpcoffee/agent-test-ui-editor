import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`Browser console error: ${msg.text()}`);
    }
  });

  await page.goto('http://localhost:5174', { waitUntil: 'networkidle2' });

  await page.screenshot({ path: 'screenshot.png' });

  await browser.close();
})();
