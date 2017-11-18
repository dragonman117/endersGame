var express = require('express');
var router = express.Router();
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {

  let files = fs.readdirSync('./public/js/objects/');

  let file = fs.openSync('./public/js/loader.js');
  let loadString = 'let loader = [';
  for (let i = 0; i < files.length; i++){
    loadString += "'/js" + files[i] +"'";
  }
  loadString += ']; export { loader };';
  fs.writeSync(file, loadString);
  res.render('index', { title: 'Express' });
});

module.exports = router;
