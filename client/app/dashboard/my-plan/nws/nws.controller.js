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
      title: '@'
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

      // Default options for adding items to groups.
      $scope.addOptions = {
        'Fixed Assets': [ 'Checking Account', 'Savings Account', 'CD' ],
        'Variable Assets': [ 'Nonretirement Brokerage Acct.', 'Roth IRA', '401k at myemployer' ],
        'Personal Assets': [ 'Primary Residence', 'Car', 'Stuff' ],
        // Mortgages: [ 'Primary Residence', 'Vacation Home', 'HELOC' ],
        'Student Loans': [ 'Federal Perkins', 'GradPLUS', 'Stafford' ],
        'Credit Cards': [ 'VISA', 'MasterCard', 'AmEx' ],
        'Other': [ 'Auto Loan', 'Home Improvement Loan', 'Money Owed to Parents' ]
      };
    },
    templateUrl: './app/dashboard/my-plan/nws/nwsGroupTemplate.html'
  }
})

.directive('nwsadditem', function() {
  return {
    restrict: 'E',
    scope: {
      group: '=',
      addOptions: '='
    },
    controller: function($scope) {
      // Add new item to user's plan.
      $scope.addNewItem = function(title) {
        title = title || $scope.newTitle;
        $scope.group.push({
          asset: title,
          rate: null,
          value: 1
        });
        $scope.newTitle = '';
        $scope.showMenu = false;
      };
    },
    templateUrl: './app/dashboard/my-plan/nws/addItemTemplate.html'
  }
});
