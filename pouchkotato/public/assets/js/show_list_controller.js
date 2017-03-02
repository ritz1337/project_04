angular.module('tvshows')
  .controller('ShowListController', ShowListController)

ShowListController.$inject = ['$http','Comm']

function ShowListController ($http, Comm) {
    var vm = this;

    vm.comm = Comm
    vm.test = "TEST"

  }
