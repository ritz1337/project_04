var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  name: String,
  google_id: String

});

module.exports = mongoose.model('User', UserSchema);
