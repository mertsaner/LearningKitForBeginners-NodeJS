const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: [true,'`{PATH}` alanı zorunludur!']
    },
    category: String,
    country: String,
    year: Number,
    imdb_score: Number,
    director_id: Schema.Types.ObjectId, // join işlemi yapacağımız için ObjectId tipinde tutulmalı
    createdAt: {
        type: Date,
        default: Date.now
    }

});
module.exports = mongoose.model('movie', MovieSchema);
