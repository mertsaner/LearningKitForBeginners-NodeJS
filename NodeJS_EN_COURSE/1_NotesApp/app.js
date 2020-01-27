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

console.log(chalk.red.bold.inverse(msg))
console.log(chalk.green.bgWhite.bold('Success!'))
