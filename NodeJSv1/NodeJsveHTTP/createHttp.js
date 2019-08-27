const http = require("http");
const fs = require('fs');
const server = http.createServer((request, response) => {
    response.writeHead(200, { 'content-type': 'text/html; charset=UTF-8' }) // türkçe karakter konfigürasyonu
    // console.log("Bir istekte bulunuldu!");
    // console.log(request.headers);
    // response.write("<b>merhaba</b>dünya"); // response.write -> döndüreceğimiz değer. İçine html etiketleri alabilir
    // response.end();
    // HTML DOSYASINI SERVE ETMEK
    if (request.method === "GET") { // eğer request methodu get'se
        if (request.url === '/') { // eğer url / ise
            fs.readFile('index.html', (err, data) => { // index sayfasını döndür
                if (err) {
                    throw err;
                }
                response.end(data);
            })
        } else if (request.url === '/hakkimizda') { // eğer url /hakkimizda ise
            fs.readFile('about.html', (err, data) => { // about sayfasını döndür
                if (err) {
                    throw err;
                }
                response.end(data);
            })
        } else {
            fs.readFile('notFound.html', (err, data) => { // eğer yukardaki ikisinden biri değilse notFound sayfasını döndür
                if (err) {
                    throw err;
                }
                response.end(data);
            })
        }
        
        
    }

});
server.listen(8080); // oluşturduğumuz server'i 8080 portunda dinle

/*
HTTP METODLARI
GET    -> siteye giriş, tıklama, farklı sayfalara geçme vs..
POST   -> kayıt ol login vs..
PUT    -> güncelleme işleminde vs..
DELETE -> silme işleminde vs..
*/