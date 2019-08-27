const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Modeli sayfaya eliyourz
const Director = require("../models/Director");


router.post('/', (req, res, next) => {
    const director = new Director(req.body);
    const promise = director.save();
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});
router.get("/", (req, res) => {
    const promise = Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id', // director tablosundaki alan
                foreignField: 'director_id', // eşleştiği tablodaki alan
                as: 'movie'
            }
        }, {
            $unwind: {
                path: '$movie',
                preserveNullAndEmptyArrays: true // herhangi bir data ile eşleşmese bile gelecektir
            }
        }, {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movie'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);
    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        Response.JSON(err);
    })
});
router.get("/:director_id", (req, res) => {
    const promise = Director.aggregate([
        {
            $match:{
                '_id':mongoose.Types.ObjectId(req.params.director_id) // object id tipinde tutulduğu için onu object id tipine döndürdük
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id', // director tablosundaki alan
                foreignField: 'director_id', // eşleştiği tablodaki alan
                as: 'movie'
            }
        }, {
            $unwind: {
                path: '$movie',
                preserveNullAndEmptyArrays: true // herhangi bir data ile eşleşmese bile gelecektir
            }
        }, {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movie'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);
    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        Response.JSON(err);
    })
});
router.put('/:director_id', (req, res, next) => { // Güncelleme işlemi
    const promise = Director.findByIdAndUpdate(req.params.director_id, req.body, { new: true });  // new : true -> güncellenen datayı gösterir
    promise.then((director) => {
      if (!director) {
        next({ message: "The director was not found", code: 2 });
      }
      res.json(director);
    }).catch((err) => {
      res.json(err);
    });
  });
  router.delete('/:director_id', (req, res, next) => {
    const promise = Director.findByIdAndRemove(req.params.director_id);  // silme işlemi
    promise.then((director) => {
      if (!director) {
        next({ message: "The director was not found", code: 2 });
      }
      res.json(`${director._id} silindi!`);
    }).catch((err) => {
      res.json(err);
    });
  });
module.exports = router;
