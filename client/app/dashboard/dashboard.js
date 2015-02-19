'use strict';

angular.module('rockridge')
.config(function($stateProvider) {
  $stateProvider
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'app/dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
});
