import puppeteer from 'puppeteer';
import path from 'path';
import { upload } from '../../api/modules/upload';

export class Receitas {
  async execute(request, response) {
    const {
      mesInicialSelecionado,
      mesFinalSelecionado,
      quebraSelecionada,
      receitaSelecionada,
    } = request.body;

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
    // Selecione a Quebra*
    await page.select('#P3_QUEBRA', quebraSelecionada);
    // Tipo Receita
    await page.select('#P3_TIPO_RECEITA', receitaSelecionada);
    // Botão de Download
    await page.click('#B133250412938450781');

    await page.waitForNavigation({ waitUntil: 'load', timeout: 0 });

    await page._client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: path.resolve('./downloads'),
    });

    await page.click('.download_pdf').then(() => {
      upload('guarulhos');
    });

    return response.status(200);

    // Qnd chamado o "close()", o download não está sendo feito
    // browser.close();

    ///////////// REVER VÍDEO DA TCESP

    // ver vídeo gravado sobre a explicação
    // await page.click('.download_csv');
    // await page.click('.download_etc');
    // await page.click('.download_etc');
  }
}
