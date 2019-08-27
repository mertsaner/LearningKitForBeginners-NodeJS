const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose'); // öncelikle mongoose paketini dahil ettik
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const books = require('./routes/books'); // oluşturduğumuz route dosyasını ekledik.


const app = express();

mongoose.connect('mongodb://localhost/udemy',{ useNewUrlParser: true }); // mongo db adresini yazıp bağlantıyı sağlıyoruz.
mongoose.connection.on('open',()=>{ // open eventi olursa
  console.log("MongoDB bağlantısı sağlandı!");
});
mongoose.connection.on('error',()=>{ // error eventi olursa
  console.log('MongoDB bağlantısı sağlanamadı!');
});
/*  
.then(()=>{
    console.log("MONGODB bağlantısı sağlandı!");
  })
  .catch((err)=>{
    console.log("mongodb bağlantı hatası!");
  });

*/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books',books); // router'ı kullandık
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
