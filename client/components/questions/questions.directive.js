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
    templateUrl: './components/questions/questionsTemplate.html'
  };
})

/* Invoked from within the questions directive template.
 * Accepts a single question object as a parameter. Example question object:
 * var query = {
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

// Displays the menu and links to questions within the current plan-builder state.
// TODO: Make this display the sub-sections in an accordion style on the screen.
.directive('qmenu', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    controller: function($scope) {
      var questions = $scope.questions = [];
      $scope.select = function(question) {
        angular.forEach(questions, function(question) {
          question.selected = false;
        });
        question.selected = true;
      };
      this.addQuestion = function(question) {
        if (questions.length === 0) {
          $scope.select(question);
        }
        questions.push(question);
      };
    },
    templateUrl: './components/questions/qmenu.html'
  };
})

// Directive for each individual question view. Visible only when "selected".
.directive('qview', function() {
  return {
    require: '^qmenu',
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@'
    },
    link: function(scope, element, attrs, tabsCtrl) {
      console.log('inside qview directive');
      tabsCtrl.addQuestion(scope);
    },
    template: '<div ng-show="selected" ng-transclude></div>'
  };
});
