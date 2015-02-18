// ****************************************************************************
// Pease read the Question-Directive-README.md before editing this file.
// ****************************************************************************
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

// Invoked from within the questions directive template.
// Accepts a single question object as a parameter.
.directive('question', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      query: '=',
      plan: '='
    },
    controller: function($scope) {
      // Add new row for table type inputs.
      $scope.addRow = function(property) {
        $scope.plan[property] = $scope.plan[property] || [];
        $scope.plan[property].push({});
      };
      // Delete target row for table type inputs.
      $scope.deleteRow = function(index, property) {
        $scope.plan[property].splice(index, 1);
      };
    },
    templateUrl: './components/questions/questionTemplate.html'
  };
})
