angular.module('tvshows')
  .service('Comm', Comm)

  Comm.$inject = ['$http']

  function Comm ($http) {
    var test = 'Hello'
    var showIds = [];

    function saveToDatabase(showId) {
      $http
        .put(`/user/shows/add/${showId}`, {showId})
        .then(function(res) {
          console.log(res.data.message);
        },
        function(err) {
          console.log(err);
        })
        .then(getAllShows())
    }

    function isInArray(value, array) {
      return array.indexOf(value) > -1;
    }

    var getAllShows = function() {
      $http
        .get(`/user/shows/all`)
        .then(function(res) {
          // showIds = []; //commenting this out displays showIds
          console.log(res.data.shows); //array of show IDs
          for(var i = 0; i < res.data.shows.length; i++) {
            if (!isInArray(res.data.shows[i], showIds)) {
              showIds.push(res.data.shows[i])
            }
          }
          console.log(showIds)
        },
        function(err) {
          console.log(err)
        })
    }

    return {
      test: test,
      showIds: showIds,
      saveToDatabase: saveToDatabase,
      getAllShows: getAllShows
    }


  }



// api route to get info on particular show
// http://api.tvmaze.com/shows/{{showid}}
