var express = require('express');
var app = express();

var shortenRouter = require('./routes/shorten');

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index', {title: 'url-shortener'});
});

app.use('/api/shorten', shortenRouter);

app.listen(port, function(err) {
  if(err) throw err;
  console.log('Server started ... \nlistening on port', port);
});
