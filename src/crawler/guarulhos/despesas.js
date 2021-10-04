import puppeteer from 'puppeteer';
import path from 'path';

export class Despesas {
  async execute(request, response) {
    const {} = request.body;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      'https://guarulhos.giap.com.br/apex/pmg/f?p=839:5:::NO:::',
      { waitUntil: 'networkidle2' }
    );

    // Selecione o Tipo de Despesa
    await page.select('#P5_TIPO_DESPESA', 'R');

    // Colunas [ checkboxes ]
    await page.click('#P5_COLUNAS_0', { clickCount: 1 });

    // Selecione a Quebra
    await page.select('#P5_TIPO_RELATORIO', '1');

    // Selecione a Sub-Quebra
    await page.select('#P5_SUB_QUEBRA', '1');

    // Selecionar mês inicial
    await page.select('#P5_MES_INICIAL', '2');

    // Selecionar mês final
    await page.select('#P5_MES_FINAL', '4');

    // Botão de Pesquisar
    await page.click('#B59474602609746244');

    await page.waitForNavigation({ waitUntil: 'load', timeout: 0 });

    await page._client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: path.resolve('./downloads/guarulhos/despesas'),
    });

    await page.click('.download_pdf');
    await page.evaluate("exportTableToCSV('relatorio.csv')");
    await page.evaluate("exportTableToCSV('relatorio.ods')");
    await page.evaluate("exportTableToCSV('relatorio.odt')");
    await page.evaluate("exportTableToCSV('relatorio.odf')");
    await page.evaluate("exportTableToCSV('relatorio.txt')");
  }
}
