angular.module('tvshows')
  .service('Comm', Comm)

  Comm.$inject = ['$http', 'ShowApiService']

  function Comm ($http, ShowApiService) {
    var test = 'Hello'
    var showIds = [];
    var shows = [];

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
          // console.log(res.data.shows); //array of show IDs associated with user document
          for(var i = 0; i < res.data.shows.length; i++) {
            ShowApiService.returnOne(res.data.shows[i], function(oneShow) {
                // console.log('each show', oneShow) //API queried for each show ID in user document
                var showData = oneShow.data
                console.log(showData)
              // checks if show already exists in show array before pushing
              if (!isInArray(showData, shows)) {
               shows.push(showData)
              }
            })
            // console.log(shows)
            //pushing show ids to an array for testing
            // if (!isInArray(res.data.shows[i], showIds)) {
            //   showIds.push(res.data.shows[i])
            // }
          }
          console.log(shows)
          // console.log(shows.length)


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
