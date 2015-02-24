// Income tax projection builder
'use strict';

var federal = require('../federal.variables');
var local = require('../local.variables');
// var calculate = require('./tax.util');

// Requires a plan object as a parameter
// Appends a taxProjection object to the plan and returns that same object.
module.exports.projection = function(plan) {
  // Define or reset plan.taxProjection to empty object before starting the calculations.
  plan.taxProjection = {};

  // Calculate projection results.
  var result = {};

  result.householdGross = (plan.grossAnnualIncome || 0) + (plan.spouseGrossAnnualIncome || 0);
  result.pretaxContributions = (plan.user401kContribution || 0) + (plan.spouse401kContribution || 0);
  result.agi = result.householdGross - result.pretaxContributions;

  // Deductions calculations
  result.deductions = {};
  // Standard deduction calcs
  result.deductions.standard = getVar(federal.deduction.standard);
  // Itemized deduction calcs
  result.deductions.itemized = {};
  // TODO: Refactor local taxes to account for living and working in different states.
  result.deductions.itemized.localTaxes = stateTax();
  // TODO: Add calculations and data for property tax estimates.
  result.deductions.itemized.propertyTaxes = 0000;
  result.deductions.itemized.mortgageInterest = mortgageInterest();
  result.deductions.itemized.miscDeduction = plan.otherDeductions; // This is just a user input right now
  result.deductions.maxApplicable = maxDeduction();

  // Exemption calcs
  result.exemptions = {};
  exemptionCalc();

  // Tax calcs
  results.projected = {};
  // Federal/AMT and local taxes
  results.projected.federal = federalTax();
  results.projected.amt = amtCalc();
  results.projected.local = result.deductions.itemized.localTaxes;
  // FICA tax calcs
  results.projected.fica = {};
  results.projected.fica.ss = ssCalc();
  results.projected.fica.medicare = medicareCalc();

  plan.taxProjection = result;
  return result;

  // Helper functions

  // Get variable from federal variable module.
  function getVar(target) {
    if (!target) {
      console.log('ERROR: Imporper variable request for', target, 'from federal.variables.js');
      return null;
    }
    // Check to see if requested variable depends on marital status.
    if (target[plan.maritalStatus]) {
      return target[maritalStatus];
    } else {
      return target;
    }
  }

  // TODO: Calculate state income tax marginally, rather than just by highest marginal.
  function stateTax() {
    var agi = result.agi || ( ((plan.grossAnnualIncome || 0) + (plan.spouseGrossAnnualIncome || 0)) - ((plan.user401kContribution || 0) + (plan.spouse401kContribution || 0)) );
    var state = plan.residentState;
    return ( agi * getVar(local.stateIncomeTax(state)) );
  }

  // Calculate the portion of the current years' mortgage payment that is interest.
  function mortgageInterest() {
    var mortgage = plan.mortgage;

  }

  // Determine the user's maximum allowable deduction.
  function maxDeduction() {
    //
  }

  // Determine potential exemptions, reductions, and final exemption value.
  function exemptionCalc() {
    // Determine potential exemptions
    //
    result.exemptions.claimed = 0000;

    // Calculate exemption reduction
    //
    result.exemptions.reductions = 0000;

    // Calculate maximum applicable exemptions.
    //
    result.exemptions.maxApplicable = 0000;
  }

  // Calculate the federal tax liability.
  function federalTax() {
    //
  }

  function amtCalc() {
    //
  }

  // Calculate the Social Security tax.
  function ssCalc() {
    var gross = result.householdGross || ( (plan.grossAnnualIncome || 0) + (plan.spouseGrossAnnualIncome || 0)) - ((plan.user401kContribution || 0) + (plan.spouse401kContribution || 0) );
    var taxable = Math.min( gross, federal.fica.ssWageBase );
    return ( taxable * federal.fica.ssTax );
  }

  // Calculate basic and additional medicare tax.
  function medicareCalc() {
    // Calculations for standard medicare tax.


    // Calculationsfor additional medicare tax.
    results.projected.fica.addlMedicare = 0000;
  }


};




/* This document should run all income tax projections and return an object with
   the results of all the tax calculations. The object should look like:

var taxResults = {
  deductions: {
    standard: num,
    itemized: {
      localTaxes: num,
      propertyTaxes: num,
      mortgageInterest: num,
      miscDeduction: num
    },
    maxApplicable: num
  },
  exemptions: {
    claimed: num,
    reductions: num,
    maxApplicable: num
  },
  projected: {
    federal: num,
    amt: num,
    local: num,
    fica: {
      ss: num,
      medicare: num,
      addlMedicare: num
    }
  }
};

*/
