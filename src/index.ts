import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto('https://guarulhos.giap.com.br/apex/pmg/f?p=839:5:::NO:::');

  await page.select('#P5_TIPO_DESPESA', 'R');

  await page.click('#P5_COLUNAS_0', { clickCount: 1 });

  await page.select('#P5_TIPO_RELATORIO', '1');

  await page.select('#P5_SUB_QUEBRA', '1');

  await page.select('#P5_MES_INICIAL', '1');

  await page.select('#P5_MES_FINAL', '3');

  await page.click('#B59474602609746244', { clickCount: 1 });

  await browser.close();
})();
