const express = require('express');
const router = express.Router(); // express altındaki Router objesinden instance oluşturduk
const path = require('path');



router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(__dirname+'/../views/add-product.html'));
});

router.post("/add-product", (req, res, next) => {
    //   console.log(req.body.product_name); // bu şekilde sadece product_name'i yakalayabiliriz
    console.log(req.body);
    res.redirect('/'); // redirect yapmamızı sağlar
});


module.exports = router;