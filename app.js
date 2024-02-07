var net = require('net');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);

function hostTest(port, host) {
  return new Promise((resolve, reject) => {
    const client = net.createConnection({ port, host }, () => {
      client.end();
      resolve(true);
    });

    client.setTimeout(1000);

    client.on('timeout', function() {
      //console.log('socket timeout');
      client.destroy();
      reject(false);
    }).on('error', (error) => {
      //console.log(error);
      client.destroy();
      reject(false);
    });
  });
}


app.post('/test', function(req, res){

  //console.log('POST REQUEST');
  //console.log(req);

  //console.log('POST REQUEST BODY');
  //console.log(req.body);

  hostTest(req.body.port, req.body.host)
    .then((success) => {
      console.log("Connection Successful:", success);
      res.send({message: "Connection Successful"});
    })
    .catch((error) => {
      console.log("Connection Failed:", error);
      res.send({message: "Connection Failed"});
    })

});

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
