var express = require('express');
var router = express.Router();

//Modelleri ekliyoruz
const Book = require('../models/Book');

router.get('/new', function (req, res, next) {
  const book = new Book({ // yeni bir Book objesi oluşturuyoruz
    title: 'Udemy NodeJS',
    published: false,
    comments: [{ message: "Güzel bir kitap" }, { message: "Bence güzel bir kitap değil" }],
    meta: { votes: 12, favs: 124 }

  });
  book.save((err, data) => {
    if (err)
      console.log(err);

    res.json(data);
  });
});

router.get('/search', (req, res) => {
  Book.find({ published: false }, (err, data) => { // oluşturduğumuz Book model'in find methodu ile arama yapıyoruz. ilk parametre arama değeri(published prop'u false olanlar). Diğer parametreleri de ilk parametrenin yanına ekleyebilirsin.
    // Book.find({ published: false }, 'title comments' ,(err, data)  -> böyle bir arama senaryosunda published değeri false olan dataların title ve comments değerleri gelecektir.
    // Book.find({},(err, data) -> böyle bir senaryoda tüm kayıtlar gelecektir.
    res.json(data);
  });
});

router.get('/searchOne', (req, res) => {
  Book.findOne({ title: 'Udemy' }, (err, data) => { // title 'ı Udemy olan İLK kaydı getirir.

    res.json(data);
  });
});
router.get('/searchById', (req, res) => {
  Book.findById('5ccc31f90db4440fdc92bdb4', (err, data) => { // Id'e göre arama yapar.

    res.json(data);
  });
});

router.put('/update', (req, res) => {
  Book.update({ published: false },
    {
      published: true,
      title: 'upsert ile atadık' // upsert methodu ile kullandığımız için title'ı daha önce böyle olamayan bir şey yoksa bu title ile bir kayıt ekelyecek
    },
    {
      // multi: true  // published alanı false olanı true yap dedik(bulduğu ilk kaydı update eder.). multi : true diyerek bütün hepsini günceller
      upsert: true  // published alanı false olan bir kayıt bulamadığında true olan yeni bir kayıt ekleyecek
    },
    (err, data) => {

      res.json(data);
    });
});

router.put('/updateById', (req, res) => {
  Book.findByIdAndUpdate('5ccc31f90db4440fdc92bdb4', // ilk parametre id
    {
      title: "findByIdAndUpdate komutu ile güncelledik",  // ikinci parametre güncelleyeceğimiz alan
      'meta.favs': 123 // meta altındaki favsları günceller
    }
    , (err, data) => { // Id'e göre güncelleme yapar.

      res.json(data);
    });
});

router.delete('/remove', (req, res) => {
  /* 1. Yöntem ile en üstteki kaydı siler
  Book.findOneAndRemove({title:"Udemy NodeJS"}, (err, data) => {
    res.send('ok');
  });
  */
  // 2. Yöntem ile kriterlere uygun bütün kayıtları siler
  Book.remove({ published: false }, (err, data) => {
    res.json(data);
  });
});

router.get('/sort', (req, res) => { // sıralama işlemleri
  Book.find({}, (err, data) => {
    res.json(data);
  }).sort({ 'meta.favs': 1 });// sıralama işlemi için sort methodu kullanılır. neye göre sıralayacağımız ilk parametre, büyükten küçüğe ise 1, küçükten büyüğe ise -1
});
// limit and skip    limit -> belli sayı kadar kayıt istiyorum, skip ise şukadar kayıt atla ve devamını bana getir dedik.
router.get('/limitandskip', (req, res) => { // sıralama işlemleri
  Book.find({}, (err, data) => {
    res.json(data);
  }).limit(2); // 2 kayıt getir
});
/*
* aggregate -> kümelemek demektir

*/
router.get('/aggregateMatch', (req, res) => {
  Book.aggregate([
    {
      $match: { // içine verdiğimiz değerle eşleşen kayıtları getirir
        published: true
      }
    }
  ], (err, result) => {
    res.json(result);
  });
});
router.get('/aggregateGroup', (req, res) => {
  Book.aggregate([
    {
      $match: { // içine verdiğimiz değerle eşleşen kayıtları getirir
        published: true
      }
    }, {
      $group: {
        _id: "$title", // title özelliğine göre gruplar, hangi title'da kaç kayıt var
        adet: { $sum: 1 } // sum toplama işlemi yapar
      }
    }
  ], (err, result) => {
    res.json(result);
  });
});

router.get('/aggregateProject', (req, res) => {
  Book.aggregate([
    {
      $match: { // içine verdiğimiz değerle eşleşen kayıtları getirir
        published: true
      }
    }, {
      $project: { // sadece içine verdiğimiz özellikleri getirmemizi sağlar
        title: 1 // 1 diyerek true demiş olduk yani title özelliği gelsin
      }
    }
  ], (err, result) => {
    res.json(result);
  });
});

router.get('/aggregateLookup', (req, res) => { // Lookup operatörü join işlemi yapar. ilişkisel tablolardaki gibi birbirleriyle ilişkilendirir
  Book.aggregate([
    {
      $lookup: {
        from: 'users', // hangi tablodan(koleksiyondan) birleştirme
        localfield: 'userId', // Book collection'daki hangi field ile eşleştireceksin
        foreignField: '_id', // burasıda users tablosundaki karşılık gelecek alan
        as: 'user' // bu değerler neye atanacak
      }
    }, {
      $unwind: '$user' // unwind operatör ile lookuptaki user'i aldık
    }, {
      $project: {
        title: 1,
        user: '$user' // lookupdan aldığımız user'i user'a atadık
      }
    }
  ], (err, result) => {
    res.json(result);
  });
});
/*
$exists operatörü ise true false değer alır Ör:
category:{
  $exists:true // kategori field'ı boş olanları getirmeyecek
}
*/

module.exports = router;
