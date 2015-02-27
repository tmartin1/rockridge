// Controller for MSA view within my-plan.

'use strict';

angular.module('rockridge')
.controller('MsaViewCtrl', function($scope) {
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
});
