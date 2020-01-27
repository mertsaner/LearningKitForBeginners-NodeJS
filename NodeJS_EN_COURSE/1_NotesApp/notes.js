const fs = require('fs');
const chalk = require('chalk');
const $FILE_NAME = 'notes.json';

const get_all_notes = () => 'Bütün Notlar...'

const add_note = (title, body) => {

    const notes = load_notes(); // eğer daha önce yazılı not varsa onu döner obje olarak yoksa zaten boş array dönecek

    const duplicate_notes = notes.filter((note) => {
        return note.title === title;
    });
    if (duplicate_notes.length === 0) {
        notes.push({ // yeni geleni notes içine ekler
            title: title,
            body: body
        });
        save_notes(notes); // eklenmiş arrayi fonksiyona yollar,
        console.log(chalk.green.bold(`${title} başlıklı not başarıyla eklendi...`));
    } else {
        console.log(chalk.red.bold(`${title} başlıklı not mevcut olduğundan eklenemedi!`));
    }



}
const remove_note = (title) => {
    const notes = load_notes();
    const silinmeyen_notlar = notes.filter((note) => {
        return note.title !== title; // eğer her döndüğünde elemanın title propu dışardan gelen title'a eşit değilse onu silinmeyenler array'e atacak
        // bu sayede silinecek not array'den çıkmış olacak
    });
    if (notes.length > silinmeyen_notlar.length) {
        console.log(chalk.green.italic(`${title} başlıklı not başarıyla silindi...`));
        save_notes(silinmeyen_notlar); // silinecek elemanın çıktığı listeyi kaydediyoruz
    } else {
        console.log(chalk.red.inverse(`${title} başlıklı not bulunamadığından silinemedi...`));
    }


}

const notlari_listele = () => {
    const notes = load_notes();
    let sayac = 1;
    notes.forEach(note => {
        console.log(chalk.blue.bold(`${sayac}. not:`));
        console.log(chalk.yellow.bold('\n\tBaşlık:'), ` ${note.title}`);
        sayac++;
    });
};

const read_note = (title) => {
    const notes = load_notes();
    const okunacak = notes.filter((note) => {
        return note.title === title;
    });
    if (okunacak.length === 1) {
        const not = okunacak[0];
        console.log(chalk.blue.bold('Başlık:\n\t'), not.title, chalk.blue.bold('\nİçerik:\n\t'), not.body);
    } else {
        console.log(chalk.red.inverse(`'${title}' başlıklı not bulunamadı...`));
    }
};

const save_notes = (notes) => { // parametre olarak notes alır
    const data_json = JSON.stringify(notes); // aldığı notları stringe çevirir
    fs.writeFileSync($FILE_NAME, data_json); // dosyaya yazar
}

const load_notes = () => {
    try { // notes.json yoksa
        const data_buffer = fs.readFileSync($FILE_NAME); // notes.json içinden byte byte okuduk
        const data_json = data_buffer.toString(); // elimizdeki datayı stringe çevirdik
        return JSON.parse(data_json); // çevirdiğimiz stringi parse edip obje olarak return ettik
    } catch (e) {
        return []; // eğer dosya yoksa boş bir array döndüreceğiz
    }

}

module.exports = {
    get_all_notes: get_all_notes,
    add_note: add_note,
    remove_note: remove_note,
    notlari_listele: notlari_listele,
    read_note: read_note,
}
