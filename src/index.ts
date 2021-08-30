import puppeteer from 'puppeteer';

(async () => {
  const date = new Date();

  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto('https://guarulhos.giap.com.br/apex/pmg/f?p=839:5:::NO:::');

  // await page.screenshot({ path: `images/${date.toLocaleTimeString()}.png` });

  // Selecione o tipo de despesa
  await page.select('#P5_TIPO_DESPESA', 'O');

  // Colunas [ checkboxes ]
  await page.click('#P5_COLUNAS_0', { clickCount: 1 });

  // Selecione a Quebra*
  await page.select('#P5_TIPO_RELATORIO', '2');

  // Selecione a Sub-Quebra*
  await page.select('#P5_SUB_QUEBRA', '1');

  // Selecionar mês inicial
  await page.select('#P5_MES_INICIAL', '1');

  // Selecionar mês final
  await page.select('#P5_MES_FINAL', '3');

  // Tentando navegar p/ outra página
  await page.screenshot({ path: `images/${date.toLocaleTimeString()}.png` });
  Promise.all([page.waitForNavigation(), page.click('#B59474602609746244')]);

  await page.click('.download_pdf');

  await browser.close();
})();
