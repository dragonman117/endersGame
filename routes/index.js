var express = require('express');
var router = express.Router();
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {

  let files = fs.readdirSync('./public/img/');

  let file = fs.openSync('./public/js/loader.js', 'w');
  let loadString = 'let loader = [\n';
  for (let i = 0; i < files.length; i++){
    if(files[i].length > 11 && files[i].slice(-11) === ".sprite.png") continue;
    if(i !== 0) loadString += ',';
    let extensionLength = files[i].length > 4 && files[i].slice(-4) === '.png' ? -4 : -5;
    loadString += `['${files[i].slice(0, extensionLength)}','/img/${files[i]}']\n`;
  }
  loadString += ']; export { loader };';
  fs.writeSync(file, loadString);
  res.render('index', { title: 'Express' });
});

module.exports = router;
