'use strict';

angular.module('rockridge')
.controller('PlanBuilderCtrl', function($rootScope, $scope, $location, $state, Auth) {

  // Define plan object that will be used and accessed by the different planning states.
  // TODO: If plan is partially complete, this should fetch previously entered data from DB.
  $scope.plan = {};

	$scope.previous, $scope.next;
  $scope.isCollapsed = true;
  $scope.user = {};
  $scope.signup = function(){
    $('.ui.modal').modal('hide');
    Auth.createUser($scope.user)
    .then(function(user){
      //todo: save plan data to db
    });
  };

  // Defines the order of how pages are displayed to the user.
  var order = [
    'plan-builder.start',
    'plan-builder.basics',
    'plan-builder.nws',
    'plan-builder.tax',
    'plan-builder.msa',
    'plan-builder.risk',
    'plan-builder.retire'
  ];

  // Sets the title, progress bar, and the 'previous' and 'next' links.
  var updateRelationals = function(focus) {
    $scope.heading = focus.data.title;
    var index = order.indexOf(focus.name);
    // ui-router does not currently support dynamic sref: https://github.com/angular-ui/ui-router/issues/1208
    $scope.previous = order[index - 1] ? order[index - 1].replace('.', '/') : false;
    $scope.next = order[index + 1] ? order[index + 1].replace('.', '/') : false;
    $scope.progress = Math.max(.05, (index / order.length - 1)) * 100 + '%';
  };
  updateRelationals($state.current);

  // Update page heading and navbar on state change within plan-builder.
  // From docs: https://github.com/angular-ui/ui-router/wiki#wiki-state-change-events
  $scope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams) {
      if (order.indexOf(toState.name) >= 0) updateRelationals(toState);
    }
  );

  // prompt user to signup and save
  $scope.showModal = function() {
    $('.ui.modal').modal('show');
  };
});
