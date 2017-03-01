angular.module('tvshows')
  .controller('SearchController', SearchController)

  SearchController.$inject = ['ShowApiService', '$http']

  function SearchController (ShowApiService, $http) {
    var vm = this;

    vm.username = '';
    vm.query = '';
    vm.handleSearch = handleSearch;
    vm.addShow = addShow

    getUsername();
    function getUsername() {
      $http
        .get('/user')
        .then(function(res) {
          console.log(res)
        }, function(err) {
          console.log(err)
        });
    }

    // find shows from API Based on User Query
    function handleSearch () {
      ShowApiService.searchAll(vm.query, function(res) {
        console.log(res)
        vm.results = res.data;
        vm.query = ''
      })
    }

    // add shows to user's list on show selection
    function addShow (showId) {
      console.log(showId) //id of show show selection

      // sending show ID to API service & returning show information
      ShowApiService.returnOne(showId, function(res) {
        console.log(res);
        vm.selectedShow = res.data //saving returned API show to selectedShow object
        console.log(vm.selectedShow) //Selected show Object
        console.log(vm.selectedShow.name)
      })

      // updating database with show id



    }

  }
