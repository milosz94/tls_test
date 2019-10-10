const tls = require('tls');
const fs = require('fs');

const options = {
    key: fs.readFileSync('server-key.pem'),
    cert: fs.readFileSync('server-cert.pem'),
    rejectUnauthorized: false,
};

function fibonacci(num){
    var a = 1, b = 0, temp;

    while (num >= 0){
        temp = a;
        a = a + b;
        b = temp;
        num--;
    }
    return b;
}


const server = tls.createServer(options, (socket) => {
    console.log('server connected',
        socket.authorized ? 'authorized' : 'unauthorized');
    socket.write('Connected to server\n');

    socket.on('data', function(data) {
        console.log('Received ' + data);
        var rdata = JSON.parse(data);
        if(rdata.f !== undefined && rdata.args !== undefined)
        {
            if(rdata.f === 'fibo')
            {
                socket.write("fibonacci number: " + fibonacci(rdata.args));
            }
        }
    });



    socket.setEncoding('utf8');
    socket.pipe(socket);
});
server.listen(8000, () => {
    console.log('server bound');
});
