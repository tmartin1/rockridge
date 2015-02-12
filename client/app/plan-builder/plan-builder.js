'use strict';

angular.module('rockridge')
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/plan-builder', '/plan-builder/start');

  $stateProvider
  .state('plan-builder', {
    url: '/plan-builder',
    templateUrl: 'app/plan-builder/plan-builder.html',
    controller: 'PlanBuilderCtrl',
    abstract: true
  })
  // Nested states retain access to parent controller $scope and variables.
  .state('plan-builder.start', {
    url: '/start',
    templateUrl: 'app/plan-builder/start/start.html'
  })
  .state('plan-builder.basics', {
    url: '/basics',
    templateUrl: 'app/plan-builder/basics/basics.html',
    controller: 'BasicsCtrl'
  })
  .state('plan-builder.nws', {
    url: '/nws',
    templateUrl: 'app/plan-builder/nws/nws.html',
    controller: 'NwsCtrl'
  })
  .state('plan-builder.msa', {
    url: '/msa',
    templateUrl: 'app/plan-builder/msa/msa.html',
    controller: 'MsaCtrl'
  })
  .state('plan-builder.tax', {
    url: '/tax',
    templateUrl: 'app/plan-builder/tax/tax.html',
    controller: 'TaxProjectionCtrl'
  })
  .state('plan-builder.risk', {
    url: '/risk',
    templateUrl: 'app/plan-builder/risk/risk.html',
    controller: 'RiskAnalysisCtrl'
  })
  .state('plan-builder.retire', {
    url: '/retire',
    templateUrl: 'app/plan-builder/retire/retire.html',
    controller: 'RetireCtrl'
  });
});
