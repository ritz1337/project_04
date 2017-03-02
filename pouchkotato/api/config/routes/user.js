// currently redundant

const express = require('express');
const request = require('request');
const router = express.Router();
const path = require('path');
const methodOverride = require('method-override');
const User = require('../models/user');

// const showApi = require('../showapi/tvmaze');

// //send shows.html on successful login
// router.get('/', (req, res, next) => {
//   const user = req.session.user;
//   if (!user) return res.redirect('/');
//   res.sendFile(path.join(__dirname, '../../../public', 'shows.html'));
// });

// router.post('/shows/search', (req, res, next) => {
//   const user = req.session.user;
//   if(!user) return res.redirect('/');
//   const input = req.body.input
//   console.log(input) //exact user input
//   showApi.search(input, (results) => {
//     // res.json({results});
//     res.json(results) //array of objects
//   })

// })

// processing angular get request and sending back user object
router.get('/', (req, res, next) => {
  const user = req.session.user;
    if(!user) return res.redirect('/');
  // console.log('hi')
    res.send(user);
});

router.get('/shows/all', (req, res, next) => {
  var gId = req.session.user.id
  User.find({google_id: gId}, 'shows', function (err, data) {
    if (err) console.log(err);
    else {
      console.log(data[0]) //gID + shows array
      res.json(data[0])
    }
  })
})

router.put('/shows/add/:id', (req, res, next) => {
  var showId = req.params.id
  console.log(showId);
  var gId = req.session.user.id
  console.log(gId) //user's google ID

    User.update({google_id: gId},
      {
        $addToSet: {"shows": showId} //addToSet pushes only if value doesn't already exist in the array
      },
      function (err, res) {
        if (err) console.log(err);
        else console.log(res);
      }
    )
  res.json({message: "ShowId successfully added"});

})
module.exports = router;
