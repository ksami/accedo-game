var mongoose = require('mongoose');

var Score = mongoose.model('Score', {
  user: {name: String, email: String},
  value: Number,
  date: {type: Date, default: Date.now}
});

module.exports = Score;