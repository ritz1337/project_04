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
