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
          question:"What is your annual PRE-tax retirement contribution (401K, 403B, 401A, etc.)?",
          type:'number',
          bind:'user401kContribution'
        }, {
          question:"What is " + $scope.plan.spouseFirstName + "'s annual PRE-tax retirement contribution (401K, 403B, 401A, etc.)?",
          type:'number',
          bind:'spouse401kContribution',
          condition:'maritalStatus'
        },{
          question:"What is your annual POST-tax retirement contribution (Roth IRA)?",
          type:'number',
          bind:'userRothContribution'
        }, {
          question:"What is " + $scope.plan.spouseFirstName + "'s annual POST-tax retirement contribution (Roth IRA)?",
          type:'number',
          bind:'spouseRothContribution',
          condition:'maritalStatus'
        }]
    }, {
      title: 'Primary Residence',
      type: 'multi',
      subqueries: [
        {
          question: "Do you have a mortgage for your primary residence?",
          bind: 'hasPrimaryResidence',
          type: 'select',
          options: [ { text:'Yes', value:true }, { text:'No', value:false } ]
        }, {
          question: "When did you purchase or last refinance your home (whichever was most recent)?",
          bind: 'mortgageStartDate',
          type: 'month',
          condition: 'hasPrimaryResidence'
        }, {
          question: "What is the current balance owed on the mortgage for your primary residence?",
          bind: 'mortgageCurrentBalance',
          type: 'number',
          condition: 'hasPrimaryResidence'
        }, {
          question: "What was the original balance of your mortgage, or it's balance at last refinance (whichever was most recent)?",
          bind: 'mortgageInitialBalance',
          type: 'number',
          condition: 'hasPrimaryResidence'
        }, {
          question: "What is the interest rate on your mortgage?",
          bind: 'mortgageCurrentRate',
          type: 'number',
          condition: 'hasPrimaryResidence'
        }, {
          question: "What is the term of your current mortgage (years)?",
          bind: 'mortgageCurrentTerms',
          type: 'number',
          condition: 'hasPrimaryResidence'
        }
      ]
    }, {
      title: 'Other Considerations',
      type: 'multi',
      subqueries: [
        {
          question:"How many dependents do you intend on declaring this year?",
          type:'number',
          bind:'dependents'
        }, {
          question:"What are your total annual charitable contributions?",
          type:'number',
          bind:'charitableContributions'
        }, {
          question:"Please enter any other tax deductions here:",
          type:'number',
          bind:'otherDeductions'
        }
      ]
    }
  ];

});
