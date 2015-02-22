'use strict';

/*
Needed information:
  * fixed assets (checking/savings accounts, CDs, cash)
  * variable assets (401Ks, IRAs, non-retirement accounts)
  * personal assets (home value, car value, etc.)
  * liabilities (mortgage, auto loan, student loans, etc.)
    - for each liability, we need the balance, interest rate, min payment, current payment (may be more than min), expected change in interest rate (if it was an intro rate and it will jump to 24% in 5 months, etc.)
*/

angular.module('rockridge')
	.controller('NwsCtrl', function($scope) {
		// assign collected info to $scope.plan, defined in parent state: plan-builder.controller.js

		// $scope.queries must be an array of question objects in the order that they should appear to
		// the user. Question objects have a specific format that must be followed. For more info, see
		// client/components/question/questions.directive.js
		$scope.queries = [{
			title: 'Fixed Assets',
			question: "Please enter your fixed assets (checking/savings accounts, CDs, cash, etc.) If you don't have any, feel free to move to the next section.",
			bind: 'fixedAssets',
			type: 'table',
			fields: [{
				label: 'Asset Name',
				type: 'text',
				textAlign: 'left'
			}, {
				label: 'Value/Balance',
				type: 'number',
				textAlign: 'right'
			}]
		}, {
			title: 'Variable Assets',
			question: "Please enter your variable assets (401k, 403b, IRA, Roth IRA, brokerage account, etc.) If you don't have any, feel free to move to the next section.",
			bind: 'variableAssets',
			type: 'table',
			fields: [{
				label: 'Asset Name',
				type: 'text',
				textAlign: 'left'
			}, {
				label: 'Value/Balance',
				type: 'number',
				textAlign: 'right'
			}]
		}, {
			title: 'Personal Assets',
			question: "These are the kind of assets you may not normally consider, things like your house, car, etc. If you don't have any, feel free to move to the next section.",
			bind: 'personalAssets',
			type: 'table',
			fields: [{
				label: 'Asset Name',
				type: 'text',
				textAlign: 'left'
			}, {
				label: 'Value/Balance',
				type: 'number',
				textAlign: 'right'
			}]
		}, {
			title: 'Mortgages',
			question: "Please enter any Mortgages that you currently owe money on. If you don't have any, congratulations! Feel free to move to the next section.",
			bind: 'mortgages',
			type: 'table',
			fields: [{
				label: 'Liability Name',
				type: 'text',
				textAlign: 'left'
			}, {
				label: 'Interest Rate',
				type: 'number',
				textAlign: 'right'
			}, {
				label: 'Value/Balance',
				type: 'number',
				textAlign: 'right'
			}]
		}, {
			title: 'Student Loans',
			question: "Please enter any Federal Student Loans you currently have. If you don't have any, congratulations! Feel free to move to the next section.",
			bind: 'studentLoans',
			type: 'table',
			fields: [{
				label: 'Liability Name',
				type: 'text',
				textAlign: 'left'
			}, {
				label: 'Interest Rate',
				type: 'number',
				textAlign: 'right'
			}, {
				label: 'Value/Balance',
				type: 'number',
				textAlign: 'right'
			}]
		}, {
			title: 'Other Debts',
			question: "Please enter all other debt and liabilities in this section (auto loans, personal loans, credit cards, HELOCs, money owed to friends/family, etc.) If you don't have any, congratulations! Feel free to move to the next section.",
			bind: 'otherDebts',
			type: 'table',
			fields: [{
				label: 'Liability Name',
				type: 'text',
				textAlign: 'left'
			}, {
				label: 'Interest Rate',
				type: 'number',
				textAlign: 'right'
			}, {
				label: 'Value/Balance',
				type: 'number',
				textAlign: 'right'
			}]
		}];

	});
