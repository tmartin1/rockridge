'use strict';

/*
Needed information:
  * this is not a tax return document, it's just an estimation, convey this to client.
  * mortgage info (payments, purchase month, interest rate, mortgage term, down payment, remaining balance)
  * pre-tax retirement contributions (user and spouse)
  * charitable contributions
*/

angular.module('rockridge')
.controller('TaxProjectionCtrl', function($scope) {
  // assign collected info to $scope.plan, defined in parent state: plan-builder.controller.js

  // $scope.queries must be an array of question objects in the order that they should appear to
  // the user. Question objects have a specific format that must be followed. For more info, see
  // client/components/question/questions.directive.js
  $scope.queries = [
    {
      title: 'Retirement Contributions',
      type: 'multi',
      subqueries: [
        {
          question:"What is your annual pre-tax retirement contribution (401K, 403B, 401A, etc.)?",
          type:'number',
          bind:'user401kContribution'
        }, {
          question:"What is " + $scope.plan.spouseFirstName + "'s annual pre-tax retirement contribution (401K, 403B, 401A, etc.)?",
          type:'number',
          bind:'spouse401kContribution',
          condition:'maritalStatus'
        }]
    }, {
      title: 'Primary Residence',
      question: "Do you have a mortgage for your primary residence?",
      bind: 'primaryResidence',
      type: 'multi',
      subqueries: ''
    }
  ];

});
