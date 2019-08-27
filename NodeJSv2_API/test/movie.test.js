const chai = require('chai'); // paketi dahil ediyoruz
const chaiHttp = require('chai-http'); // http işlemleri için kullanacağız
const should = chai.should(); // böyle olmalı, şöyle olmalı gibi ifadeler için kullanacağız
const server = require('../app'); // hangi server'da test edeceksek onu dahil ediyoruz
chai.use(chaiHttp); // http işlemlerini kullanmayı aktif ediyoruz

let token, movieId; // jwt servisi kullandığımız için tokensiz giriş yapamadığımız url'ler için token dahil etitk ve movieId ile işlem yaptığımız yerler için movieId değişkeni oluşturduk

describe('/api/movies tests', () => {
	before((done) => { // before -> test etmeye başlamadan önce yapılacaklar için kullanılır. Bu blokta test öncesi gerekli işlemler kodlanır
		chai.request(server) // server'ımıza (app.js) request atıyourz
			.post('/authenticate') // /authenticate url'e post attık
			.send({username: 'testicin', password: '12345'}) // denemek için bu url username ve password istediğinden önceden hazırladığımız test kullanıcısın bilgilerini attık
			.end((err, res) => { // en son kısımda
				token = res.body.token; // yukarda oluşturduğumuz token değişkenine bu url'den gelen tokeni atadık
				done();
			});
	});

	describe('/GET movies', () => {
		it('bütün filmleri getirmelidir', (done) => {
			chai.request(server)
				.get('/api/movies') // get isteği attık server'a(parametre olarak gelen url)
				.set('x-access-token', token) // bu url tokensiz açılmadığı için yukardan gelen token'i header'da verdik
				.end((err, res) => {
					res.should.have.status(200); // sayfanın durum kodu 200 olmalı(should) dedik
					res.body.should.be.a('array'); // ve bize dönen değer (body) bir array olmalı dedik
					done();
				});
		})
	});

	describe('/POST movie', () => {
		it('film eklemelidir', (done) => {
			const movie = {
				title: 'test filmi',
				director_id: '5cceccf9e4f7c8152066b6b7',
				category: 'test kategori',
				country: 'Türkiye',
				year: 1950,
				imdb_score: 8
			};

			chai.request(server)
				.post('/api/movies') // bu url'e post attık. Bu url bir movie gönderince çalıştığı için yukarıda test için movie hazırladık
				.send(movie) // url'e movie objemizi yolladık
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200); 
					res.body.should.be.a('object'); // sayfadan dönen değer bir obje olmalıdır dedik
					res.body.should.have.property('title'); // dönen obje 'title' adında bir prop'a sahip olmalıdır dedik.
					res.body.should.have.property('director_id');
					res.body.should.have.property('category');
					res.body.should.have.property('country');
					res.body.should.have.property('year');
					res.body.should.have.property('imdb_score');
					movieId = res.body._id; // ve aşağıda kullanacağımız diğer test methodları için yolladığımız bu movie'nin id'sini en yukarda oluşturduğumuz movieId değerine atadık
					done();
				});
		});
	});

	describe('/GET/:movie_id movie', () => {
		it('id`e göre film getirmelidir', (done) => {
			chai.request(server)
				.get('/api/movies/' + movieId) // bu sayfa bir id parametresi aldığı için bir üstteki movieId'i url sonuna ekleyerek get request'i attık
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('title');
					res.body.should.have.property('director_id');
					res.body.should.have.property('category');
					res.body.should.have.property('country');
					res.body.should.have.property('year');
					res.body.should.have.property('imdb_score');
					res.body.should.have.property('_id').eql(movieId); // ve test başarılı olması için dönen objenin _id prop'u bizim gönderdiğimiz(movieId)'e eşit olmalı(should) dedik.
					done();
				});
		});
	});

	describe('/PUT/:movie_id movie', () => {
		it('id`e göre film update etmelidir', (done) => {
			const movie = {
				title: 'test update',
				director_id: '5a34e1afb8523a78631f8541',
				category: 'test kategori update',
				country: 'Fransa',
				year: 1970,
				imdb_score: 9
			};

			chai.request(server)
				.put('/api/movies/' + movieId)
				.send(movie)
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('title').eql(movie.title);
					res.body.should.have.property('director_id').eql(movie.director_id);
					res.body.should.have.property('category').eql(movie.category);
					res.body.should.have.property('country').eql(movie.country);
					res.body.should.have.property('year').eql(movie.year);
					res.body.should.have.property('imdb_score').eql(movie.imdb_score);

					done();
				});
		});
	});

	describe('/DELETE/:movie_id movie', () => {
		it('id`e göre film silmelidir', (done) => {
			chai.request(server)
				.delete('/api/movies/' + movieId)
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
	});
});