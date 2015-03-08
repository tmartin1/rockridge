// Controller for retirement projection view within my-plan.

'use strict';

angular.module('rockridge')
.controller('RetireViewCtrl', function($scope, Auth, User) {

  $scope.user = Auth.getCurrentUser();
  $scope.plan = $scope.user.plan;
  //

var getDataArray = function(group){
	var values = [];
  var valuesUpper = [];
  var valuesLower = [];
	var labels = [];
	for(var key in group){
		//labels.push(key);
		// console.log(group[key]);

		values.push(group[key].totalSavingsAcctsThirtyYear);
    valuesUpper.push(group[key].totalSavingsAcctsThirtyYearUpperBound);
    valuesLower.push(group[key].totalSavingsAcctsThirtyYearLowerBound);
	}
  // console.log("uppers", valuesUpper);
  // console.log("lowers", valuesLower);
  // console.log("values", values);

  // console.log($scope.plan);
	return [labels, values, valuesUpper, valuesLower];
};

var getRetireProjDataArray = function(group){
	var valuesFixed = [];
	
	for(var key in group){
		valuesFixed.push(group[key].totalSavingsAccts);
	}

	return [valuesFixed];
};

var averages = [];

var aggregateAcctValue = [];
var aggregateAcctValueUpper = [];
var aggregateAcctValueLower = [];
var label = [];
var tuple = [];
tuple = getDataArray($scope.plan.retireProjection.retireProjThirtyYear);
aggregateAcctValue = tuple[1];
aggregateAcctValueUpper = tuple[2];
aggregateAcctValueLower = tuple[3];
var ten = aggregateAcctValue.slice(0,11);
var tenUpper = aggregateAcctValueUpper.slice(0,11);
var tenLower = aggregateAcctValueLower.slice(0,11);
var twenty = aggregateAcctValue.slice(0,21);
var twentyUpper = aggregateAcctValueUpper.slice(0,21);
var twentyLower = aggregateAcctValueLower.slice(0,21);

label = tuple[0];
var tenLabel = label.slice(0,11);
var twentyLabel = label.slice(0,21);

/// call func here
var valuesArray = getRetireProjDataArray($scope.plan.retireProjection.retireProj);
// var valuesFixed = valuesArray[1];
// var valuesBest = valuesArray[2];
// var valuesWorst = valuesArray[3];



$('#retireProjTenYearContainer').highcharts({
    chart: {
        zoomType: 'x'
    },
    title: {
        text: 'Retirement Projection Fixed 7% Rate 3% Inflation'
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
        data: valuesArray
    	}]
	});

//   $('text[text-anchor=end]').hide();

// $('#retireProjTwentyYearContainer').highcharts({
//     chart: {
//         zoomType: 'x'
//     },
//     title: {
//         text: '20 Year Aggregate Account Values using a Monte Carlo Simulation on S&P 500 Returns'
//     },
//     subtitle: {
//         text: document.ontouchstart === undefined ?
//                 'Click and drag in the plot area to zoom in' :
//                 'Pinch the chart to zoom in'
//     },
//     xAxis: {
//         type: 'datetime',
//         minRange: 365 * 24 * 3600000 // fourteen days
//     },
//     yAxis: {
//         title: {
//             text: 'Aggregate Accounts Value'
//         }
//     },
//     legend: {
//         enabled: false
//     },
//     plotOptions: {
//         area: {
//             fillColor: {
//                 linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
//                 stops: [
//                     [0, Highcharts.getOptions().colors[0]],
//                     [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
//                 ]
//             },
//             marker: {
//                 radius: 2
//             },
//             lineWidth: 1,
//             states: {
//                 hover: {
//                     lineWidth: 1
//                 }
//             },
//             threshold: null
//         }
//     },

//     series: [{
//         type: 'area',
//         name: 'Aggregate Account Values',
//         pointInterval: 365 * 24 * 3600 * 1000,
//         pointStart: Date.UTC(2015, 0, 1),
//         data: twenty
//     	}]
// 	});

//   $('text[text-anchor=end]').hide();

// $('#retireProjThirtyYearContainer').highcharts({
//     chart: {
//         zoomType: 'x'
//     },
//     title: {
//         text: '30 Year Aggregate Account Values using a Monte Carlo Simulation on S&P 500 Returns'
//     },
//     subtitle: {
//         text: document.ontouchstart === undefined ?
//                 'Click and drag in the plot area to zoom in' :
//                 'Pinch the chart to zoom in'
//     },
//     xAxis: {
//         type: 'datetime',
//         minRange: 365 * 24 * 3600 * 1000 // fourteen days
//     },
//     yAxis: {
//         title: {
//             text: 'Aggregate Accounts Value'
//         }
//     },
//     legend: {
//         enabled: false
//     },
//     plotOptions: {
//         area: {
//             fillColor: {
//                 linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
//                 stops: [
//                     [0, Highcharts.getOptions().colors[0]],
//                     [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
//                 ]
//             },
//             marker: {
//                 radius: 2
//             },
//             lineWidth: 1,
//             states: {
//                 hover: {
//                     lineWidth: 1
//                 }
//             },
//             threshold: null
//         }
//     },

//     series: [{
//         type: 'area',
//         name: 'Aggregate Account Values',
//         pointInterval: 365 * 24 * 1000 * 3600,
//         pointStart: Date.UTC(2015, 0, 1),
//         data: aggregateAcctValue
//     	}]
// 	});

//   $('text[text-anchor=end]').hide();


 var ranges = [];
  var averages = [];
  var ranges1 = [];
  var averages1 = [];
  var ranges2 = [];
  var averages2 = [];
  // valuesFixed = valuesArray[1];
  // valuesBest = valuesArray[2];
  // valuesWorst = valuesArray[3];


  // Calculate user age for start point.
  function calculateAge(birthday) { // birthday is a date
    birthday = new Date(birthday);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  var start = calculateAge($scope.plan.birthdate);

  // Populate rage and averages
  // TODO: Use the actual numbers once the calculations are complete.
  //var stdev;
  for (var i=0; i<aggregateAcctValue.length; i++) {
    averages.push([
      i,
      aggregateAcctValue[i]
    ]);
    ranges.push([
      i,
      aggregateAcctValueLower[i],
      aggregateAcctValueUpper[i]
    ]);
  }

for (var i=0; i<ten.length; i++) {
    averages1.push([
      i,
      ten[i]
    ]);
    ranges1.push([
      i,
      tenLower[i],
      tenUpper[i]
    ]);
  }

for (var i=0; i<twenty.length; i++) {
    averages2.push([
      i,
      twenty[i]
    ]);
    ranges2.push([
      i,
      twentyLower[i],
      twentyUpper[i]
    ]);
  }

  $('#retireProjFixedContainer1').highcharts({
    title: {
      text: 'Retirement Savings Projection (10 Year)'
    },
    xAxis: {
      type: 'number',
      title: {
        text: 'Years'
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
      data: averages1,
      zIndex: 1,
      marker: {
        fillColor: 'white',
        lineWidth: 2,
        lineColor: Highcharts.getOptions().colors[0]
      }
    }, {
      name: 'Standard Deviation',
      data: ranges1,
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
 // End placeholder retirement calculations
$('#retireProjFixedContainer2').highcharts({
    title: {
      text: 'Retirement Savings Projection (20 Year)'
    },
    xAxis: {
      type: 'number',
      title: {
        text: 'Years'
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
      data: averages2,
      zIndex: 1,
      marker: {
        fillColor: 'white',
        lineWidth: 2,
        lineColor: Highcharts.getOptions().colors[0]
      }
    }, {
      name: 'Standard Deviation',
      data: ranges2,
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


  $('#retireProjFixedContainer').highcharts({
    title: {
      text: 'Retirement Savings Projection (30 Year)'
    },
    xAxis: {
      type: 'number',
      title: {
        text: 'Years'
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
      name: 'Standard Deviation',
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
