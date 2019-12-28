const slugify = require("slugify"); // paketimizi dosyaya import ettik

const text = "Türkiye Büyük Millet Meclisi"; // bir değişken belirledik
const slug = slugify(text,"*"); // paketin fonksiyonunu kullandık

console.log(slug);