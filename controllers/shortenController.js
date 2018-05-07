var Url = require('../models/url');
var btoa = require('btoa');
var atob = require('atob');

module.exports = {

  // create short url
  shorten: function(req, res, next) {
    var projectUrl = req.protocol + '://' + req.get('host');
    var urlToBeShortened = req.params['0'].slice(1);
    // object to hold shortener result
    var shortened = {
      original_url: urlToBeShortened
    };

    var url = new Url({
      url: urlToBeShortened,
    });

    // check to see if url exist on db before saving
    Url.findOne({ 'url': urlToBeShortened }, function(err, foundUrl) {
      if(err) {
        return next(err);
      }
      if(foundUrl) {
        // otherwise url already exists. no need rehashing, just return url id
        console.log('url was already exists');
        shortened.short_url = projectUrl + '/' + btoa(foundUrl._id);
        // return short url to user
        res.send(shortened);
      } else {
        // doesn't exist in db, better create new one
        url.save(function(err) {
          if(err) {
            return next(err);
          }
          // hash url._id with btoa module and return as short_url
          shortened.short_url = projectUrl + '/' + btoa(url._id);
          // return short url to user
          res.send(shortened);
        });
      }
    })

  },

  // retrieve a url from its short url
  expand: function(req, res, next) {
    var shortUrl = req.params.shortUrl;
    var urlId = atob(shortUrl);

    Url.findById(urlId, function(err, url) {
      if(err) {
        return next(err);
      }
      console.log(url);
      res.redirect('http://' + url.url);
    })
  }

}