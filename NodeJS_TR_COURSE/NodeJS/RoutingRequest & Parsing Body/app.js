const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method; // method değişkenine reques'in methodunu atadık. aşağılarda çok işimize yarayacak.
    if (url === '/') { // eğer url anasayfa ise
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.end('Index dosyasi okunamadıi hata var!');
            } else {
                return res.end(data);
            }
        });
    }
    if (url === '/log' && method === 'POST') { // eğer url /log ise ve method POST ise
        // body parsing
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
            console.log(chunk);
        });
        req.on('end', () => {
            const bodyParsed = Buffer.concat(body).toString();
            const message = bodyParsed.split('=')[1];
            fs.appendFileSync('message.txt', message); // arkada dosyaya loglama benzeri bir şey yaptık

        });

        res.statusCode = 302;
        res.setHeader('Location', '/'); // ve tekrar geri ana sayfaya yönlendirdik
        return res.end();
    }
});


server.listen(3000, () => {
    console.log('Server 3000 portunda dinlenmeye başladı!');
})