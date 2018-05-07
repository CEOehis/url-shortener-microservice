var express = require('express');
var app = express();

var Counter = require('./models/counter');
var shortenController = require('./controllers/shortenController');

//set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/urlshortenerDB';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// check db to see if counter collection exists
Counter.find({_id: 'counter_table'}, function(err, res) {
  if(err) {
    console.error(err);
  }
  if(res.length) {
    // table already exists; skip creating
    console.log('counter table already exist', res);
    return;
  }
  // initialize counter collection with starting value
  var counter = new Counter({
    count: 10000
  })
  counter.save(function(err) {
    if(err) throw err;
    console.log('counter initialized');
  });
})

var shortenRouter = require('./routes/shorten');

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index', {title: 'url-shortener'});
});

app.get('/:shortUrl', shortenController.expand);

app.use('/api/shorten', shortenRouter);

app.listen(port, function(err) {
  if(err) throw err;
  console.log('Server started ... \nlistening on port', port);
});
