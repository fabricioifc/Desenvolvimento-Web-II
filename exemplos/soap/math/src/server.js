const express = require('express');
const soap = require('soap');
const app = express();
const port = 3000;
const wsdl = require('fs').readFileSync('mdc.wsdl', 'utf8');

function calcularMDC(num1, num2) {
    // Validar se os números são inteiros
    if (!Number.isInteger(num1) || !Number.isInteger(num2)) {
      throw new Error("Os números informados devem ser inteiros");
    }
  
    // Implementar o algoritmo de Euclides
    while (num2 != 0) {
      let resto = num1 % num2;
      num1 = num2;
      num2 = resto;
    }
  
    // Retornar o MDC
    return num1;
  }

const service = {
    MDCService: {
        MDCPort: {
            CalculateMDC: async function (args) {
                console.log('CalculateMDC', args);
                const { x, y } = args;
                const result = calcularMDC(x, y);
                return { result: result };
            }
        }
    }
};

// app.use(express.static(__dirname));

app.listen(port, () => {
    soap.listen(app, '/mdc', service, wsdl);
    console.log(`Server is running on port ${port}`);
});