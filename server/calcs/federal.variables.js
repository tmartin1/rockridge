// For maintaining and organizing federal variables.
// This file should only contain the variables. Please keep all calcs and funtions in separate files.
// Require where needed as follows:
// var federal = require('../calcs/federal.variables');

'use strict';

module.exports = {

  // Retriement contribution limits.
  retirement: {
    401kMax: 18500,
    iraMax: 5500
  },

  // Standard tax bracket rates.
  bracket: [ 0.1, 0.15, 0.25, 0.28, 0.33, 0.35, 0.396 ],

  // Standard tax bracket limits.
  bracketLimits: {
    single: {
      //
    },
    married: {
      //
    },
    headOfHouse: {
      //
    }
  },

  // Variables for deductions and exemptions.
  deductions: {
    //
  },

  // Variables for deductions and exemptions.
  exemptions: {
    personal: 4000,
    //
    gift: 14000
  },

  // FICA variables and limits.
  fica: {
    //
  },

  // Alternative Minimum Tax variables.
  amt: {
    //
  },

}
