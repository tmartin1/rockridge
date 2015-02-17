'use strict';

angular.module('rockridge')
.controller('NwsCtrl', function($scope) {
  // assign collected info to $scope.plan, defined in parent state: plan-builder.controller.js

  // $scope.queries must be an array of question objects in the order that they should appear to 
  // the user. Question objects have a specific format that must be followed. For more info, see 
  // client/components/question/questions.directive.js
  $scope.queries = [
    {} // Enter question objects here
  ];

});
