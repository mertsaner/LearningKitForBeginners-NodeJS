console.log(__filename); // hangi dizinde olduğumuzu dosya ismiyle birlikte döndürür

console.log(__dirname); // hangi dizinde olduğumuzu söyler dosya adını almaz

const fs = require('fs'); // dosya okuma ve yazma işlemlerini gerçekleştirmek için 'fs' modülünü dahil etmemiz gerekir

fs.readFile('demo.txt', (error, data) => { // fs değişkenin readFile fonksiyonu sayesinde dosya okururz. 2 parametre veririz(ilki dosyanın adı ikincisi fonksiyondur (fonksiyonda 2 parametre alır ilki error(hata olursa) ikincisi data(okunan veridir)))
    console.log(data.toString()); // okuduğun datayı stringe çevridik
    if (error) {
        console.log(error);
    }
    console.log("dosya okuma işlemi bitti!");
});

const demoDosya = fs.readFileSync('demo.txt'); // Sync senkron olduğu için bu blok bitmeden asla alt satıra geçmez
console.log(demoDosya.toString());
console.log("Dosya okuma bitti!");

/*
- fs.appendFile() -> belirttiğin dosya yoksa oluşturur ve belirttiğin metni yazar. Eğer belirttiğin dosya varsa sonuna ekleme yapar
- fs.writeFile() -> belirttiğin dosya varsa içeriği boşaltır ve üzerine yazar. Dosya yoksa oluşturur ve yazar.
- fs.unlink() -> belirttiğin dosyayı silmeye yarar
*/

fs.appendFile("demo.txt", "bu cümle fs.appendFile ile eklenmiştir!\n", (err) => { // error fonksiyonu eklemeliyiz
    if (err)
        throw err;
});

fs.writeFile("demo2.txt", "bu değer fs.writeFile ile yazıldı!", (err) => {
    if (err) {
        throw err;
    }
});

fs.unlink("demo2.txt", (err) => {
    if(err)
        throw err;
    
    console.log("dosya silindi!");
});