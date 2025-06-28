import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('pageerror', error => {
    console.log(`Uncaught page error: ${error.message}`);
  });

  await page.goto('http://localhost:5174', { waitUntil: 'networkidle2' });

  await browser.close();
})();