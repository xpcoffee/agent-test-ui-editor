import puppeteer from 'puppeteer';
import assert from 'assert';
import http from 'http';

async function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const checkServer = () => {
      http.get(url, (res) => {
        if (res.statusCode === 200) {
          resolve();
        } else {
          if (Date.now() - start > timeout) {
            reject(new Error(`Server at ${url} did not become available within ${timeout}ms. Status: ${res.statusCode}`));
          } else {
            setTimeout(checkServer, 1000);
          }
        }
      }).on('error', (err) => {
        if (Date.now() - start > timeout) {
          reject(new Error(`Server at ${url} did not become available within ${timeout}ms. Error: ${err.message}`));
        } else {
          setTimeout(checkServer, 1000);
        }
      });
    };
    checkServer();
  });
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    console.log('Waiting for the server to be ready...');
    await waitForServer('http://localhost:5173');
    console.log('Navigating to the landing page...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

    console.log('Clicking "New Page" button...');
    await page.waitForSelector('button[aria-label="New Page"]');
    await page.click('button[aria-label="New Page"]');

    console.log('Creating a new page...');
    await page.waitForSelector('input[type="text"]');
    await page.type('input[type="text"]', 'Test Page');

    await page.waitForSelector('#paragraph-0');
    await page.evaluate(() => {
        const textarea = document.querySelector('#paragraph-0');
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
        nativeInputValueSetter.call(textarea, 'This is a test paragraph.');
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.dispatchEvent(new Event('change', { bubbles: true }));
    });

    await page.click('button.bg-green-500'); // Add paragraph

    await page.waitForSelector('#paragraph-1');
    await page.evaluate(() => {
        const textarea = document.querySelector('#paragraph-1');
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
        nativeInputValueSetter.call(textarea, 'This is another test paragraph.');
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.dispatchEvent(new Event('change', { bubbles: true }));
    });

    console.log('Page HTML after typing textareas:', await page.content());

    await page.click('button.bg-blue-500'); // Save

    console.log('Viewing the new page...');
    await page.waitForSelector('a[href^="/pages/"]');
    await page.click('a[href^="/pages/"]');

    console.log('Verifying page content...');
    await new Promise(resolve => setTimeout(resolve, 500)); // Add a delay before assertion
    await page.waitForSelector('h1');
    const title = await page.$eval('h1', el => el.textContent);
    assert.strictEqual(title, 'Test Page', 'Page title is incorrect');
    const paragraphs = await page.$$eval('p', els => els.map(el => el.textContent));
    assert.deepStrictEqual(paragraphs, ['This is a test paragraph.', 'This is another test paragraph.'], 'Page content is incorrect');

    console.log('Navigating back to the landing page...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

    console.log('Deleting the page...');
    await page.waitForSelector('button.bg-red-500');
    await page.click('button.bg-red-500');

    console.log('Verifying page deletion...');
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait for deletion to complete
    const links = await page.$$('a[href^="/pages/"]');
    assert.strictEqual(links.length, 0, 'Page was not deleted');

    console.log('E2E test passed!');
  } catch (error) {
    console.error('E2E test failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
