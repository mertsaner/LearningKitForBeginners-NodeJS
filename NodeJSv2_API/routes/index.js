const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs"); // npm install bcryptjs --save -> npm paketi projeye indirdik
const jwt = require('jsonwebtoken');// npm install jsonwebtoken --save -> JWT PAKETİ İNDİRDİK
// Modeli dahil ediyoruz
const User = require('../models/User');



router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {
  const { username, password } = req.body; // body posttan gelen ifadelere eşitlenmiş olacak
  bcrypt.hash(password, 10).then((hash) => { // burda parolayı şifreledik. ilk parametre şifrelenecek veri, ikinci parametre ise ne aralıkla şifrelensin
    const user = new User({
      username, // username = username demek -> ilki modeldeki username ikincisi router'daki username
      password: hash // oluşan kullanıcının password field'ına hash gelsin dedik
    });
    const promise = user.save();
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  });
});

router.post("/authenticate", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ // username'i veritabanında arayacak
    username
  }, (err, user) => {
    if (err) { // eğer hata alırsak
      throw err;
    }
    if (!user) { // eğer user yoksa
      res.json({ status: false, message: "Authentication user not found" });
    } else { // eğer user varsa
      bcrypt.compare(password, user.password).then((result) => { // bcrypt.compare diyerek yukarda hash ile şifreledeğimiz passwordu açarız, requestten gelen password ile veritabanındaki user.password'u karşılaştırırız
        if (!result) {
          res.json({ status: false, message: 'Authentication user not found' });
        } else {
          const payload = {
            username
          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 720 // 12 saat
          }); // token'a payload veriyoruz ve secret key'i veriyoruz ve 3. olarak expiresIn ile zaman parametresi veriyoruz
          res.json({ status: true, token })
        }
      });
    }
  });
});

module.exports = router;
