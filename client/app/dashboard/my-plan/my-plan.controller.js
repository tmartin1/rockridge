'use strict';

/* The my-plan view should provide the following functionality:
    - display the user's plan
    - allow the user to update their plan
*/
angular.module('rockridge')
.controller('MyPlanCtrl', function($rootScope, $scope, $state, Auth) {

  $scope.user = Auth.getCurrentUser();
  // $scope.plan = Auth.getUserPlan();

  // Define default my-plan view to 'overview'.
  $scope.overview = { label: 'Overview', link: 'app/dashboard/my-plan/overview/overview.html' };

  // Set my-plan view to 'overview' if undefined.
  $scope.currentView = $scope.currentView || $scope.overview;

  // Set current view inside of my-plan.
  $scope.setView = function(section) {
    $scope.currentView = section;
  };

  // Different dispay options for user's plan.
  $scope.planDisplay = [
    { label: 'Net Worth', link: 'app/dashboard/my-plan/nws/nws.html' },
    { label: 'Budget', link: 'app/dashboard/my-plan/msa/msa.html' },
    { label: 'Tax Projection', link: 'app/dashboard/my-plan/tax/tax.html' },
    { label: 'Insurance', link: 'app/dashboard/my-plan/insurance/insurance.html' },
    { label: 'Retirement', link: 'app/dashboard/my-plan/retire/retire.html' },
    { label: 'Personal Info', link: 'app/dashboard/my-plan/personal/personal.html' },
    { label: 'More', link: 'app/dashboard/my-plan/addmore/addmore.html' }
  ];

})
.controller('dashboard.NetWorthCtrl', function($rootScope, $scope, $state, Auth) {
})
.controller('dashboard.BudgetCtrl', function($rootScope, $scope, $state, Auth) {

  // http://www.highcharts.com/demo/pie-drilldown
  var topLevelSlices = {
    'fixed expenses': null,
    'flexible expenses': null,
    'savings': null
  };
  var sliceData = [
    {
      drilldown: 'fixed expenses',
      name: 'fixed expenses',
      visible: true,
      y: 40
    },
    {
      drilldown: 'flexible expenses',
      name: 'flexible expenses',
      visible: true,
      y: 30
    },
    {
      drilldown: 'savings',
      name: 'savings',
      visible: true,
      y: 10
    }
  ];
  var drillDownSlices = [
    {
      name: 'fixed expenses',
      id: 'fixed expenses',
      data: [ 20, 60, 20]
    },
    {
      name: 'flexible expenses',
      id: 'flexible expenses',
      data: [ 25, 50, 25]
    },
    {
      name: 'savings',
      id: 'savings',
      data: [ 10, 70, 20]
    }
  ];

  // Create the chart
  $('#container').highcharts({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Your Budget'
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
})
.controller('dashboard.TaxCtrl', function($rootScope, $scope, $state, Auth) {
})
.controller('dashboard.InsuranceCtrl', function($rootScope, $scope, $state, Auth) {
})
.controller('dashboard.RetirementCtrl', function($rootScope, $scope, $state, Auth) {
})
.controller('dashboard.PersonalInfoCtrl', function($rootScope, $scope, $state, Auth) {
})
.controller('dashboard.MoreCtrl', function($rootScope, $scope, $state, Auth) {
})
