// Controller for MSA view within my-plan.

'use strict';

angular.module('rockridge')
.controller('MsaViewCtrl', function($scope) {
  // Total value of groups of expenses (fixed, flexible).
  var calculateTotal = function(addFrom) {
    var total = 0;
    for (var item in addFrom) {
      total += (addFrom[item]['value'] || addFrom[item]['balance'] || 0);
    }
    return total;
  };

  // Calculate and recalculate locally used variables.
  $scope.recalculate = function() {
    $scope.fixedExpenses = calculateTotal($scope.plan.fixedExpenses);
    $scope.flexibleExpenses = calculateTotal($scope.plan.flexibleExpenses);
    $scope.totalExpenses = $scope.fixedExpenses + $scope.flexibleExpenses;
    $scope.monthlyTakehome = Math.floor($scope.plan.taxProjection.netIncome / 12);
    $scope.unallocatedIncome = $scope.monthlyTakehome - $scope.totalExpenses;
  };
  $scope.recalculate();

});
