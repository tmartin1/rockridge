// Controller for NWS view within my-plan.

'use strict';

angular.module('rockridge')
.controller('NwsViewCtrl', function($scope) {
  $scope.plan.fixedAssets = $scope.plan.fixedAssets || {};
});

// Directive to display nws groups of items (fixed assets, variable assets, etc.)
// .directive('nwsgroup', function() {
//   return {
    // restrict: 'E',
    // scope: {
    //   group: '=',
    //   type: '@',
    //   style: '@'
    // },
    // controller: function($scope) {
    //   console.log($scope.group);
    // },
//     template: 'Group is: {{plan}}' // end of template.
// });
