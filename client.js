const tls = require('tls');
const fs = require('fs');

const PORT = 8000;
const HOST = 'localhost';


const testJSON = {f:'fibo',args: 5};


const options = {
    ca: [ fs.readFileSync('server-cert.pem') ]
};

var client = tls.connect(PORT, HOST, options, (socket) => {
    console.log('client connected',
        client.authorized ? 'authorized' : 'unauthorized');
    process.stdin.pipe(client);
    process.stdin.resume();
});
client.setEncoding('utf8');



client.on('data', (data) => {
    console.log(data);
});

client.on('end', () => {
    console.log('Ended')
});


client.write(JSON.stringify(testJSON));