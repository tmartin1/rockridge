/* Directive for displaying input fields as togglable text/input elements.

  Directive parameters:
    plan - Enables two-way data binding with the user's plan. This should (almost) always be plan="plan".
    bind - Defines which property of the plan this field should represent.
    type - What kind of data type. Default type is 'text'.
    style - Define specific styles for the text and input field.

  How to use in the HTML template:

  <preview plan="plan" bind="[PROPERTY_TO_BIND_TO]"></preview>

  example:
  <preview plan="plan" bind="firstname"></preview> <!-- will create a preview field bound to plan.firstname -->

  You may also pass in style attribute if needed (ex. style="text-align:right")
*/

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
      type: '@',
      style: '@'
    },
    controller: function($scope) {
      
      // Switch between text field (read only) and input field (editable).
      $scope.toggle = function() {
        $scope.edit = !$scope.edit;
      };
      // Default edit icon to hidden.
      $scope.showIcon = false;
    },
    templateUrl: './components/preview/previewTemplate.html'
  };
});
