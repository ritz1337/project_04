angular.module('tvshows')
  .controller('SearchController', SearchController)

  SearchController.$inject = ['ShowApiService', '$http','Comm']

  function SearchController (ShowApiService, $http, Comm) {
    var vm = this;

    vm.user = {};
    vm.query = '';
    vm.handleSearch = handleSearch;
    vm.addShow = addShow

    vm.comm = Comm;

    getUsername();


    vm.runningTest = function () {
      console.log('runningTest')
      vm.comm.test = 'aosidjfoaisjdf'
    }


    // fetching current user object from the server
    function getUsername() {
      $http
        .get('/user')
        .then(function(res) {
          console.log(res) //USER OBJECT
          vm.user = res.data
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
        vm.comm.saveToDatabase(showId)

      })


      // updating database with show id


    }

  }
