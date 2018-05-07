var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UrlSchema = new Schema({
  url: {type: String}
}, {
  timestamps: {
    createdAt: 'created'
  }
});

module.exports = mongoose.model('Url', UrlSchema);
