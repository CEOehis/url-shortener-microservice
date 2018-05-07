var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Counter = require('./counter');

var UrlSchema = new Schema({
  _id: Number,
  url: String
}, {
  timestamps: {
    createdAt: 'created'
  }
});

UrlSchema.pre('save', function(next) {
  // use arrow function to have access to 'this'(which points to the url instance)
  Counter.findByIdAndUpdate({_id: 'counter_table'}, { $inc: { count: 1 }}, {}, (err, counter) =>{
    console.log('inside arrow', this);
    if(err) {
      return next(err);
    }
    this._id = counter.count;
    return next();
  });
});

module.exports = mongoose.model('Url', UrlSchema);
