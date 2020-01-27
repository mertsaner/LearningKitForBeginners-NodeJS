//const fs = require('fs'); // FileSystem modülünü bir değişkene atadık

// fs.writeFileSync('notes.txt', 'Bu dosya NodeJs ile oluşturuldu! \n'); // ilk parametre dosya adı, diğer parametre içerik. dosyayı açar yazar, eğer dosya varsa siler ve tekrar oluşturur

// fs.appendFileSync('notes.txt','Bu dosyaya appendFileSync ile eklendi!'); // dosya sonuna ekleme yapar

// const utils = require('./utils')
// const sayi = utils.topla(12, 5)

// console.log(utils.name)
// console.log('utils.js den gelen topla fonksiyonu ile oluşan sayi değişkeni = ' + sayi)

const validator = require('validator') // npm paketlerini bu şekilde path belirtmeden bulabiliyoruz
const chalk = require('chalk')
const notes = require('./notes')

const msg = notes.get_all_notes()

// console.log(chalk.red.bold.inverse(msg))
// console.log(chalk.green.bgWhite.bold('Success!'))

// const command = process.argv[2]; // node dosya_adi.js yapıp çalıştırınca yolladığımız diğer parametreleri almamıza yarar.

// if (command === 'ekle') {
//     console.log(chalk.green.bold('Not ekleniyor...'));
// } else if (command === 'sil') {
//     console.log(chalk.red.bold('Not siliniyor...'));
// }

const yargs = require('yargs'); // yukarıdaki gibi komutları parçalamamız zor olduğu için yargs isimli paketi yüklüyoruz.(npm install yargs)

yargs.version('1.1.0'); // yargs'ın versiyonunu customize edebiliriz

yargs.command({
    command: 'ekle', // komutun adı
    describe: 'Yeni bir not ekleyebilirsiniz', // komutun açıklaması
    handler: () => { // komut çalıştırılınca gerçekleştirilecek fonksiyon
        console.log(chalk.green.bold('Yeni not başarıyla eklendi...'));
    }
});
yargs.command({
    command: 'sil', // komutun adı
    describe: 'Bir not silebilirsiniz', // komutun açıklaması
    handler: () => { // komut çalıştırılınca gerçekleştirilecek fonksiyon
        console.log(chalk.red.bold('Not başarıyla silindi...'));
    }
});
yargs.command({
    command: 'listele', // komutun adı
    describe: 'Bütün Notları Listeleyebilirsiniz', // komutun açıklaması
    handler: () => { // komut çalıştırılınca gerçekleştirilecek fonksiyon
        console.log(chalk.blue.bold('Not listesi...'));
    }
});
yargs.command({
    command: 'oku', // komutun adı
    describe: 'Bir not okuyabilirsiniz', // komutun açıklaması
    handler: () => { // komut çalıştırılınca gerçekleştirilecek fonksiyon
        console.log(chalk.yellow.bold('Not okunuyor...'));
    }
});
console.log(yargs.argv);