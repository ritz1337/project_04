const express = require('express');
const request = require('request');
const router = express.Router();

var User = require('../models/user');


router.get('/', (req, res, next) => {
  const user = req.session.user;
  console.log(req.session)
  if (!user) return res.redirect('/');
  console.log(req.session.user.id)

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
    console.log(user)
    req.session.user = user;
    console.log(user.id)
    User.find({
      google_id: user.id
    }, (err, data) => {
        if (err) {
          throw err;
        } else if (!data[0]) {
          const newuser = new User ({
            username: user.displayName,
            google_id: user.id,
            f_name: user.name.givenName,
            l_name: user.name.familyName,
          })
          newuser.save(err => {
            if (err) console.log(err);
              else console.log('unique user created', user.displayName)
          })
        }
    })

    return res.redirect('/profile');
  })
});

module.exports = router;
