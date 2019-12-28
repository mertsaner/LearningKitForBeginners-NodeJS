const EventEmitter = require('events'); // modülü projeye dahil ediyoruz
const emitter = new EventEmitter(); // ve dahil ettiğimiz modülden bir obje oluşturuyoruz

// listener evenet oluşturuyoruz
emitter.on('connection', () => {
    console.log('Bağlantı oluşturuldu!');
});


// emit ediyoruz, eventi tetikliyoruz 
emitter.emit('connection');