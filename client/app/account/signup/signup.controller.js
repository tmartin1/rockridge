'use strict';

angular.module('rockridge')
.controller('SignupCtrl', function($scope, Auth, $window) {
  $scope.user = {};
  $scope.signup = function(){
    Auth.createUser($scope.user)
    .then(function(){
      $window.location.href = '/';
    });
  }
});
