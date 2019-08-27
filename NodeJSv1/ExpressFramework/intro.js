const express = require('express'); // express modülü dahil ettik
const app = express(); // app nesnesine express'in constructor'ını atadık
const signIn = require("./routes.js"); // dışarda paketlediğimiz signIn dosyasını aldık
const isLogin = require("./isLogin.js"); // ara katman route'u dahil ettik
app.set('view engine', 'pug'); // bu dosyamızın temasını set ettik pug formatında göndereceğiz dedik
app.use(express.static("cssler")); // static dosyalarımızın nerede olduğunu belirtiyoruz
app.get('/', (req, res) => { // '/' url'e get isteği gelirse, 2 parametre alır callback fonksiyonu -> request ve response
    res.render('index.pug', { name: "enes", surname: "baysan", job: "developer" }); // bu blok çalışsın, render diyerek içeri gönderdiğimiz pug dosyasının açılmasını söyleriz. içeri hangi tema dosyası gelecekse onu veririz(express otomatik olarak views klasörüne gider)
});
app.get('/home', (req, res) => { // '/home' url'e get isteği gelirse, 2 parametre alır callback fonksiyonu -> request ve response
    res.render('home.pug'); // bu blok çalışsın, render diyerek içeri gönderdiğimiz pug dosyasının açılmasını söyleriz. içeri hangi tema dosyası gelecekse onu veririz(express otomatik olarak views klasörüne gider)
});
app.get('/deneme', (req, res) => { // '/' url'e get isteği gelirse, 2 parametre alır callback fonksiyonu -> request ve response
    res.render('static.pug'); // bu blok çalışsın, render diyerek içeri gönderdiğimiz pug dosyasının açılmasını söyleriz. içeri hangi tema dosyası gelecekse onu veririz(express otomatik olarak views klasörüne gider)
});
app.get("/ilet*isim", (req, res) => { // soru işareti şu anlama gelmekte : solundaki t olsada olur olmasa da olur, eğer 2 harf de olmasa olur dersek yada daha fazlası () içine alırız fakat () içine aldığımız harflerden hiç biri olmayacak biri bile olursa hata verir
    res.send("calisti");
});
app.post("/ilet*isim", (req, res) => {
    res.send("iletisim page post method");
});
app.all("/about", (req, res) => { // gelecel her türlü methodu karşılar (all)
    res.send("about page all method");
});
app.get("/users/:id/:postId?", (req, res) => { // ':' sonrasında istediğimiz parametre gelecek. postId? -> bu parametre gelsede olur gelmesede olur.
    res.send(req.params); // req.params -> requestten gelen id'yi döner
});
/*
get post put delete all
? (zorunlu olmayan)
* (yerine herhangi ifade gelebilir)
+ (soldaki ifadenin aynısı olmalı)

*/
// app.use("/user",signIn); -> böyle yapsaydık ön ek olarak /user alacaktı ve /user/signIn altında çalışacaktı
app.use("/", signIn); // app.use diyerek oluşturduğumuz router'ı kullanıyoruz
//ARA KATMAN
app.use("/middleware",(req, res, next) => {  // eğer /middleware kısmını kaldırırsak bütün route'larımız için geçerli olan bir middleware yazmış oluruz.
    const isLogin = false;
    if (isLogin) {
        next(); // eğer yukardaki şart sağlanırsa next() diyerek bir sonraki router'a yönlendirme yapıyoruz.
    } else {
        res.send("Lütfen giriş yapın!");
    }
});
app.use(isLogin); // arka tarafta bu route'a bir adres vermediğimiz için tüm route'lar için bu şekilde çalışır.

app.listen(8080, () => {
    console.log('express server çalıştı!');
});

