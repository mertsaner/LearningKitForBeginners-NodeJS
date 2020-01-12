const express = require('express');
const router = express.Router();
const path = require('path');

router.use('/', (req, res, next) => { // / ile başlayan her route'da bu işlem yapılacak
    console.log('Loglama yapıldı...');
    next(); // süreci kesmesin bir sonraki middleware'a gitsin
});

router.use((req, res, next) => {
    console.log("Middleware 1 çalıştırıldı!");
    next(); // bir sonraki middleware'a geçsin dedik.
});



router.get('/', (req, res, next) => { // routing için ilk parametreyi kullanırız
    console.log("Middleware 2 çalıştırıldı!");
    res.sendFile(path.join(__dirname + '/../views/index.html')); // path modülü sayesinde yolu belirtiyoruz 
});


module.exports = router;