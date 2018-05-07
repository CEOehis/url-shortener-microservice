var Url = require('../models/url');
var btoa = require('btoa');

module.exports = {

  // create short url
  shorten: function(req, res, next) {

    // object to hold shortener result
    var shortened = {
      original_url: req.params.url
    };

    var url = new Url({
      url: req.params.url,
    });

    // check to see if url exist on db before saving
    Url.findOne({ 'url': req.params.url }, function(err, foundUrl) {
      if(err) {
        return next(err);
      }
      if(foundUrl) {
        // otherwise url already exists. no need rehashing, just return url id
        console.log('url was already exists');
        shortened.short_url = btoa(foundUrl._id);
        // return short url to user
        res.send(shortened);
      } else {
        // doesn't exist in db, better create new one
        url.save(function(err) {
          if(err) {
            return next(err);
          }
          // hash url._id with btoa module and return as short_url
          shortened.short_url = btoa(url._id);
          // return short url to user
          res.send(shortened);
        });
      }
    })

  }
}