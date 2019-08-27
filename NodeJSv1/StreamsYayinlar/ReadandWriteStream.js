const fs = require('fs');

const file = 'video.mp4'; // hangi dosya üzerinde stream yapacaksak o dosyayı değişkene atadık

const readStream = fs.createReadStream(file);
const writeStream = fs.createWriteStream('new.mp4'); // içeri oluşacak yeni dosyanın adını veririz
let progress = 0;

fs.stat(file, (err, data) => {
    const total = data.size;
    readStream.on('data', (chunk) => {
        progress += chunk.length;
        console.log(Math.round((100 * progress) / total) + '%'); // yüzde kaçı okundu gibi bir algoritma 
    });
});


// aslında bir event emitterdır
readStream.on('data', (chunk) => { // chunk -> buffer nesnesi, 'data' -> her data eventi emit olduğunda
    console.log("bir data geldi");
    console.log(chunk.length); // -> okunan datanın boyutu
    progress += chunk.length; // datanın boyutunu öğrenebiliriz
    readStream.pipe(writeStream); // readStream'e bir pipe ekleyerek
    writeStream.on('finish',()=>{ // writeStream 'finish' eventi tetiklenince
        console.log("Yeni dosya oluşturuldu");
    });

});

readStream.on('end', () => { // 'end' eventi tetiklendiğinde
    console.log("veri okunması bitti!");
});