var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Buid our load cache
let files = fs.readdirSync('public/img/');
let files2 = fs.readdirSync('public/js/maps/');

let file = fs.openSync('./public/js/toLoad.js', 'w');
let loadString = 'let loader = [\n';
for (let i = 0; i < files.length; i++){
    // if(files[i].length > 11 && files[i].slice(-11) === ) continue;
    if((/(.sprite.png)$/.test(files[i]))) continue;
    loadString += "  ";
    let extensionLength = files[i].length > 4 && files[i].slice(-4) === '.png' ? -4 : -5;
    loadString += `['${files[i].slice(0, extensionLength)}','/img/${files[i]}'],\n`;
}
for (let i = 0; i < files2.length; i++){
  if(!(/(.json)$/.test(files2[i]))) continue;
    loadString += "  ";
  loadString += `['${/(.+).json/.exec(files2[i])[1]}', '/js/maps/${files2[i]}']`;
  if(i < (files2.length-1)) loadString += ',\n';
}
loadString += '\n]; \nexport { loader };';
fs.writeSync(file, loadString);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
