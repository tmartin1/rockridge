// Controller for retirement projection view within my-plan.

'use strict';

angular.module('rockridge')
.controller('RetireViewCtrl', function($scope) {
  //

var getDataArray = function(group){
	var values = [];
	var labels = [];
	for(var key in group){
		labels.push(key);
		//console.log(group[key]);
		values.push(group[key].totalSavingsAcctsThirtyYear);
	}

	return [labels, values];
};

var getRetireProjDataArray = function(group){
	var valuesFixed = [];
	var valuesBest = [];
	var valuesWorst = [];
	var labels = [];
	for(var key in group){
		labels.push(key);
		//console.log(group[key]);
		valuesFixed.push(group[key].totalSavingsAccts);
		valuesBest.push(group[key].totalSavingsAcctsBest);
		valuesWorst.push(group[key].totalSavingsAcctsWorst);

	}

	return [labels, valuesFixed, valuesBest, valuesWorst];
};
// var stdev;
//   for (var i=0; i<(120-start); i++) {
//     averages.push([
//       i,
//       (variableAssets * (i*0.08)) + savings
//     ]);
//     stdev = ((120-i)/(i+1));
//     ranges.push([
//       i,
//       averages[i][1] - (stdev * averages[i][1]),
//       averages[i][1] + (stdev * averages[i][1])
//     ]);
//   }
var averages = [];

var aggregateAcctValue = [];
var label = [];
var tuple = [];
tuple = getDataArray($scope.plan.retireProjection.retireProjThirtyYear);
console.log('hi ',tuple);
aggregateAcctValue = tuple[1];
var ten = aggregateAcctValue.slice(0,12);
var twenty = aggregateAcctValue.slice(0,22);

label = tuple[0];
var tenLabel = label.slice(0,12);
var twentyLabel = label.slice(0,22);

/// call func here
var valuesArray = getRetireProjDataArray($scope.plan.retireProjection.retireProj);
var valuesFixed = valuesArray[1];
var valuesBest = valuesArray[2];
var valuesWorst = valuesArray[3];



$('#retireProjTenYearContainer').highcharts({
    chart: {
        zoomType: 'x'
    },
    title: {
        text: '10 Year Aggregate Account Values using a Monte Carlo Simulation on S&P 500 Returns'
    },
    subtitle: {
        text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' :
                'Pinch the chart to zoom in'
    },
    xAxis: {
        type: 'datetime',
        minRange: 365 * 24 * 3600000 // fourteen days
    },
    yAxis: {
        title: {
            text: 'Aggregate Accounts Value'
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        area: {
            fillColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            threshold: null
        }
    },

    series: [{
        type: 'area',
        name: 'Aggregate Account Values',
        pointInterval: 365 * 24 * 3600 * 1000,
        pointStart: Date.UTC(2015, 0, 1),
        data: ten
    	}]
	});

  $('text[text-anchor=end]').hide();

$('#retireProjTwentyYearContainer').highcharts({
    chart: {
        zoomType: 'x'
    },
    title: {
        text: '20 Year Aggregate Account Values using a Monte Carlo Simulation on S&P 500 Returns'
    },
    subtitle: {
        text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' :
                'Pinch the chart to zoom in'
    },
    xAxis: {
        type: 'datetime',
        minRange: 365 * 24 * 3600000 // fourteen days
    },
    yAxis: {
        title: {
            text: 'Aggregate Accounts Value'
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        area: {
            fillColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            threshold: null
        }
    },

    series: [{
        type: 'area',
        name: 'Aggregate Account Values',
        pointInterval: 365 * 24 * 3600 * 1000,
        pointStart: Date.UTC(2015, 0, 1),
        data: twenty
    	}]
	});

  $('text[text-anchor=end]').hide();

$('#retireProjThirtyYearContainer').highcharts({
    chart: {
        zoomType: 'x'
    },
    title: {
        text: '30 Year Aggregate Account Values using a Monte Carlo Simulation on S&P 500 Returns'
    },
    subtitle: {
        text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' :
                'Pinch the chart to zoom in'
    },
    xAxis: {
        type: 'datetime',
        minRange: 365 * 24 * 3600 * 1000 // fourteen days
    },
    yAxis: {
        title: {
            text: 'Aggregate Accounts Value'
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        area: {
            fillColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            threshold: null
        }
    },

    series: [{
        type: 'area',
        name: 'Aggregate Account Values',
        pointInterval: 365 * 24 * 1000 * 3600,
        pointStart: Date.UTC(2015, 0, 1),
        data: aggregateAcctValue
    	}]
	});

  $('text[text-anchor=end]').hide();


  var ranges = [];
  var averages = [];
  valuesFixed = valuesArray[1];
  valuesBest = valuesArray[2];
  valuesWorst = valuesArray[3];

///do something like waht is below for the averages and ranges utilizing valueBest, etc


  // Calculate user age for start point.
  function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  var start = calculateAge($scope.plan.birthdate);

  // Populate rage and averages
  // TODO: Use the actual numbers once the calculations are complete.
  var stdev;
  for (var i=0; i<(113-start); i++) {
    averages.push([
      i,
      valuesFixed[i]
    ]);
    
    ranges.push([
      i,
      valuesWorst[i],
      valuesBest[i]
    ]);
  }
  // End placeholder retirement calculations

  $('#retirementContainer').highcharts({
    title: {
      text: 'Retirement Savings Projection'
    },
    xAxis: {
      type: 'number',
      title: {
        text: 'Age'
      }
    },
    yAxis: {
      title: {
        text: 'Total Savings'
      }
    },
    tooltip: {
      crosshairs: true,
      shared: true
    },
    series: [{
      name: 'Projected Savings',
      data: averages,
      zIndex: 1,
      marker: {
        fillColor: 'white',
        lineWidth: 2,
        lineColor: Highcharts.getOptions().colors[0]
      }
    }, {
      name: 'Upper and Lower Bounds',
      data: ranges,
      type: 'arearange',
      lineWidth: 0,
      linkedTo: ':previous',
      color: Highcharts.getOptions().colors[0],
      fillOpacity: 0.3,
      zIndex: 0
    }]
  });
  // hide highcharts.com logo
  $('text[text-anchor=end]').hide();


});
