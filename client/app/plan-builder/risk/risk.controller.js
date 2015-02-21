'use strict';

angular.module('rockridge')
.controller('RiskAnalysisCtrl', function($scope) {
  // assign collected info to $scope.plan, defined in parent state: plan-builder.controller.js

  // $scope.queries must be an array of question objects in the order that they should appear to
  // the user. Question objects have a specific format that must be followed. For more info, see
  // client/components/question/questions.directive.js
  $scope.queries = [
    {
      title: 'Health Insurance',
      type: 'multi',
      question: 'Health insurance is important and legally required.  The most important thing is that you have it.',
      subqueries: [
        {
          question: 'Do you have health insurance?',
          type: 'select',
          options: [ {text:'Yes', value:true}, {text:'No', value:false} ],
          bind: 'userHealthInsurance'
        }, {
          question: 'Does ' + $scope.plan.spouseFirstName + ' have health insurance?',
          type: 'select',
          options: [ {text:'Yes', value:true}, {text:'No', value:false} ],
          bind: 'spouseHealthInsurance',
          condition: 'maritalStatus'
        }
      ]
    }, {
      title: 'Home and Auto Insurance',
      type: 'multi',
      question: 'Homeowners insurance is important and legally required (if you own a home).  The most important thing is that you have it.',
      subqueries: [
        {
          question: 'Do you have homeowners insurance?',
          type: 'select',
          options: [ {text:'Yes', value:true}, {text:'No', value:false} ],
          bind: 'userHomeInsurance'
        }, {
          question: 'Do you have auto insurance?',
          type: 'select',
          options: [ {text:'Yes', value:true}, {text:'No', value:false} ],
          bind: 'userAutoInsurance'
        }
      ]
    }, {
      title: 'Life Insurance',
      type: 'multi',
      question: 'Life insurance can be important.',
      subqueries: [
        {
          question: 'Enter the total life insurance benefit provided to you by your employer:',
          type: 'number',
          bind: 'userEmployerLifeInsurance'
        }, {
          question: 'Enter the total life insurance benefit provided to ' + $scope.plan.spouseFirstName + ' by ' + $scope.plan.spouseFirstName + '\'s employer:',
          type: 'number',
          bind: 'spouseEmployerLifeInsurance',
          condition: 'maritalStatus'
        }, {
          question: 'Enter the total life insurance benefit from coverage you own independently of your employer:',
          type: 'number',
          bind: 'userIndividualLifeInsurance'
        }, {
          question: 'Enter the total life insurance benefit ' + $scope.plan.spouseFirstName + ' owns own independently of ' + $scope.plan.spouseFirstName + '\'s employer:',
          type: 'number',
          bind: 'spouseIndividualLifeInsurance',
          condition: 'maritalStatus'
        }
      ]
    }, {
      title: 'Disability Insurance',
      type: 'multi',
      question: 'Disability insurance can be important.',
      subqueries: [
        {
          question: 'Enter the total disability insurance benefit provided to you by your employer:',
          type: 'number',
          bind: 'userEmployerDisabilityInsurance'
        }, {
          question: 'Enter the total disability insurance benefit provided to ' + $scope.plan.spouseFirstName + ' by ' + $scope.plan.spouseFirstName + '\'s employer:',
          type: 'number',
          bind: 'spouseEmployerDisabilityInsurance',
          condition: 'maritalStatus'
        }, {
          question: 'Enter the total disability insurance benefit from coverage you own independently of your employer:',
          type: 'number',
          bind: 'userIndividualDisabilityInsurance'
        }, {
          question: 'Enter the total disability insurance benefit ' + $scope.plan.spouseFirstName + ' owns own independently of ' + $scope.plan.spouseFirstName + '\'s employer:',
          type: 'number',
          bind: 'spouseIndividualDisabilityInsurance',
          condition: 'maritalStatus'
        }
      ]
    }
  ];

});
