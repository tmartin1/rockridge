'use strict';

/* The goals view should provide the following functionality:
    - display plan-defined goals
    - display user-defined goals
    - allow user to create new, edit, update their goals
    - allow user to mark their goal as 'on track', 'complete', etc.
*/
angular.module('rockridge')
.controller('GoalsCtrl', function($scope) {

  // Marks a goal as complete or not.
  $scope.checkGoal = function(goal, index) {
    console.log(goal);
    console.log(index);
  };

  // Creates a new goal.
  $scope.createGoal = function() {
    //
  };

  // Removes selected goal from the list.
  $scope.removeGoal = function(index) {
    $scope.plan.goals.user.splice(index,1);
  };

});
