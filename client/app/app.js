'use strict';

angular.module('rockridge', [
  'ui.router'])
.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $urlRouterProvider
  .otherwise('/');

  $locationProvider.html5Mode(true);
  //$httpProvider.interceptors.push('authInterceptor');
});
