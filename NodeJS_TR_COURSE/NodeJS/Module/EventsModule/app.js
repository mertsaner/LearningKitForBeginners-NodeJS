const EventEmitter = require('events'); // modülü projeye dahil ediyoruz
const emitter = new EventEmitter(); // ve dahil ettiğimiz modülden bir obje oluşturuyoruz

// listener evenet oluşturuyoruz
emitter.on('connection', () => {
    console.log('Bağlantı oluşturuldu!');
});

emitter.on('event_adi',(isim)=>{
    console.log(`Merhaba ${isim}! event_adi isimli event tetiklendi ve çalıştı :)`);
});

// emit ediyoruz, eventi tetikliyoruz 
emitter.emit('connection');
emitter.emit('event_adi',('Enes'));