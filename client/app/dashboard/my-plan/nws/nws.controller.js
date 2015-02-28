// Controller for NWS view within my-plan.

'use strict';

angular.module('rockridge')
.controller('NwsViewCtrl', function($scope) {
  // Total value of all assets and all debts
  var calculateTotal = function(addFrom) {
    var total = 0;
    var addToTotal = function(subset) {
      for (var item in subset) {
        total += (subset[item]['value'] || subset[item]['balance'] || 0);
      }
    };
    for (var subset in addFrom) {
      addToTotal(addFrom[subset]);
    }
    return total;
  };

  // $scope.$watchCollection('plan', function() {
  $scope.recalculate = function() {
    $scope.totalAssets = calculateTotal($scope.plan.assets);
    $scope.totalDebts = calculateTotal($scope.plan.debts) + $scope.plan.mortgage.currentBalance;
    $scope.plan.netWorth = $scope.totalAssets - $scope.totalDebts;
  };
  $scope.recalculate();
})

// Directive to display nws groups of items (fixed assets, variable assets, etc.)
.directive('nwsgroup', function() {
  return {
    restrict: 'A',
    scope: {
      group: '=',
      title: '@',
      options: '@'
    },
    controller: function($scope) {
      // Generate group subtotals
      $scope.calculateSubtotal = function() {
        $scope.subtotal = 0;
        for (var i=0; i<$scope.group.length; i++) {
          $scope.subtotal += $scope.group[i]['value'] || $scope.group[i]['balance'] || 0;
        }
      };
      $scope.calculateSubtotal();
    },
    templateUrl: './app/dashboard/my-plan/nws/nwsGroupTemplate.html'
  }
})

.directive('nwsadditem', function() {
  return {
    restrict: 'AE',
    scope: {
      group: '=',
      options: '@'
    },
    controller: function($scope) {
      // stuff
    },
    templateUrl: './app/dashboard/my-plan/nws/addItemTemplate.html'
  }
});
