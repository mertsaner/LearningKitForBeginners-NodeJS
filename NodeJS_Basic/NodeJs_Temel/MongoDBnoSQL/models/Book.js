const mongoose = require('mongoose');

const Schema = mongoose.Schema; // mongoose ile şema oluşturuyoruz
/*
SCHEMA'larda kullanılacak 4 keyword
- type        -> verinin tipi
- default     -> verinin varsayılan değeri
- required    -> zorunluluk alanı
- unique      -> benzersiz bir alan
*/

const BookSchema = new Schema({
    title:{
        type: String,
        required: true, // bu alan olmazsa olmaz dedik yani veritabanına kaydederken title alanı mutlaka dolmak zorunda dedik
        unique: true,  // aynı title'da bir kayıt eklemez. benzersiz
       // maxlength:[20,'`{PATH}` alanı `{VALUE}`, {MAXLENGTH} karakterden küçük olmalıdır'] // maxlength diyerek en fazla girilecek karakter sayısını girdik. {PATH} hangi field(title) içindeysek onu otomatik basar, {MAXLENGTH} kaç karakterse onu basar(ilk parametrede verdiğimiz değer max legnth değeridir)
    },
    published: {
        type: Boolean, // published prop'un tipi boolean
        default: true  // eğer kaydedilirken bir değer gelmezse default değeri true gelsin
    },
    comments: [{message: String}],
    meta:{
        votes:Number,
        favs:Number
    },
    publishedAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('book', BookSchema);