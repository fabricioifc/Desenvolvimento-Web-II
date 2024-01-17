export interface Fatura {
    totalPages: number;
    costumer: {
        cpf: string;
        name: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
    };
    invoice: {
        number: string; // Número da fatura
        ref: string; // Referência
        dueDate: string; // Vencimento
        previousReading: string; // Leitura anterior
        currentReading: string; // Leitura atual
        daysRead: string; // Dias de leitura
        consumption: string; // Consumo
        invoiceDate: string; // Data da fatura
        invoiceValue: string; // Valor da fatura
    };
}

export interface TextLine {
    y: number;
    text: string;
  }