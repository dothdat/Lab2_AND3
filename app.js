var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const database = require('./db');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const SinhVienSchema = new mongoose.Schema({
  maSV: String,
  tenSV: String
});
const mongoose = require('mongoose');
const SinhVien = mongoose.model('sinhvien', SinhVienSchema);
app.get('/', async (req, res) => {
  try {
    const sinhvien = await SinhVien.find();
    if (sinhvien.length > 0) {
      res.json(sinhvien);
    } else {
      res.status(404).json({ error: "khong co sinh vien" })
    }
  } catch (error) {
    console.error("loi doc du lieu: ")
    res.status(500).json({ error: "Loi doc du lieu" });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('server dang chay o cong 5000');
});
database.connect();
module.exports = app;
