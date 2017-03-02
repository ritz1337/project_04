angular.module('tvshows')
  .service('Comm', Comm)

  Comm.$inject = ['$http']

  function Comm ($http) {
    var test = 'Hello'

    function saveToDatabase(showId) {
      $http
        .put(`/user/show/add/${showId}`, {showId})
        .then(function(res) {
          console.log(res.data.message);
        },
        function(err) {
          console.log(err);
        })

    }

    return {
      test: test,
      saveToDatabase: saveToDatabase
    }
  }



// api route to get info on particular show
// http://api.tvmaze.com/shows/{{showid}}
