var mongoose = require('./database');

var User = require('../models/user');

var users = [
  {"username": "User1", "google_id": "100761763622898023421", "f_name": "User", "l_name": "1"},
  {"username": "User2", "google_id": "100761763622898023422", "f_name": "User", "l_name": "2"},
  {"username": "User3", "google_id": "100761763622898023423", "f_name": "User", "l_name": "3"},
  {"username": "User4", "google_id": "100761763622898023424", "f_name": "User", "l_name": "4"},

];

User.remove({}, function(err) {
  if (err) console.log(err);
  User.create(users, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + users.length  + " users.");
      mongoose.connection.close();
    }
    process.exit();
  });
});

//
//   username: String,
//   google_id: String,
//   f_name: String,
//   l_name: String,
