const express = require('express');

const router = express.Router();

router.get('/signIn', (req, res) => {
    res.send("sign in sayfası (GET)");
});

router.post('/signIn', (req, res) => {
    res.send("sign in sayfası (POST)");
});

module.exports = router; // bu routerları bir modül olarak paketledik intro js dosyamızda kullanacağız.
