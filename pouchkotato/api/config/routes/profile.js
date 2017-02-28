const express = require('express');
const request = require('request');
const router = express.Router();

var User = require('../models/users');


router.get('/', (req, res, next) => {
  const user = req.session.user;
  console.log(req.session)
  if (!user) return res.redirect('/');
  console.log(req.session.user.id)
  var item = {
    name: req.session.user.displayName,
    google_id: req.session.user.id
  }
  var data = new User(item)
  data.save();

  res.redirect('/shows.html');
});

router.get('/me', (req, res, next) => {
  const url = 'https://www.googleapis.com/plus/v1/people/me';
  const access_token = req.session.access_token;
  if (!access_token) return res.redirect('/');
  const options = {
    method: 'GET',
    url,
    headers: { 'Authorization' : `Bearer ${access_token}`}
  }
  request(options, (err, response, body) => {
    const user = JSON.parse(body);
    req.session.user = user;
    return res.redirect('/profile');
  })
});

module.exports = router;
