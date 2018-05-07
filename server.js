var express = require('express');
var app = express();

//set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/urlshortenerDB';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

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
