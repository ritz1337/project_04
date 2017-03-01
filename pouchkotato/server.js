const express = require('express');
const path = require('path');
const logger = require('morgan');
const parser = require('body-parser');
const session = require('express-session');
const app = express();
require('dotenv').config();
const mongoose = require('./api/config/db/database');


app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true }));

app.use(logger('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', require('./api/config/routes/auth.js'));
app.use('/profile', require('./api/config/routes/profile.js'));
app.use('/user', require('./api/config/routes/user.js'));

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('PouchKotato app listening on port 3000!')
})
