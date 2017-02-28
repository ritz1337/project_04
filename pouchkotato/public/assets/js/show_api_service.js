angular.module('tvshows')
  .service('ShowApiService', ShowApiService)

  ShowApiService.$inject = ['$http']

  function ShowApiService ($http) {

    function search(input, cb) {
      const url = `http://api.tvmaze.com/search/shows?q=${input}`
      return $http({
        method: 'GET',
        url: url
      }).then(cb)
    }


    return {
      search: search
    }
  }
