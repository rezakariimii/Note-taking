!function(){"use strict";function t(t,e){e.otherwise("/"),t.state("home",{url:"/",templateUrl:"src/notelist/templates/home.template.html",controller:"HomeCtrl as home"}).state("notes",{url:"/notes",templateUrl:"src/notelist/templates/notes.template.html",controller:"TodoCtrl as todo"})}angular.module("app").config(t),t.$inject=["$stateProvider","$urlRouterProvider"]}();