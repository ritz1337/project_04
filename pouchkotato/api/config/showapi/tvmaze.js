const request = require('request');

function search(input, cb) {
  const url = `http://api.tvmaze.com/search/shows?q=${input}`
  request(url, (err, res, body) => {
    console.log(body);
    const data = JSON.parse(body)
    cb(data);
  })
}

module.exports = {
  search
}
