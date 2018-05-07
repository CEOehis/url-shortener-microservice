var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CounterSchema = new Schema({
  _id: { type: String, default: 'counter_table'},
  count: { type: Number, default: 0}
});

module.exports = mongoose.model('Counter', CounterSchema);