const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const movieRouter = require('./routes/movie');
const directorRouter = require('./routes/director');
const verifyToken = require('./middleware/verifyToken'); // yazdığımız middleware katmanı dahil etitk
// Db bağlantısı
const db = require("./helper/db")(); // o modüle bağlı fonksiyonu çalıştırdık.
const app = express();
const config = require('./config'); // oluşturduğumuz secret key dosyasını dahil ettik
app.set('api_secret_key',config.api_secret_key); // uygulamanın secret key'ini ayarladık
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json()); // json tipinde gelen post'lar için
app.use(bodyParser.urlencoded({ extended: true })); // encode edilmiş urller için
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/movies', movieRouter);
app.use('/api/directors',directorRouter);
app.use('/api',verifyToken); // api altındaki her endpoint için bu token geçerli
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: { message: err.message, code: err.status } });
});

module.exports = app;
