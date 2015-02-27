'use strict';

/*
Needed information:
  * fixed assets (checking/savings accounts, CDs, cash)
  * variable assets (401Ks, IRAs, non-retirement accounts)
  * personal assets (home value, car value, etc.)
  * liabilities (mortgage, auto loan, student loans, etc.)
    - for each liability, we need the balance, interest rate, min payment, current payment (may be more than min), expected change in interest rate (if it was an intro rate and it will jump to 24% in 5 months, etc.)
*/

angular.module('rockridge')
.controller('NwsCtrl', function($scope) {
  // assign collected info to $scope.plan, defined in parent state: plan-builder.controller.js
  $scope.plan.mortgage = $scope.plan.mortgage || {};

  // $scope.queries must be an array of question objects in the order that they should appear to
  // the user. Question objects have a specific format that must be followed. For more info, see
  // client/components/question/questions.directive.js
  $scope.queries = [{
    title: 'Fixed Assets',
    question: "Please enter your fixed assets (checking/savings accounts, CDs, cash, etc.) If you don't have any, feel free to move to the next section.",
    bind: 'fixedAssets',
    type: 'table',
    fields: [{
      label: 'Asset Name',
      type: 'text',
      textAlign: 'left',
      required: true
    }, {
      label: 'Value/Balance',
      type: 'number',
      textAlign: 'right',
      required: true
    }],
    index: 0
  }, {
    title: 'Variable Assets',
    question: "Please enter your variable assets (401k, 403b, IRA, Roth IRA, brokerage account, etc.) If you don't have any, feel free to move to the next section.",
    bind: 'variableAssets',
    type: 'table',
    fields: [{
      label: 'Asset Name',
      type: 'text',
      textAlign: 'left',
      required: true
    }, {
      label: 'Value/Balance',
      type: 'number',
      textAlign: 'right',
      required: true
    }],
    index: 1
  }, {
    title: 'Personal Assets',
    question: "These are the kind of assets you may not normally consider, things like your house, car, etc. If you don't have any, feel free to move to the next section.",
    bind: 'personalAssets',
    type: 'table',
    fields: [{
      label: 'Asset Name',
      type: 'text',
      textAlign: 'left',
      required: true
    }, {
      label: 'Value/Balance',
      type: 'number',
      textAlign: 'right',
      required: true
    }]
  }, {
    title: 'Primary Residence',
    type: 'multi',
    bind: 'mortgage',
    subqueries: [
      {
        question: 'Do you own a home?',
        type: 'select',
        bind: 'hasPrimaryResidence',
        options: [{
          text: 'Yes',
          value: true
        }, {
          text: 'No',
          value: false
        }]
      }, {
        question: 'What is the approximate current market value of your home?',
        type: 'number',
        bind: 'homeValue',
        condition: 'hasPrimaryResidence'
      }, {
        question: 'Do you have a mortgage for your primary residence?',
        type: 'select',
        bind: 'hasMortgage',
        options: [ { text:'Yes', value:true }, { text:'No', value:false } ]
      }, {
        question: 'What is the current balance owed on your mortgage?',
        type: 'number',
        bind: 'currentBalance',
        condition: 'hasMortgage'
      }, {
        question: 'What is the interest rate on your mortgage?',
        type: 'number',
        bind: 'currentRate',
        condition: 'hasMortgage'
      }, {
        question: 'What is the term of your mortgage (in years)?',
        type: 'number',
        bind: 'currentTerm',
        condition: 'hasMortgage'
      }, {
        question: 'What was the principal, or balance owed, of your mortgage initially or when you last refinanced (whichever was more recent)?',
        type: 'number',
        bind: 'initialBalance',
        condition: 'hasMortgage'
      }, {
        question: 'When did you purchase or last refinance your home (whichever was most recent)?',
        type: 'month',
        bind: 'startDate',
        condition: 'hasMortgage'
      }
    ]
  }, {
    title: 'Student Loans',
    question: "Please enter any Federal Student Loans you currently have. If you don't have any, congratulations! Feel free to move to the next section.",
    bind: 'studentLoans',
    type: 'table',
    fields: [{
      label: 'Liability Name',
      type: 'text',
      textAlign: 'left',
      required: true
    }, {
      label: 'Interest Rate',
      type: 'number',
      textAlign: 'right',
      required: true
    }, {
      label: 'Value/Balance',
      type: 'number',
      textAlign: 'right',
      required: true
    }]
  }, {
    title: 'Other Debts',
    question: "Please enter all other debt and liabilities in this section (auto loans, personal loans, credit cards, HELOCs, money owed to friends/family, etc.) If you don't have any, congratulations! Feel free to move to the next section.",
    bind: 'otherDebts',
    type: 'table',
    fields: [{
      label: 'Liability Name',
      type: 'text',
      textAlign: 'left',
      required: true
    }, {
      label: 'Interest Rate',
      type: 'number',
      textAlign: 'right',
      required: true
    }, {
      label: 'Value/Balance',
      type: 'number',
      textAlign: 'right',
      required: true
    }]
  }];

});
