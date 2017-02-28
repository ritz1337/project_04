const express = require('express');
const request = require('request');
const router = express.Router();
const path = require('path');
const showApi = require('../showapi/tvmaze');

//send shows.html on successful login
router.get('/', (req, res, next) => {
  const user = req.session.user;
  if (!user) return res.redirect('/');
  res.sendFile(path.join(__dirname, '../../../public', 'shows.html'));
});

router.post('/shows/search', (req, res, next) => {
  const user = req.session.user;
  if(!user) return res.redirect('/');
  const input = req.body.input
  console.log(input) //exact user input
  showApi.search(input, (results) => {
    // res.json({results});
    res.json(results) //array of objects
  })

})

module.exports = router;
