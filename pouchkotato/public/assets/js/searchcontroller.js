angular.module('tvshows')
  .controller('SearchController', SearchController)

  SearchController.$inject = ['ShowApiService',]

  function SearchController (ShowApiService) {
    var vm = this;

    vm.query = ''
    vm.handleSearch = handleSearch;
    vm.addShow = addShow

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
      console.log(showId)
      ShowApiService.returnOne(showId, function(res) {
        console.log(res);
        vm.selectedShow = res.data //saving returned API show to selectedShow object
        console.log(vm.selectedShow) //Selected show Object
        console.log(vm.selectedShow.name)
      })



    }

  }
