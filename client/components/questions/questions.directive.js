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
      plan: '=',
      sections: '='
    },
    controller: function($scope) {
      // By default, the first question in the series is opened
      $('.ui.accordion').accordion('open', $scope.queries[0].index);

      $scope.select = function(question) {
        $('.ui.accordion').accordion(question.index);
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
      plan: '=',
      sections: '='
    },
    controller: function($scope) {

      var makeRow = function(){
        var row = {};
        for(var i = 0; i < $scope.query.fields.length; i++){
          row[$scope.query.fields[i].label] = '';
        }
        return row;
      };

      $scope.addRow = function(property) {
        $scope.plan[property] = $scope.plan[property] || [];
        $scope.plan[property].push(makeRow());
      };
      $scope.deleteRow = function(index, property) {
        $scope.plan[property].splice(index, 1);
      };
      $scope.isEnabled = function(title){
        return $scope.sections.enabled[title];
      };
      $scope.isComplete = function(title){
        return $scope.sections.complete[title];
      };

      // If property is empty and input type is a table, start with an empty row.
      if ($scope.query.type === 'table') {
        $scope.plan[$scope.query.bind] = $scope.plan[$scope.query.bind] || [makeRow()];
      }
    },
    templateUrl: './components/questions/questionTemplate.html'
  };
})
