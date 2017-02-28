var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: String,
  google_id: String,
  f_name: String,
  l_name: String,

});

module.exports = mongoose.model('User', UserSchema);
