'use strict';

angular.module('rockridge')
.controller('LoginCtrl', function($scope, Auth, $window) {
  // should redirect to 'my-plan' on successful login
  $scope.user = {};
  $scope.login = function() {
    Auth.login($scope.user)
    .then(function(user) {
        $window.location.href = '/my-plan';
    });
  };
});
