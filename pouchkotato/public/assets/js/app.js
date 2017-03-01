// angular.module('tvshows', [])

(function() {
  'use strict';

  angular.module('tvshows', ['ui.router'])
    .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

  function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('shows', {
        // url: '/shows',
        url: '/shows',
        templateUrl: 'shows.html'
      })
      .state('calendar', {
        url: '/calendar',
        templateUrl: 'calendar.html'
      });

    $urlRouterProvider.otherwise('/');
  }
}());
