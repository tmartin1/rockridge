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
  $scope.overview = { label: 'Overview', link: 'app/dashboard/my-plan/overview/overview.html' };

  // Set my-plan view to 'overview' if undefined.
  $scope.currentView = $scope.currentView || $scope.overview;

  // Set current view inside of my-plan.
  $scope.setView = function(section) {
    $scope.currentView = section;
  };

  // Different dispay options for user's plan.
  $scope.planDisplay = [
    { label: 'Net Worth', link: 'app/dashboard/my-plan/nws/nws.html' },
    { label: 'Cash Flow', link: 'app/dashboard/my-plan/msa/msa.html' },
    { label: 'Tax Projection', link: 'app/dashboard/my-plan/tax/tax.html' },
    // { label: 'Insurance', link: 'app/dashboard/my-plan/insurance/insurance.html' },
    { label: 'Retirement', link: 'app/dashboard/my-plan/retire/retire.html' },
    { label: 'Personal Info', link: 'app/dashboard/my-plan/personal/personal.html' },
    { label: 'More', link: 'app/dashboard/my-plan/addmore/addmore.html' }
  ];

});
