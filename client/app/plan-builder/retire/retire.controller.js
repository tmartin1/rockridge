'use strict';

angular.module('rockridge')
.controller('RetireCtrl', function($scope) {
  // assign collected info to $scope.plan, defined in parent state: plan-builder.controller.js

  // $scope.queries must be an array of question objects in the order that they should appear to
  // the user. Question objects have a specific format that must be followed. For more info, see
  // client/components/question/questions.directive.js
  $scope.queries = [
    {
      title: 'Retirement Goals',
      type: 'multi',
      subqueries: [
        {
          question: 'At what age would you like to retire?',
          type: 'number',
          bind: 'targetRetirementAge'
        }, {
          question: 'How much money would you expect to need each month during retirement (in today\'s dollars, results will be adjusted for inflation)?',
          type: 'number',
          bind: 'targetRetirementIncome'
        }, {
          question: 'If you have a pention, enter the monthly income it will provide below:',
          type: 'number',
          bind: 'pentionIncome'
        }
      ]
    }
  ];

});
