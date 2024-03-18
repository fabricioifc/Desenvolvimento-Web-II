const soap = require('soap');
const url = 'http://localhost:3000/mdc?wsdl';
const args = { x: 800, y: 600 };

soap.createClient(url, (err, client) => {
    if (err) {
        console.error(err);
    } else {
        client.CalculateMDC(args, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log(result);
            }
        });
    }
});