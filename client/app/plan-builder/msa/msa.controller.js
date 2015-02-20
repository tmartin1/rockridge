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
      title: '',
      question: "",
      bind: '',
      type: '',
      options: '',
      fields: '',
      condition: '',
      subqueries: '',
      template: ''
    }, {
      title: '',
      question: "",
      bind: '',
      type: '',
      options: '',
      fields: '',
      condition: '',
      subqueries: '',
      template: ''
    }, {
      title: '',
      question: "",
      bind: '',
      type: '',
      options: '',
      fields: '',
      condition: '',
      subqueries: '',
      template: ''
    }, {
      title: '',
      question: "",
      bind: '',
      type: '',
      options: '',
      fields: '',
      condition: '',
      subqueries: '',
      template: ''
    }
  ];

});
