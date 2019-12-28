const url = require('url');

const address = 'http://baysansoftwear.com/hizmetler?category=5&month=haziran';

const result = url.parse(address,true); // bize internet adresinin bilgilerini verir.

console.log(result);