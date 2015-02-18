'use strict';

angular.module('rockridge')
.controller('BasicsCtrl', function($scope) {
  // assign collected info to $scope.plan, defined in parent state: plan-builder.controller.js

  // $scope.queries must be an array of question objects in the order that they should appear to 
  // the user. Question objects have a specific format that must be followed. For more info, see 
  // client/components/question/questions.directive.js
  $scope.queries = [
    { title:'Name', question:'What is your name?', type:'text', bind:'name', options:null, next:null },
    { title:'Marital Status', question:'Are you married?', type:'select', bind:'married', options:['Yes','No'], next:function($scope){ return $scope.plan.married ? 2 : 6 } } // Example, if married, go to question 3, else skip to question 6.
  ];
});
