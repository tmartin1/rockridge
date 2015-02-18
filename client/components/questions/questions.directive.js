'use strict';

angular.module('rockridge')

// For displaying a collection of questions within one of the plan-builder sub-states.
// Accepts an array of queries objects as a parameter (see question directive for info on query objects.)
.directive('questions', function() {
  return {
    restrict: 'E',
    scope: {
      queries: '=',
      plan: '='
    },
    controller: function($scope) {
      $scope.select = function(question) {
        angular.forEach($scope.queries, function(question) {
          question.selected = false;
        });
        question.selected = true;
      };
    },
    templateUrl: './components/questions/questionsTemplate.html'
  };
})

/* Invoked from within the questions directive template.
 * Accepts a single question object as a parameter. Example question object:
 * var query = {
 *   title: required, string, 1-3 words for the link/accordion header title,
 *   question: required, string, text to display to the user to retreive needed info,
 *   type: required, string, determine type of input to show: text, select, check, radio, buttons, table,
 *   bind: required, string, defines what variable of the plan object the input should bind to,
 *   options: required if select, check, radio, buttons, array of strings for option labels (will also be their value),
 *   next: not required, function, return index of next question, if undefined, then the next question in the array will be displayed
 * }
 */
.directive('question', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      query: '=',
      plan: '='
    },
    templateUrl: './components/questions/questionTemplate.html'
  };
})
