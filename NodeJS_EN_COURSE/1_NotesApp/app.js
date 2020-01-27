const fs = require('fs'); // FileSystem modülünü bir değişkene atadık
fs.writeFileSync('notes.txt', 'Bu dosya NodeJs ile oluşturuldu! \n'); // ilk parametre dosya adı, diğer parametre içerik. dosyayı açar yazar, eğer dosya varsa siler ve tekrar oluşturur
fs.appendFileSync('notes.txt','Bu dosyaya appendFileSync ile eklendi!'); // dosya sonuna ekleme yapar
