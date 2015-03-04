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
  $scope.checkGoal = function(goal) {
    goal.complete = !goal.complete;
    console.log(goal);
  };

  // Creates a new goal.
  $scope.createGoal = function() {
    $scope.plan.goals.user.push({
      text: $scope.newGoal,
      created: new Date(),
      complete: false
    });
  };

  // Removes selected goal from the list.
  $scope.removeGoal = function(index) {
    $scope.plan.goals.user.splice(index,1);
  };

});
