var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index', {title: 'url-shortener'});
});

app.listen(port, function(err) {
  if(err) throw err;
  console.log('Server started ... \nlistening on port', port);
});
