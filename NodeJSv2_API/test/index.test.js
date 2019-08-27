const chai = require("chai");
const chaiHttp = require("chai-http"); // http işlemleri için burayı
const should = chai.should(); // olmalı gibi ifadeler kullanırken bunu kullanacağız
const server = require("../app"); // server'i dahil ediyourz.

chai.use(chaiHttp); // chaiHttp kullanılabilir hale getirdik
describe('Node Server', () => { // describe --> teslerin ne testi olduğunu anlatıyoruz
    it('(GET /) Deneme testi', (done) => { // her describe içinde istenildiği kadar it olur. bu it'ler sayesinde istediğimiz unit test'i yapabiliriz.
        done(); // done -> test bitti her şey yolunda demektir.
    });
    it('(GET /) ana sayfayı döndürür', (done) => {
        chai.request(server) // server'a bir istekte bulunulacak
        .get('/') // localhost:3000 ' bir get isteği yapılacak
        .end((err,res)=>{ // istek bittikten sonra
            res.should.have.status(200); // bu http'nin durum kodu 200 olmalı(should)
            done();
        });
    });
});
