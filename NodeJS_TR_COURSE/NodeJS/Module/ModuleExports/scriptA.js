// private obje
let age = 30;

// public obje
let firstName = "Baysan";

let topla = (a, b) => {
    console.log(`scriptA içerisinden export edilen topla modülü çalıştı ve sonuç = ${a + b}`);
};

module.exports.name = firstName; // firstName veya topla objelerini başka dosyalarda kullansınlar istiyorsak modülleriz.
module.exports.islem = topla; // islem -> dışarıya hangi isimle aktarılacağı, topla -> bu dosya içerisinden hangi objenin aktarılacağı

/* Modülleri toplu bir şekilde de aktarabiliriz.
module.exports = {
    name: firstName,
    islem: topla
}
*/