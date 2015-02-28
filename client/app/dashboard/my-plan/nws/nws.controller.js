// Controller for NWS view within my-plan.

'use strict';

angular.module('rockridge')
.controller('NwsViewCtrl', function($scope) {

  // If plan has a mortgage, then add primary residence to personal assets and mortgage information to plan.debts.other
  (function addMortgageInfo() {
    if ($scope.plan.hasMortgage) {
      // addMortgageInfo
      console.log('adding mortgage');
    }
  })();

  // Total value of all assets
  var calculateTotal = function(addFrom) {
    var total = 0;
    var addToTotal = function(subset) {
      for (var item in subset) {
        total += (item['value'] || item['balance'] || 0);
      }
    };
    for (var subset in addFrom) {
      addToTotal(addFrom[subset]);
    }
    return total;
  };
  $scope.totalAssets = calculateTotal($scope.plan.assets);
  $scope.totalDebts = calculateTotal($scope.plan.debts);
})

// Directive to display nws groups of items (fixed assets, variable assets, etc.)
.directive('nwsgroup', function() {
  return {
    restrict: 'AE',
    scope: {
      group: '=',
      title: '@'
    },
    controller: function($scope) {
      // Generate group subtotals
      $scope.subtotal = 0;
        // console.log($scope.group);
      for (var i=0; i<$scope.group.length; i++) {
        $scope.subtotal += $scope.group[i]['value'] || $scope.group[i]['balance'] || 0;
      }
    },
    templateUrl: './app/dashboard/my-plan/nws/nwsGroupTemplate.html'
  }
});
