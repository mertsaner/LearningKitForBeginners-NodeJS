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
    builder: { // bir obje oluşturmamızı sağlar
        title: { // title adında bir obje oluşturduk
            describe: 'Not Başlığı', // bu objenin açıklaması
            demandOption: true, // bu parametrenin zorunlu olup olmadığını belirledik
            type: 'string', // gelecek parametrenin tipini belirledik
        },
        body: {
            describe: 'Not içeriği',
            demandOption: true,
            type: 'string',
        }
    },
    handler: (argv) => { // komut çalıştırılınca gerçekleştirilecek fonksiyon
        //console.log(chalk.green.bold('Başlık: ' + argv.title + '\nİçerik: ' + argv.body + '\nBaşarıyla eklendi...'));
        notes.add_note(argv.title, argv.body);
    }
});
yargs.command({
    command: 'sil',
    describe: 'Bir not silebilirsiniz',
    builder: {
        title: {
            describe: 'Silinecek not başlığı',
            demandOption: true,
            type: 'string',
        }
    },
    handler: (argv) => {
        //console.log(chalk.red.bold('Not başarıyla silindi...'));
        notes.remove_note(argv.title);
    }
});
yargs.command({
    command: 'listele',
    describe: 'Bütün notları listeleyebilirsiniz',
    handler: () => {
        //console.log(chalk.blue.bold('Not listesi...'));
        notes.notlari_listele();
    }
});
yargs.command({
    command: 'oku',
    describe: 'Bir not okuyabilirsiniz',
    builder: {
        title: {
            describe: 'Okunacak Mesaj Başlığı',
            demandOption: true,
            type: 'string',
        },
    },
    handler: (argv) => {
        //console.log(chalk.yellow.bold('Not okunuyor...'));
        notes.read_note(argv.title);
    }
});

yargs.parse(); // cli argümanlarımızı parse etmesi için gerekli olan kod parçacığı
//console.log(yargs.argv);