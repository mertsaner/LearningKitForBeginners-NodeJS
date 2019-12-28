const express = require('express');
const router = express.Router();

// Model dosyasını sayfaya dahil edelim ki db kayıt olsun
const Movie = require("../models/Movie");


router.get("/", (req, res) => { // bütün filmleri listeleme
  const promise = Movie.aggregate([
    {
      $lookup: {
        from: 'directors',
        localField: 'director_id',
        foreignField: '_id',
        as: 'director'
      }
    }, {
      $unwind: '$director'
    }
  ]); // hatırlayon nosql find methodu sayesinde boş parametre verirsek hepsini getirirdi
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/:movie_id', (req, res, next) => { // Id'e göre arama 
  // res.send(req.params);
  const promise = Movie.findById(req.params.movie_id);
  promise.then((movie) => {
    if (!movie) {
      next({ message: "The movie was not found", code: 2 });
    }
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});
router.put('/:movie_id', (req, res, next) => { // Güncelleme işlemi
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, { new: true });  // new : true -> güncellenen datayı gösterir
  promise.then((movie) => {
    if (!movie) {
      next({ message: "The movie was not found", code: 2 });
    }
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});
router.delete('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);  // silme işlemi
  promise.then((movie) => {
    if (!movie) {
      next({ message: "The movie was not found", code: 2 });
    }
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.get("/topten", (req, res) => { // top 10 film
  const promise = Movie.find({}).limit(10).sort({ imdb_score: -1 }); // 10 data getir (limit 10) ve bunları büyükten küçüğe sırala(sort) imdb_score'a göre 
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.get("/between/:start_year/:end_year", (req, res) => { // 2 tarih arasındaki filmleri listeleme
  const { start_year, end_year } = req.params;
  const promise = Movie.find({
    year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) } // $gte -> büyük veya eşit  $lte -> küçük veya eşit
  });
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
router.post('/', (req, res, next) => { // film ekleme
  // const data = req.body; // req nesnesi altında body objesi, göndermiş olduğumuz post body'si burda barındırılır. body.title dersek sadece datanın title field'ı almış oluruz
  /* DATA KAAYDETMEK İÇİN 1. YÖNTEM
    const { _title, _imdb_score, _category, _country, _year } = req.body;
    const movie = new Movie({
      title: _title,
      imdb_score : _imdb_score, // model'e ait title field'a req.body'den gelen _title atadık diğer fieldlarda aynı şekil
      category : _category,
      country : _country,
      year : _year
    });
    */
  // DATA KAYDETMEK İÇİN 2. YÖNTEM BENCE DAHA KOLAY :p
  const movie = new Movie(req.body);
  /* save işlemi için 1. yöntem
  movie.save((err,data)=>{
    if (err) {
      res.json(err);
    }
    res.json(`${req.body.title} başarıyla kaydedildi!`);
  }); */
  // save işlemi için 2. yöntem (promise yapısı)
  const promise = movie.save();
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

});

module.exports = router;
