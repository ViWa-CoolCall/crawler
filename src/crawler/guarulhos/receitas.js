import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

export class Receitas {
  async execute(request, response) {
    const {
      mesInicialSelecionado,
      mesFinalSelecionado,
      quebraSelecionada,
      receitaSelecionada,
    } = request.body;

    const downloadPath = './downloads/guarulhos/receitas';

    fs.rm(path.resolve(downloadPath), { recursive: true }, (error) =>
      console.error(error)
    );

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      'https://guarulhos.giap.com.br/apex/pmg/f?p=839:3:4824956594276:',
      { waitUntil: 'networkidle2' }
    );

    // Selecionar mês inicial
    await page.select('#P3_MES_INICIAL', mesInicialSelecionado);

    // Selecionar mês final
    await page.select('#P3_MES_FINAL', mesFinalSelecionado);

    // Selecione a Quebra
    await page.select('#P3_QUEBRA', quebraSelecionada);

    // Tipo Receita
    await page.select('#P3_TIPO_RECEITA', receitaSelecionada);

    // Botão de Pesquisar
    await page.click('#B133250412938450781');

    await page.waitForNavigation({ waitUntil: 'load', timeout: 0 });

    await page._client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: path.resolve(downloadPath),
    });

    await page.click('.download_pdf');
    await page.evaluate("exportTableToCSV('relatorio.csv')");
    await page.evaluate("exportTableToCSV('relatorio.ods')");
    await page.evaluate("exportTableToCSV('relatorio.odt')");
    await page.evaluate("exportTableToCSV('relatorio.odf')");
    await page.evaluate("exportTableToCSV('relatorio.txt')");

    return response.status(200).send();
  }
}
