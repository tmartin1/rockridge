'use strict';

angular.module('rockridge')
.controller('NavbarCtrl', function($scope, $state, $location, Auth) {

  $scope.menu = [{
    'title': 'Home',
    'link': 'main',
    'shown': true
  }, {
    'title': 'About',
    'link': 'about',
    'shown': true
  }, {
    'title': 'My Plan',
    'link': 'my-plan',
    'shown': 'isLoggedIn()'
  }, {
    'title': 'Start Planning',
    'link': 'plan-builder.start',
    'shown': '!isLoggedIn()',
    'abstractLink': 'plan-builder'
  }];
  // , {
  //   'title': 'Rockridge University',
  //   'class': 'fa fa-graduation-cap',
  //   'link': 'university.welcome',
  //   'shown': true,
  //   'abstractLink': 'university'
  // }];

  $scope.logout = function() {
    Auth.logout();
    $location.path('/');
  };

    $scope.isLoggedIn = function() {
      return Auth.isLoggedIn();
    };

      // Sets active class on sidebar.
  $scope.isActive = function(viewLocation) {
    return $state.includes(viewLocation);
  };
});
