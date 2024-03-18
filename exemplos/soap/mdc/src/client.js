const soap = require('soap');
const wsdl = 'http://localhost:3000/mdc?wsdl';
const args = { x: 1920, y: 1080 };

soap.createClient(wsdl, (err, client) => {
  if (err) throw err;
  client.CalculateMDC(args, (err, result) => {
    if (err) throw err;
    console.log('MDC:', result.MDC);
    console.log('Com essa informação, vamos calcular o Aspect Ratio da imagem');
    const aspectRatio = `${args.x / result.MDC}:${args.y / result.MDC}`;
    console.log('Aspect Ratio:', aspectRatio);
  });
});

// const soap = require('soap');
// const express = require('express');

// const wsdl = 'http://www.dneonline.com/calculator.asmx?WSDL';

// const args = { intA: 2, intB: 3 };

// soap.createClient(wsdl, (err, client) => {
//   if (err) throw err;
//   client.Add(args, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });
// });
