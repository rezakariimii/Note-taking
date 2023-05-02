(function () {
  "use strict";

  angular.module("app").config(RoutesConfig);

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/");
      
      $stateProvider

  // Home page
  .state('home', {
    url: '/',
      templateUrl: 'src/notelist/templates/home.template.html',
      controller: "HomeCtrl as home"  
  })

  .state('notes', {
    url: '/notes',
    templateUrl: 'src/notelist/templates/notes.template.html',
    controller: 'TodoCtrl as todo',
  })
  }
})();
