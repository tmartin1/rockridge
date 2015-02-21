'use strict';

angular.module('rockridge')
.controller('BasicsCtrl', function($scope) {
  // assign collected info to $scope.plan, defined in parent state: plan-builder.controller.js

  // $scope.queries must be an array of question objects in the order that they should appear to 
  // the user. Question objects have a specific format that must be followed. For more info, see 
  // client/components/question/questions.directive.js
  $scope.states = ['TX','CA','WA','MA','MD'];

  
  $scope.queries = [
    { // Multi-question example
      title: 'Name and birthdate',
      type: 'multi',
      subqueries: [
        { question:'What is your first name?', type:'text', bind:'firstname' },
        { question:'What is your last name?', type:'text', bind:'lastname' },
        { question:'What is your date of birth?', type:'date', bind:'birthdate' }
      ]
    },
  {
    title: 'Work and Residence',
    type: 'multi',
    subqueries: [
      { question: 'Do you work in a different city and state than the city and state in which you live?', 
        bind: 'sameWorkResidence', type: 'select', options: [{text: 'Yes', value: true},{text:'No', value: false}]},
      { question:'In which city do you live?', type:'text', bind:'cityResident' },
        { question:'In which state do you live?', type:'select', bind:'stateResident', options: $scope.states},
        { question:'In which city do you work?', type:'text', bind:'cityWork', condition: 'sameWorkResidence'},
        { question:'In which state do you work?', type:'select', bind:'stateWork', options: $scope.states, condition: 'sameWorkResidence'}

    ] 
  },
  { title: 'Gross Annual Income', question: 'What is your Gross Annual Income?', 
      type: 'number', bind:'grossAnnualIncome', options: null, next: null
  },
    { 
      title: 'Children',
      type: 'multi',
      subqueries: [
        { question:'Do you have children?', type:'select', bind: 'children', options:[{text: 'Yes', value: true},{text:'No', value: false}]},
        { question:'Please enter the names and ages of your children?',bind:'childrenAges', type:'table', 
          fields: [
            { label: 'Child\'s Name', type: 'text', textAlign: 'left'},
            { label: 'Child\'s Age', type: 'number', textAlign: 'right'}
          ]}  //, condition: 'children'
      ]
    },
    { 
      title: 'Spouse Information',
      type: 'multi',
      subqueries: [
        { question:'Are you maried?', type:'select', bind: 'maritalStatus', options:[{text: 'Yes', value: true},{text:'No', value: false}]},
        { question:'What is your spouse\'s first name?', type:'text', bind:'spouseFirstName', condition: 'maritalStatus'},
        { question:'What is your spouse\'s last name?', type:'text', bind:'spouseFirstName', condition: 'maritalStatus'},
        { question:'What is ' + $scope.plan.spouseFirstName + ' date of birth?', type:'date', bind:'spouseBirthdate', condition: 'maritalStatus'},
        { question:'In which city does ' + $scope.plan.spouseFirstName + ' live?', type:'text', bind:'cityResident', condition: 'maritalStatus' },
        { question:'In which state does ' + $scope.plan.spouseFirstName + ' live?', type:'select', bind:'stateResident', condition: 'maritalStatus', options: $scope.states},
        { question:'What is ' + $scope.plan.spouseFirstName + ' Gross Annual Income?', type:'number', bind: 'spouseGrossAnnualIncome', condition: 'maritalStatus'}
      ]
    },
    {
      title: 'Variable Assets',
      question: "Please enter your variable assets (401k, 403b, IRA, Roth IRA, brokerage account, etc.) If you don't have any, feel free to move to the next section.",
      bind: 'variable-assets',
      type: 'table',
      fields: [
        { label: 'Asset Name', type: 'text', textAlign: 'left' },
        { label: 'Value/Balance', type: 'number', textAlign: 'right' }]
    }

  ];
  //$scope.plan.maritalStatus = $scope.plan.maritalStatus || 'No';
  //$scope.plan.maritalStatus = $scope.plan.maritalStatus || 'No';


});
//$scope.watch
  // var myVar = $scope.plan.sameWorkResidence;
  // $scope.$watch(myVar, function() {
 //       alert('hey, sameWorkResidence has changed!');
 //   });
  // if($scope.plan.sameWorkResidence === 'Yes'){
  //  //$scope.$apply(function(){
  //    $scope.queries.splice(2,1);
  //    console.log($scope.queries);  //trying to skip this data on to resident city and state
  //  //});
  // }
  // if($scope.plan.married === 'Yes'){
  //    $scope.queries.splice();
  // }
  // if($scope.plan.maritalStatus === 'No'){
  //  //skip to the review entered data
  // }
  // if($scope.plan.children === 'No'){
  //  //skip to marital status
  // }
  // $scope.radiochange = function(){  //note: we added ng-change to the radio type in questionTemplate.html
  //  console.log("radiochange");
  // };


/*
Needed information:
name
birthdate
 - prescreen - do you work and live in the same city and state? - Radio Buttons - if yes, then only show
 resident city, state, if no, show both resident city, state   work city, state

gross annual income
- prescreen - do you have kids? - Radio Buttons - if yes, take to table format that has a button to put
all the kids names and ages, if no, then go to marital status

marital status - Radio Buttons - if yes, go to get info for spouse, if no, go to Review basic page

spouse info:
birthdate
 - prescreen - do you work and live in the same city and state? - Radio Buttons - if yes, then only show
 resident city, state, if no, show both resident city, state   work city, state

Spouse gross annual income


*/