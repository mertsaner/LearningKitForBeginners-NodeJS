"use strict"; // en son kararlı sürümü kullan dedik
function topla(a,b) {
    console.log(`${a} + ${b} = `+ (a+b));
    return a + b;
}

setTimeout(function() {
    console.log("Selam nasılsın?");
},3000); // setTimeOut -> belirttiğimiz süre (3000) sonunda belirttiğimiz işlemleri yapar ve 1 kere çalışır durur.


var sayi = 0;
var interval = setInterval(function() { // setInterval fonksiyonu belirttiğimiz süre boyunca aynı işlemi durmadan yapar ancak biz durdururuz, clearInterval fonksiyonu sayesinde
    console.log("selam");
    sayi++;
    if (sayi==5) {
        clearInterval(interval);
    }
},1000); 



