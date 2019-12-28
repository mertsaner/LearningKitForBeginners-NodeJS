const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    /*
        res.setHeader('Content-Type', 'text/plain'); // response'a text döndüreceğiz dedik.
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMessage = 'Ok';
        res.write('Hello World');
        res.end();
    */
    fs.readFile('index.html', (err, data) => { // index.html içeriğini okuduk
        if (err) { // hata varsa
            res.end('Hata var index sayfası yüklenemiyor!');
        }else{ // hata yoksa okuduğumuz data değerini send ettik
            res.end(data);
        }
    });

});

server.listen(3000, () => {
    console.log('Server 3000 portunda dinleniyor...!');
});