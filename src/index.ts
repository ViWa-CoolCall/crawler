import puppeteer from 'puppeteer';

const userDataDir = 'C:\\temp\\pupeteer_user_data';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'chrome.exe',
    userDataDir: userDataDir,
  });

  const page = await browser.newPage();

  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
