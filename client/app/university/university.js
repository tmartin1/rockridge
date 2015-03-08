'use strict';

angular.module('rockridge')
.config(function ($stateProvider) {
  $stateProvider
  .state('university', {
    url: '/university',
    templateUrl: 'app/university/university.html',
    controller: 'UniversityCtrl'
  });
});
