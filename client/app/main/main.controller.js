'use strict';

angular.module('rockridge')
.controller('MainCtrl', function($scope, $http) {
  $scope.click = function() {
    console.log('hey');
  };
});
