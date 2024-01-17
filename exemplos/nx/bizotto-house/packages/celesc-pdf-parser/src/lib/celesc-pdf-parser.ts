import { PdfReader } from "pdfreader";
import { Fatura, TextLine } from "./types";

export function celescPdfParser(): string {
  return 'celesc-pdf-parser';
}

function addTextToLines(textLines: TextLine[], item: TextLine): void {
  const existingLine = textLines.find(({ y }) => y === item.y);
  if (existingLine) {
    existingLine.text += ' ' + item.text;
  } else {
    textLines.push(item);
  }
}

// Read a pdf file
export const readPdfFile = (buffer: Buffer): Promise<TextLine[][]> =>
  new Promise((resolve, reject) => {
    const linesPerPage: TextLine[][] = [];
    let pageNumber = 0;
    new PdfReader({}).parseBuffer(buffer, (err: any, item: any) => {
      if (err) reject(err);
      else if (!item) {
        resolve(linesPerPage);
        console.log('End of file');
      } else if (item.page) {
        pageNumber = item.page - 1;
        linesPerPage[pageNumber] = [];
      } else if (item.text) {
        const textLine: TextLine = { y: item.y, text: item.text };
        addTextToLines(linesPerPage[pageNumber], textLine);
      }
    });
  });

// Parse a CELESC pdf file
export const parsePdfFile = (text: TextLine[][]): Promise<Fatura> =>
  new Promise((resolve, reject) => {
    const totalPages = text.length;
    const mainPage = text[0];
    // const infoPage = text[1];

    const extractInfo = (regex: RegExp, validator?: RegExp): string => {
      const line = mainPage.find(({ text }) => regex.test(text));
      if (validator) {
        const value = line?.text.match(validator);
        if (value) {
          return value[1];
        }
      } else if (line) {
        return line.text;
      }
      throw new Error('Informação para ' + regex + ' não encontrada ou inválida');
    }

    const extractByY = (y: number): string => {
      const line = mainPage.find(({ y: lineY }) => lineY == y);
      return line ? line.text : '';
    }
    
    const extractFullLocation = (y: number): string[] => {
      const line = mainPage.find(({ y: lineY }) => lineY == y);
      if (line) {
        const location = line.text.split('-');
        if (location.length === 5) {
          // Trim all values
          location.forEach((value, index) => {
            location[index] = value.trim();
          });
          return location;
        }
      }
      throw new Error('Localização não encontrada ou inválida');
    }

    const extractInvoiceData = (y: number): string[] => {
      const line = mainPage.find(({ y: lineY }) => lineY == y);
      if (line) {
        var data_emissao = line.text.match(/EMISSÃO: (\d{2}\/\d{2}\/\d{4})/);
        var ref = line.text.match(/REF.: (\d{2}\/\d{4})/);
        var serie = line.text.match(/SÉRIE ÚNICA: (\S+)/);
        if (data_emissao && ref && serie) {
          return [data_emissao[1], ref[1], serie[1]];
        }

      }
      throw new Error('Dados da fatura não encontrados ou inválidos');
    }

    const extractDate = (y: number): string => {
      const line = mainPage.find(({ y: lineY }) => lineY == y);
      if (line) {
        var vencimento = line.text.match(/(\d{2}\/\d{2}\/\d{4})/);
        
        if (vencimento) {
          return vencimento[0];
        }
      }
      throw new Error('Vencimento não encontrado ou inválido');
    }

    const extractNumber = (y: number): string => {
      const line = mainPage.find(({ y: lineY }) => lineY == y);
      if (line) {
        var numero = line.text.match(/(\d+)/);
        
        if (numero) {
          return numero[0];
        }
      }
      throw new Error('Número não encontrado ou inválido');
    }

    const extractValue = (y: number): string => {
      const line = mainPage.find(({ y: lineY }) => lineY == y);
      if (line) {
        var valor = line.text.match(/(\d+,\d+)/);
        
        if (valor) {
          return valor[0];
        }
      }
      throw new Error('Valor não encontrado ou inválido');
    }

    const fullLocation = extractFullLocation(6.645);
    const invoiceData = extractInvoiceData(3.26);
    

    return resolve({
      totalPages,
      costumer: {
        cpf: extractInfo(/CPF/, /(\d{3}\.\d{3}\.\d{3}-\d{2})/),
        name: extractByY(4.417),
        address: extractByY(5.936) + ' ' + extractByY(6.645),
        city: fullLocation[1],
        state: fullLocation[2],
        zipCode: fullLocation[3] + '-' + fullLocation[4],
      },
      invoice: {
        invoiceDate: invoiceData[0],
        ref: invoiceData[1],
        number: invoiceData[2],
        dueDate: extractDate(4.771),
        previousReading: extractDate(12.137),
        currentReading: extractDate(12.669),
        daysRead: extractNumber(13.732),
        consumption: extractNumber(16.389),
        invoiceValue: extractValue(8.226),
      },
    });
    
  });