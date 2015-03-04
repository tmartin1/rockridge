// Controller for overview view within my-plan.

'use strict';

angular.module('rockridge')
.controller('OverviewViewCtrl', function($scope) {
  // Helper functions

  // Calculates and return the total of a given group.
  var sumGroup = function(group) {
    var total = 0;
    for (var i=0; i<group.length; i++) {
      total += group[i]['value'] || group[i]['balance'];
    }
    return total;
  }

  
  // Net Worth Chart Logic
  // http://www.highcharts.com/demo/pie-drilldown
  var fixedAssets = sumGroup($scope.plan.assets.fixed);
  var variableAssets = sumGroup($scope.plan.assets.variable);
  var personalAssets = sumGroup($scope.plan.assets.personal);
  var mortgages = sumGroup($scope.plan.mortgage.currentBalance);
  var studentLoans = sumGroup($scope.plan.debts.studentLoans);
  var creditCards = sumGroup($scope.plan.debts.creditCards);
  var otherDebts = sumGroup($scope.plan.debts.other);

  // Create the chart
  $('#netWorthContainer').highcharts({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Net Worth Snapshot'
    },
    subtitle: {
      text: 'click any asset or debt in the legend to add or remove it from the graph'
    },
    xAxis: {
      categories: [ 'Assets', 'Debts' ]
    },
    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: 'Amount ($)'
      }
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.x + '</b><br/>' +
          this.series.name + ': ' + this.y + '<br/>' +
          'Total: ' + this.point.stackTotal;
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal'
      }
    },
    series: [{
      name: 'Fixed Assets',
      data: [ fixedAssets, 0 ]
    }, {
      name: 'Variable Assets',
      data: [ variableAssets, 0 ]
    }, {
      name: 'Personal Assets',
      data: [ personalAssets, 0 ]
    }, {
      name: 'Mortgage',
      data: [ 0, mortgages ]
    }, {
      name: 'Student Loans',
      data: [ 0, studentLoans ]
    }, {
      name: 'Credit Cards',
      data: [ 0, creditCards ]
    }, {
      name: 'Other Debt',
      data: [ 0, otherDebts ]
    }]
  });
  // hide highcharts.com logo
  $('text[text-anchor=end]').hide();


  // Budget Chart Logic
  var fixedExpenses = sumGroup($scope.plan.fixedExpenses);
  var flexibleExpenses = sumGroup($scope.plan.flexibleExpenses);
  var savings = ($scope.plan.spouse401kContribution + $scope.plan.user401kContribution) / 12;
  var totalCashFlowOut = fixedExpenses + flexibleExpenses + savings;
  // http://www.highcharts.com/demo/pie-drilldown
  var topLevelSlices = {
    'fixed expenses': null,
    'flexible expenses': null,
    'savings': null
  };
  var sliceData = [{
    drilldown: 'fixed expenses',
    name: 'fixed expenses',
    visible: true,
    y: (fixedExpenses / totalCashFlowOut) * 100
  }, {
    drilldown: 'flexible expenses',
    name: 'flexible expenses',
    visible: true,
    y: (flexibleExpenses / totalCashFlowOut) * 100
  }, {
    drilldown: 'savings',
    name: 'savings',
    visible: true,
    y: (savings / totalCashFlowOut) * 100
  }];
  var drillDownSlices = [{
    name: 'fixed expenses',
    id: 'fixed expenses',
    data: [ 20, 60, 20]
  }, {
    name: 'flexible expenses',
    id: 'flexible expenses',
    data: [ 25, 50, 25]
  }, {
    name: 'savings',
    id: 'savings',
    data: [ 10, 70, 20]
  }];

  // Create the chart
  $('#budgetContainer').highcharts({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Budget Breakdown'
    },
    subtitle: {
      text: 'click each section to see a detailed breakdown'
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y:.1f}%'
        }
      }
    },
    tooltip: {
      enabled: false,
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },
    series: [{
      name: 'top',
      colorByPoint: true,
      data: sliceData
    }],
    drilldown: {
      series: drillDownSlices
    }
  });
  // hide highcharts.com logo
  $('text[text-anchor=end]').hide();


  // Retirement Chart Logic


  // Tax Chart Logic


});
