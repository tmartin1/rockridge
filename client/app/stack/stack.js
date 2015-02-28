'use strict';

angular.module('rockridge')
.config(function ($stateProvider) {
  $stateProvider
  .state('stack', {
    url: '/stack',
    templateUrl: 'app/stack/stack.html',
    controller: 'StackCtrl'
  });
});
