// Controller for personal info view within my-plan.

'use strict';

angular.module('rockridge')
.controller('PersonalViewCtrl', function($scope) {
  // TODO: Refactor the states list so it's not so redundant.
  $scope.states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL',
    'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME',
    'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV',
    'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA',
    'VT', 'WA', 'WI', 'WV', 'WY'
  ];

  $('.dropdown').dropdown({
    transition: 'drop'
  });

  $scope.testLog = function() {
    console.log($scope.plan.maritalStatus);
  };
  $scope.testLog();

});
