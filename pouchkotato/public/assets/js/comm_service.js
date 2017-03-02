angular.module('tvshows')
  .service('Comm', Comm)

  Comm.$inject = ['$http', 'ShowApiService', '$q']

  function Comm ($http, ShowApiService, $q) {
    var test = 'Hello'
    var showIds = [];
    // var shows = [{name: 'TEST'}];
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

    // NEW - ADAM W/PROMISES
    var isInArray = function(value, array) {
      return array.indexOf(value) > -1;
    }

    var getAllShows = function() {
      var promises = [];
      $http
        .get(`/user/shows/all`)
        .then(function(res) {
          // console.log(res.data.shows); //array of show IDs associated with user document
          for(var i = 0; i < res.data.shows.length; i++) {
            promises.push(ShowApiService.returnOne(res.data.shows[i]))
            // function(oneShow) {
            //     // console.log('each show', oneShow) //API queried for each show ID in user document
            //     var showData = oneShow.data
            //     console.log(showData)
            //   // checks if show already exists in show array before pushing
            //   if (!isInArray(showData, shows)) {
            //    shows.push(showData)
            //   }
            // })
            // console.log(shows)
            //pushing show ids to an array for testing
            // if (!isInArray(res.data.shows[i], showIds)) {
            //   showIds.push(res.data.shows[i])
            // }
          }

            $q.all(promises)
              .then(function (showArr) {
                for (var i = 0; i < showArr.length; i++) {
                  var showData = showArr[i].data;
                  if (shows.filter(s => s.id === showData.id).length >= 1) {
                    console.log('show with that id already exists')
                  } else {
                    shows.push(showData)
                  }
                  // if (!shows.includes(showData))
                  // if (!isInArray(showData, shows)) {
                  //   shows.push(showData)
                  //   console.log(shows)
                }
              })

        })
    }

    // OLD


    // var getAllShows = function() {
    //   $http
    //     .get(`/user/shows/all`)
    //     .then(function(res) {
    //       // console.log(res.data.shows); //array of show IDs associated with user document
    //       var showData = [];
    //       for(var i = 0; i < res.data.shows.length; i++) {
    //         ShowApiService.returnOne(res.data.shows[i], function(oneShow) {
    //             // console.log('each show', oneShow) //API queried for each show ID in user document
    //             showData.push(oneShow.data)
    //             console.log(showData[0])
    //             console.log(showData[0].id)
    //           // checks if show already exists in show array before pushing
    //         })
    //         shows = showData
    //         // console.log(shows)
    //         //pushing show ids to an array for testing
    //         // if (!isInArray(res.data.shows[i], showIds)) {
    //         //   showIds.push(res.data.shows[i])
    //         // }
    //       }
    //       console.log(shows)
    //       // console.log(shows.length)


    //     },
    //     function(err) {
    //       console.log(err)
    //     })
    // }



    return {
      test: test,
      showIds: showIds,
      saveToDatabase: saveToDatabase,
      getAllShows: getAllShows,
      shows: shows
    }
  }






// api route to get info on particular show
// http://api.tvmaze.com/shows/{{showid}}
