const http = require('http');

const server = http.createServer((req, res) => { // 
    // console.log(req.url + req.method); // req.url -> requestin adresi, req.method -> requestin methodu (get post delete vs)
    if (req.url === '/') { // eğer request'in url adresi /'a eşitse
        res.write('Hello / Sayfasi'); // response'a yaz
        res.end(); // ve bitir
    }
    if (req.url === '/api/products') {
        res.write('Productslar listeleniyor...');
        res.end();
    }
});





// server.on('connection',()=>{ // server objesinin connection eventi tetiklenince ne olacağını yazdık
//     console.log('Yeni bir bağlantı sağlandı!');
// });


server.listen(3000, () => {
    console.log('Server 3000 portunda dinleniyor...');
})