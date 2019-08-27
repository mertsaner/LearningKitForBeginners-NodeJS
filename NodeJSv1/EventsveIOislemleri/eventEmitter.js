const events = require("events"); // modülü dahil ettik
const eventEmitter = new events.EventEmitter(); // modüldeki class'tan bir nesne ürettik

eventEmitter.on('selamla',(isim)=>{ // 1. parametre event adı 2. parametre o event olunca tetiklenecek olay
    console.log(`Merhaba ${isim}`);
});

eventEmitter.emit("selamla","baysan"); // eventi tetikledik

setTimeout(()=>{
    eventEmitter.emit("selamla","enes");
},1000);

const isim = "yusuf";
eventEmitter.emit("selamla",isim);

eventEmitter.once('merhabaDe',(ad)=>{ // once -> sadece bir kere tetiklenir
    console.log(`Merhaba ${ad}`);
});

eventEmitter.emit("merhabaDe","ali");
eventEmitter.emit("merhabaDe","hakan"); // çalışmayacak

