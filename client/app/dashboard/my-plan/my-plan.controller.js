'use strict';

/* The my-plan view should provide the following functionality:
    - display the user's plan
    - allow the user to update their plan
*/
angular.module('rockridge')
.controller('MyPlanCtrl', function($rootScope, $scope, $state) {

  // Demo for the example, this will have to be dynamic (allow user to add tab for college savings, etc.)
  console.log($scope.plan)
  $scope.user = $scope.user || {};
  $scope.plan = $scope.plan || {};
  $scope.user.plan = ['Net Worth', 'Budget', 'Insurance', 'Retirement'];

  // Default my-plan view to 'overview'
  $scope.currentView = 'Overview';

  // Different dispay options for user's plan.
  $scope.planDisplay = {
    'Overview': 'app/dashboard/my-plan/views/overview.html',
    'Net Worth': 'app/dashboard/my-plan/views/nws.html',
    'Budget': 'app/dashboard/my-plan/views/msa.html',
    'Insurance': 'app/dashboard/my-plan/views/insurance.html',
    'Retire': 'app/dashboard/my-plan/views/retire.html',
    'addMore': 'app/dashboard/my-plan/views/addmore.html'
  };

  // Set current view inside of my-plan.
  $scope.setView = function(section) {
    $scope.currentView = section;
  };

});
