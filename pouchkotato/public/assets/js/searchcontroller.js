angular.module('tvshows')
  .controller('SearchController', SearchController)

  SearchController.$inject = ['ShowApiService']

  function SearchController (ShowApiService) {
    var vm = this;

    vm.query = ''
    vm.handleSearch = handleSearch;

    function handleSearch () {
      ShowApiService.search(vm.query, function(res) {
        console.log(res)
        vm.data = res.data;
      })
    }


  }
