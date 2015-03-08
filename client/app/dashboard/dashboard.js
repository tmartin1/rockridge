'use strict';

angular.module('rockridge')
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'app/dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  })
  .state('dashboard.views', {
    views: {
      'goals': {
        templateUrl: 'app/dashboard/goals/goals.html',
        controller: 'GoalsCtrl'
      },
      'my-plan': {
        templateUrl: 'app/dashboard/my-plan/my-plan.html',
        controller: 'MyPlanCtrl'
      },
      'tutorials': {
        templateUrl: 'app/dashboard/tutorials/tutorials.html',
        controller: 'TutorialsCtrl'
      }
    }
  });
});
