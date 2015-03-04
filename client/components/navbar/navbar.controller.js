'use strict';

angular.module('rockridge')
.controller('NavbarCtrl', function($scope, $state, $location, Auth) {
  $scope.user = {};
  $scope.isLoggedIn = Auth.isLoggedIn;

  $scope.menu = [{
    'title': 'About',
    'link': 'about',
    'shown': true
  }, {
    // Link to plan-builder only shows if the user has not completed it yet.
    'title': 'Start Planning',
    'link': 'plan-builder.start',
    'shown': !$scope.user.builderComplete,
    'abstractLink': 'plan-builder'
  }, {
    // Link to dashboard only shows when user is logged in.
    'title': 'Dashboard',
    'link': 'dashboard',
    'shown': 'isLoggedIn()'
  }, {
    'title': 'Rockridge University',
    'class': 'fa fa-graduation-cap',
    'link': 'university',
    'shown': true,
    'abstractLink': 'university'
  }];

  $scope.logout = function() {
    Auth.logout();
    $location.path('/');
  };

  $scope.signup = function() {
    $('.ui.modal').modal('hide');
    Auth.createUser($scope.user);
  };

  $scope.login = function() {
    $('.ui.modal').modal('hide');
    Auth.login($scope.user);
  };

  // Sets active class on sidebar.
  $scope.isActive = function(viewLocation) {
    return $state.includes(viewLocation);
  };

  // Shows signup/login modal.
  $scope.showModal = function(type) {
    $scope.modalType = type;
    $('.ui.modal').modal('show');
    $scope.submitForm = $scope[type]; // Set submit function to login or signup.
  };


});
