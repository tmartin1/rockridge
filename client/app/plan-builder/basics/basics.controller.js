'use strict';

angular.module('rockridge')
.controller('BasicsCtrl', function($scope) {
  // assign collected info to $scope.plan, defined in parent state: plan-builder.controller.js

  // $scope.queries must be an array of question objects in the order that they should appear to
  // the user. Question objects have a specific format that must be followed. For more info, see
  // client/components/question/questions.directive.js

  // TODO: Refactor the states list so it's not so redundant.
  var states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];
  $scope.states = [];
  for (var i=0; i<states.length; i++) {
    $scope.states.push({ text:states[i], value:states[i] });
  }

  // General Info questions.
  $scope.queries = [
    {
      title: 'Personal Information',
      type: 'multi',
      subqueries: [
        {
          question:'What is your first name?',
          type:'text',
          bind:'firstname'
        }, {
          question:'What is your last name?',
          type:'text',
          bind:'lastname'
        }, {
          question:'What is your date of birth?',
          type:'date',
          bind:'birthdate'
        }
      ]
    }, {
      title: 'Family',
      type: 'multi',
      subqueries: [
        {
          question:'Are you maried?',
          type:'select',
          bind: 'maritalStatus',
          options:[ { text: 'Yes', value: true }, { text:'No', value: false } ]
        }, {
          question:'What is your spouse\'s first name?',
          type:'text',
          bind:'spouseFirstName',
          condition: 'maritalStatus'
        }, {
          question:'What is your spouse\'s last name?',
          type:'text',
          bind:'spouseLastName',
          condition: 'maritalStatus'
        }, {
          question:'What is ' + $scope.plan.spouseFirstName + '\'s date of birth?',
          type:'date',
          bind:'spouseBirthdate',
          condition: 'maritalStatus'
        }, {
          question:'In which city does ' + $scope.plan.spouseFirstName + ' live?',
          type:'text',
          bind:'spouseCityResident',
          condition: 'maritalStatus'
        }, {
          question:'In which state does ' + $scope.plan.spouseFirstName + ' live?',
          type:'select',
          bind:'spouseStateResident',
          condition: 'maritalStatus',
          options: $scope.states
        }, {
          question:'Do you have children?',
          type:'select',
          bind: 'hasChildren',
          options: [
            { text: 'Yes', value: true },
            { text:'No', value: false }
          ]
        }, {
          bind:'children',
          type:'table',
          fields: [
            {
              label: 'Child Name',
              type: 'text',
              textAlign: 'left'
            }, {
              label: 'Child Birthdate',
              type: 'date',
              textAlign: 'left'
            }
          ],
          condition: 'hasChildren'
        }
      ]
    }, {
      title: 'Work and Residence',
      type: 'multi',
      subqueries: [
        {
          question:'In which city do you live?',
          type:'text',
          bind:'cityResident'
        }, {
          question:'In which state do you live?',
          type:'select',
          bind:'stateResident',
          options: $scope.states
        }, {
          question: 'Do you work in a different city and state than the city and state in which you live?',
          bind: 'sameWorkResidence',
          type: 'select',
          options: [
            { text: 'Yes', value: true },
            { text:'No', value: false }
          ]
        }, {
          question:'In which city do you work?',
          type:'text',
          bind:'cityWork',
          condition: 'sameWorkResidence'
        }, {
          question:'In which state do you work?',
          type:'select',
          bind:'stateWork',
          options: $scope.states,
          condition: 'sameWorkResidence'
        }, {
          question: 'What is your Gross Annual Income?',
          type: 'number',
          bind:'grossAnnualIncome'
        }
      ]
    }
  ];

});
