// Destructing
const degerler = [1, 2, 3];
const [deger1, deger2, deger3] = degerler;
console.log(deger1);
console.log(deger2);

// Spread operator (...)

let dizi = ['asd', 'asd', 123, 'asdfad'];
console.log(...dizi); // -> ... ile bütün elemanları ekrana basmamızı sağladı

// Rest Operator

let dizi2 = ['a', 'b', 'c', 'd'];
let [deneme1, deneme2, ...rest] = dizi2; // deneme1 ve deneme 2 dizi2'nin ilk 2 elemanına karşılık geliyor. Ondan sonra ne kadar eleman varsa hepsi rest(rest sadece değişken adı istersek ...asd yazabiliriz) değişkenine atılıyor ve bir dizi içerisinde tutuluyor
console.log(rest);

// ARROW FUNC
let fonksiyon = (a, b) => { //1. gösterim
    return a + b;
};
let fonksiyon2 = (sayi1, sayi2) => sayi1 + sayi2; // 2. gösterim
let fonksiyon3 = sayi1 => sayi1 + 5; // 3. gösterim tek parametrede kullanılır genelde
let sayi = fonksiyon(3, 4);
console.log(sayi);

// PROMISE Yapısı
/*
const asenkronFonksiyon = (sayi, callback) => {
    const sonuc = sayi + 2;
    callback(sonuc);
};

asenkronFonksiyon(2, function (sonuc) {
    console.log(sonuc);
});
*/
const asenkronFonksiyon = (sayi) => {
    return new Promise((resolve, reject) => {
        if (sayi == 5) {
            resolve("her şey yolunda"); // resolve olursa then bloklarına gidecek
        } else {
            reject("bir sorun var"); // eğer reject olursa then bloklarına girmeyecek direk catch bloğuna
        }
    })
};
asenkronFonksiyon(6).then((data) => {
    console.log(data);
    return 1; // alta bir değer döndürür ve alttaki .then fonksiyona parametre olarak döndürdüğü değer gider
}).then((data) => {
    console.log(data);
    return 2;
}).then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
});

// ufak bir class örneği -> **!! JS'de class'larda proplar constructor ile oluşturulur
class Person {
    constructor(_ad, _soyad) {
        this.ad = _ad;
        this.soyad = _soyad;
    }

}
const kişi = new Person("Baysan", 18);
console.log(kişi.ad);

//Async / Await
const user = { id: 10, name: "Enes" };
const frineds = [{ id: 11, name: "Yusuf" }, { id: 12, name: "Yavuz" }];

const getUser = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(user);
        }, 500);
    })
}

const getFriend = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(user);
        }, 1000);
    });
};

async function asenkronAkis() {
    try {
        console.log("islem basladi");
    const user = await getUser();
    console.log("user servis bitti");
    const friends = await getFriend(user.id);
    console.log("friends sevsi bitti!");
    console.log(user,frineds);
    } catch (error) {
        console.log(error);
    }
    
};
asenkronAkis();

// Module exports ve require
const modül = require('./modul'); // dahil ettiğimz modülü bir değişkene atadık
const{topla,carp} = require("./modul"); // dizi içinde değişkenleri tanımladık modul dosyasındakileri
const degisken = modül.topla(4,5); // dahil ettiğimiz değişkeni kullandık
console.log(degisken);
const degisken2 = carp(3,4);
console.log(degisken2);