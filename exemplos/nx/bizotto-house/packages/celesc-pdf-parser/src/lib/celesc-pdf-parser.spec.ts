import { celescPdfParser } from './celesc-pdf-parser';
import { readPdfFile, parsePdfFile } from './celesc-pdf-parser';
import * as fs from 'fs/promises';

describe('celescPdfParser', () => {
  it('should work', () => {
    expect(celescPdfParser()).toEqual('celesc-pdf-parser');
  });
});

describe('readPdfFile', () => {
  it('should read a pdf file defined', async () => {
    const pdfPath = './src/lib/fatura.pdf';
    const buffer = await fs.readFile(pdfPath);
    expect(buffer).toBeDefined();
  });
  
  it('should have a valid CPF', async () => {
    const pdfPath = './src/lib/fatura.pdf';
    const buffer = await fs.readFile(pdfPath);
    const pdfText = await readPdfFile(buffer);
    const parsedText = await parsePdfFile(pdfText);

    expect(parsedText.costumer.cpf).toEqual('296.436.609-82');
  });
});