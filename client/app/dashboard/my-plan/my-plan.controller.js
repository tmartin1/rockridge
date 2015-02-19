'use strict';

/* The my-plan view should provide the following functionality:
    - display the user's plan
    - allow the user to update their plan
*/
angular.module('rockridge')
.controller('MyPlanCtrl', function($scope, $state) {
  // Demo for the example, this will have to be dynamic (allow user to add tab for college savings, etc.) 
  $scope.user = $scope.user || {};
  $scope.user.plan = ['Net Worth', 'Budget', 'Insurance', 'Retirement'];
});
