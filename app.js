var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup

    app.set('views', [path.join(__dirname, 'views'),
                      path.join(__dirname, 'views/event/')
                    ]);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', indexRouter);
app.get('/register',indexRouter) ;
app.post('/register',indexRouter);
app.get('/login',indexRouter);
app.post('/login',indexRouter);
app.get('/about',indexRouter);
app.get('/school',indexRouter);
app.get('/student',indexRouter);
app.get('/event',indexRouter);
app.get('/Registration',indexRouter);


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
app.listen(3000,()=>console.log("Server started"));
module.exports = app;
