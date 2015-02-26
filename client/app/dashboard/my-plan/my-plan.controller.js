'use strict';

/* The my-plan view should provide the following functionality:
    - display the user's plan
    - allow the user to update their plan
*/
angular.module('rockridge')
.controller('MyPlanCtrl', function($rootScope, $scope, $state, Auth) {

  $scope.user = Auth.getCurrentUser();
  // $scope.plan = Auth.getUserPlan();

  // Define default my-plan view to 'overview'.
  $scope.overview = { label: 'Overview', link: 'app/dashboard/my-plan/views/overview.html' };

  // Set my-plan view to 'overview' if undefined.
  $scope.currentView = $scope.currentView || $scope.overview;

  // Different dispay options for user's plan.
  $scope.planDisplay = [
    { label: 'Net Worth', link: 'app/dashboard/my-plan/views/nws.html' },
    { label: 'Budget', link: 'app/dashboard/my-plan/views/msa.html' },
    { label: 'Tax Projection', link: 'app/dashboard/my-plan/views/tax.html' },
    { label: 'Insurance', link: 'app/dashboard/my-plan/views/insurance.html' },
    { label: 'Retirement', link: 'app/dashboard/my-plan/views/retire.html' },
    { label: 'Personal Info', link: 'app/dashboard/my-plan/views/personal.html' },
    { label: 'More', link: 'app/dashboard/my-plan/views/addmore.html' }
  ];

  // Set current view inside of my-plan.
  $scope.setView = function(section) {
    $scope.currentView = section;
  };

});
