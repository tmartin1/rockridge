'use strict';

/* The user dashboard should provide the following functionality:
    - display the user's plan
    - allow the user to update their plan
    - display the 'goals' for a user (what they need to do to meet their retirement goals, and any others they add)
    - display links to any tutorials that are in progress
    - display links to favorited/bookmarked tutorials
    - provide easy access to relevant calculators (if they have student loans, link to student loan repayment calc. Mortgage, etc.)
    - allow the user to share the plan with a registered (and verified) advisor or attorney (future)
*/
angular.module('rockridge')
.controller('DashboardCtrl', function($scope, $state) {
  // Set $state on the scope to access it in the views.
  $scope.$state = $state;

  // ...

  // Transition to dashboard.views state to load page views.
  $state.transitionTo('dashboard.views');
});
