angular.module('tvshows')
  .service('ShowApiService', ShowApiService)

  ShowApiService.$inject = ['$http']

  function ShowApiService ($http) {

    function searchAll(input, cb) {
      const url = `http://api.tvmaze.com/search/shows?q=${input}`
      return $http({
        method: 'GET',
        url: url
      }).then(cb)
    }

    function returnOne(input, cb) {
      const url = `http://api.tvmaze.com/shows/${input}`
      console.log(url);
      return $http({
        method: 'GET',
        url: url
      }).then(cb)
    }


    return {
      searchAll: searchAll,
      returnOne: returnOne
    }
  }


// api route to get info on particular show
// http://api.tvmaze.com/shows/{{showid}}
