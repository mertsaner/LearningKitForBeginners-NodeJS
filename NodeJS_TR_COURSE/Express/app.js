const express = require('express');
const app = express();
const body_parser = require('body-parser'); // npm install body-parser
const admin_route = require('./routes/admin'); // admin route modülümüzü dahil ettik
const user_route = require('./routes/user');
const path = require('path');
app.get('/api', (req, res) => { // req(request) & res(response) parametreleriyle bir callback func alır.
    res.send('<h3>Anasayfa</h3>');
});
app.get('/api/products/', (req, res) => {
    res.send('<h3>Ürünler</h3>'); // response'a send func ile bir cevap dönüyoruz
});
app.get('/api/products/:name', (req, res) => {
    let product_name = req.params.name; // req.params ile istekteki parametreleri yakalıyoruz
    res.send(`${product_name} isimli ürün sayfası...`);
});
app.get('/api/products/detail/:name/:stock/:code', (req, res) => {
    let prod = {
        'name': req.params.name,
        'stock': req.params.stock,
        'code': req.params.code
    }
    res.send(`<h1>Adı = ${prod.name}</h1><br><h3>Stok = ${prod.stock}</h3><br><h3>Kod = ${prod.code}</h3>`)
});


app.use(body_parser.urlencoded({ extended: false })); // body parser kullanabilmemiz için middleware'a eklememiz gerekli
app.use('/admin', admin_route); // adminroute'dan gelen tüm route'lara admin ön eki eklenmiş olacak
app.use(user_route);
app.use((req, res) => { // yukardaki routelar çalışmazsa
    // res.status(404); // hata kodunu belirttik
    // res.send("<h1><i>404</i> Page not Found!</h1>");
    //res.status(404).send("<h1><i>404</i> Page not Found!</h1>");// bu şekilde de kullanabiliriz
    res.sendFile(path.join(__dirname + "/views/404.html"));
});

app.listen(3000, () => { // 3000 portu üzerinde dinleme
    console.log('Uygulama 3000 portunda başlatıldı...');
});