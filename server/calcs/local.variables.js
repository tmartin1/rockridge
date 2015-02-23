// For maintaining and organizing local government variables.
// Require where needed as follows:
// var local = require('../calcs/local.variables');

'use strict';

// TODO: Add marginal state income tax data. This currently only accounts for states' top marginal income tax rate.
module.exports = {

  // Income tax is represented in decimal form: 0.069 = 6.9%
  stateIncomeTax = {
    'AK': 0.0, // No state income tax for Alaska
    'AL': 0.05,
    'AR': 0.069,
    'AZ': 0.0454,
    'CA': 0.123,
    'CO': 0.0463,
    'CT': 0.067,
    'DC': 0.0895,
    'DE': 0.066,
    'FL': 0.0, // No state income tax for Florida
    'GA': 0.06,
    'HI': 0.11,
    'IA': 0.0898,
    'ID': 0.074,
    'IL': 0.038,
    'IN': 0.033,
    'KS': 0.046,
    'KY': 0.06,
    'LA': 0.06,
    'MA': 0.052,
    'MD': 0.0575,
    'ME': 0.0795,
    'MI': 0.0425,
    'MN': 0.0985,
    'MO': 0.06,
    'MS': 0.05,
    'MT': 0.069,
    'NC': 0.058,
    'ND': 0.0322,
    'NE': 0.0684,
    'NH': 0.0, // NH has income tax of 5% on dividend interest only
    'NJ': 0.0897,
    'NM': 0.049,
    'NV': 0.0, // No state income tax for Nevada
    'NY': 0.0882,
    'OH': 0.05333,
    'OK': 0.0525,
    'OR': 0.099,
    'PA': 0.0307,
    'RI': 0.0599,
    'SC': 0.07,
    'SD': 0.0, // No state income tax for South Dakota
    'TN': 0.0, // TN has income tax of 6% on dividend interest only
    'TX': 0.0, // No state income tax for Texas
    'UT': 0.05,
    'VA': 0.0575,
    'VT': 0.0895,
    'WA': 0.0, // No state income tax for Washington
    'WI': 0.0765,
    'WV': 0.065,
    'WY': 0.0 // No state income tax for Wyoming
  };
}
