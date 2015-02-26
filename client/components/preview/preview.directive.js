// Directive for displaying input fields as togglable text/input elements.

'use strict';

angular.module('rockridge')

// For displaying a collection of questions within one of the plan-builder sub-states.
// Accepts a single object as a parameter with the following properties:
.directive('preview', function() {
  return {
    restrict: 'E',
    scope: {
      plan: '=',
      bind: '@',
      style: '@'
    },
    controller: function($scope) {
      // Switch between text field (read only) and input field (editable).
      $scope.toggle = function() {
        $scope.edit = !$scope.edit;
      };
    },
    templateUrl: './components/preview/previewTemplate.html'
  };
});
