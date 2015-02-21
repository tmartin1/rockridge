'use strict';

/** Needed information:
      * these are just approximations, they don't need to be, nor should they be exact figures (be sure to convey this to the user)
      * payroll deductions (insurances, pre-tax retirement contributions)
        - this will come after the tax projection, so we will already have the retirement contributions, if any.
      * fixed expenses (mortgage/rent, utilities, min. loan payments, insurance payments, groceries, child care, alimony, etc.)
        - this will come after the tax projection, so we will already have the mortgage payment if the user owns a home.
      * variable expenses (entertainment, dinning out, travel, etc.)
**/

angular.module('rockridge')
.controller('MsaCtrl', function($scope) {
  // assign collected info to $scope.plan, defined in parent state: plan-builder.controller.js

  // $scope.queries must be an array of question objects in the order that they should appear to
  // the user. Question objects have a specific format that must be followed. For more info, see
  // client/components/question/questions.directive.js
  $scope.queries = [
    {
      title: 'Payroll Deductions',
      type: 'multi',
      subqueries: [
        {
          question: "Enter the total deductions from your paycheck (not including retirement contributions):",
          bind: 'userPayrollDeductions',
          type:'number'
        }, {
          question: "Enter the total deductions from " + $scope.plan.spouseFirstName + "'s' paycheck (not including retirement contributions):",
          bind: 'spousePayrollDeductions',
          type: 'number',
          condition: 'maritalStatus'
        }, {
          question:"Please enter any other tax deductions here:",
          type:'number',
          bind:'otherDeductions'
        }
      ]
    }, {
      title: 'Fixed Expenses',
      type: 'table',
      bind: 'fixedExpenses',
      question: 'Fixed expenses are the ones that you would consider necessary to get by (mortgage payments, groceries, utilities, child care expenses, etc.).',
      fields: [
        {
          label: 'Fixed Expense Name',
          type: 'text'
        }, {
          label: 'Monthly Expense',
          type: 'number'
        }
      ]
    }, {
      title: 'Flexible Expenses',
      type: 'table',
      bind: 'flexibleExpenses',
      question: 'Flexible expenses are the ones that you could live without if you needed to (travel, dining out, etc.) As you may not travel every month, try to approximate by taking your annual travel expense and dividing it by twelve.',
      fields: [
        {
          label: 'Flexible Expense Name',
          type: 'text'
        }, {
          label: 'Monthly Expense',
          type: 'number'
        }
      ]
    }
  ];

});
