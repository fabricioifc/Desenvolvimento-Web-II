const express = require('express');
const soap = require('soap');
const app = express();
const calcular = require('./util');


// Defina o serviço SOAP
const service = {
    MDCService: {
        MDCPort: {
            CalculateMDC: function(args) {
                console.log(args);
                    
                const x = parseInt(args.x);
                const y = parseInt(args.y);
                const mdc = calcular(x, y);
                return {
                    MDC: mdc
                }
            }
        }
    }
};

app.get('/mdc?wsdl', (req, res) => {
    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(wsdl);
})

const server = app.listen(3000, () => {
    console.log('Server is running on port', server.address().port);
})

const wsdl = require('fs').readFileSync('src/resources/mdc.wsdl', 'utf8');
soap.listen(server, '/mdc', service, wsdl);