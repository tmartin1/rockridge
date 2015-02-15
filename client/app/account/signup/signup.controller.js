'use strict';

angular.module('rockridge')
.controller('SignupCtrl', function($scope, Auth) {
  $scope.user = {};
  $scope.signup = function(){
    Auth.createUser($scope.user);
  }
});
