const fs = require('fs');
// const kitap = {
//     title: 'Başlık',  // objenin property'sidir
//     author: 'Yazar',
//     icerik: 'İçerik'
// } // objedir

// const kitapJSON = JSON.stringify(kitap); // obje değil stringdir
// console.log(kitapJSON);
// console.log(kitap);
// console.log(kitap.title);

// const parsedKitap = JSON.parse(kitapJSON); // stringden objeye çevirir
// console.log(parsedKitap.author);

// fs.writeFileSync('playground.json', kitapJSON); // yazarken string olanı yazmalıyız

const data_buffer = fs.readFileSync('playground.json'); // okur fakat byte byte okur
const data_json = data_buffer.toString(); // düzgün bir hale getirmek için tekrar stringe çevirmeliyiz
const data = JSON.parse(data_json); // stringden tekrar objeye çevirdik
// console.log(data_buffer);
// console.log(data_json); 
data.age = 20;
data.name = 'Baysan';
console.log(data);
data_to_string = JSON.stringify(data);
fs.writeFileSync('playground.json',data_to_string);