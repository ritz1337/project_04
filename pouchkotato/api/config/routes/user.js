const express = require('express');
const request = require('request');
const router = express.Router();
const path = require('path');


router.get('/', (req, res, next) => {
  const user = req.session.user;
  if (!user) return res.redirect('/');
  res.sendFile(path.join(__dirname, '../../../public', 'shows.html'));
  // res.sendFile('shows.html');
});

module.exports = router;
