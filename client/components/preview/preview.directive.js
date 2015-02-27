/* Directive for displaying input fields as togglable text/input elements.

  Directive parameters:
    object - Enables two-way data binding with the user's plan.
             NOTE: This must be an object and the property you are binding to must be on the first level of this object.
             object="plan" would work for 1st level plan items, like plan.spouseFirstName but not plan.mortgage.initialBalance
             in that case you would have to define object="plan.mortgage"
    property - Defines which property of the plan this field should represent. See above comment for details on nested objects.
    type - What kind of data type. Default type is 'text'.
    style - Define specific styles for the text and input field.

  How to use in the HTML template:

  <preview object="plan" property="[PROPERTY_TO_BIND_TO]"></preview>

  The following example will create a preview field bound to plan.firstname:
  <preview object="plan.mortgage" property="homeValue"></preview>

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
      object: '=',
      property: '@',
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
