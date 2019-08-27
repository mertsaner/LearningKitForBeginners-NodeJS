const fs = require('fs');
// bu modül ile klasör içerisinde bulunan dosyaların içeriğini okuyabiliriz,değiştirebiliriz,dosya oluşturabiliriz.

const files = fs.readdir('./', (err, data) => { // ./ dizini içerisindeki bütün dosyaların adını getir. ve bir callback fonksiyon alır. o da 2 parametre alır error ve data. 
    console.log(data);
});

const data = fs.readFile('deneme.txt', 'utf8', (err, data) => {
    console.log(data);
});

fs.writeFile('deneme2.txt', 'Hello World!', (err, data) => { // ilk parametre oluşacak dosyanın adı, ikinci parametre içine yazılacak değer. eğer ilk parametredeki isimde dosya varsa üzerine yazar(içini siler) yoksa oluşturur
    console.log('dosya oluşturuldu!');
})

fs.appendFile('deneme2.txt', 'Hello World!Append', (err, data) => { // ilk parametre oluşacak dosyanın adı, ikinci parametre içine eklenecek değer. eğer ilk parametredeki isimde dosya varsa içine ekler yoksa oluşturur
    console.log('dosya oluşturuldu!');
});
fs.unlink('deneme2.txt', (err) => { // dosyayı siler ve içinne bir callback alır. o da içine bir err parametresi alır.
    if (err) {
        console.log(err);
    }
});

fs.rename('deneme.txt', 'denemeAdiDegisti.txt', (err) => { // ilk parametre mevcuttaki dosya adı, ikinci parametre değiştirilecek isim adı.
    if (err) {
        console.log(err);
    }
});