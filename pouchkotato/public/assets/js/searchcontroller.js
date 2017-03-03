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

    var searchResults = angular.element( document.querySelector( '.search-results-container' ) );

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
          // console.log(res) //USER OBJECT
          vm.user = res.data
        }, function(err) {
          console.log(err)
        });
    }

    // find shows from API Based on User Query
    function handleSearch () {
      ShowApiService.searchAll(vm.query, function(res) {
        // console.log(res) //returns show choices from search
        vm.results = res.data;
        console.log(vm.results)
        vm.query = ''
      })
      vm.resultClicked = false
      // searchResults.show();
    }

    // add shows to user's list on show selection
    function addShow (showId) {
      // console.log(showId) //id of show selection by user(button click)

      // sending show ID to API service & returning show information
      ShowApiService.returnOne(showId, function(res) {
        // console.log(res); //response object of queried show id
        vm.selectedShow = res.data //saving returned API show to selectedShow object
        // console.log(vm.selectedShow) //Selected show Object stored to variable
        // console.log(vm.selectedShow.name) //show object name
        vm.comm.saveToDatabase(showId)

      })
      // remove results div on show selection
      vm.resultClicked = true
      // searchResults.hide();


    }

  }
