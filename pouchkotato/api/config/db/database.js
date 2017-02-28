const mongoose = require('mongoose');

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/pouchapp'
mongoose.connect(url);

module.exports = mongoose;
