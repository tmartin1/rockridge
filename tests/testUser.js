// This should match the format of a $scope.plan object and be used for testing.
// The inputs in this object match the inputs in the example excel document for comparrison.

var testUser = {
  birthdate: Mon Jun 09 1969 00:00:00 GMT-0700 (PDT),
  charitableContributions: 10000,
  children: Array[1],
  cityResident: "Seattle",
  dependents: 2,
  firstname: "Test",
  fixedAssets: [
    { asset: 'Checking Account', value: 5000 },
    { asset: 'Savings Account', value: 10000 }
  ],
  fixedExpenses: [
    { asset: 'Mortgage', value: 1960 },
    { asset: 'Utilities', value: 450 },
    { asset: 'Auto Loan', value: 500 },
    { asset: 'Student Loans', value: 1200 },
    { asset: 'Insurances', value: 700 },
    { asset: 'Groceries', value: 1000 },
    { asset: 'Childcare', value: 800 }
  ],
  flexibleExpenses: [
    { asset: 'Entertainment', value: 800 },
    { asset: 'Travel / Vacations', value: 1000 }
    { asset: 'Miscellaneous', value: 500 }
  ],
  grossAnnualIncome: 250000,
  hasChildren: "true",
  hasPrimaryResidence: "true",
  lastname: "User",
  maritalStatus: "true",
  mortgage: {
    currentBalance: 300000,
    currentRate: 3.9,
    currentTerm: 30,
    initialBalance: 400000,
    startDate: Sun Aug 01 2010 00:00:00 GMT-0700 (PDT)
  },
  mortgages: [
    { asset: 'Mortgage', rate: 3.9, balance: 400000 }
  ],
  otherDebts: [
    { asset: 'Auto Loan', rate: 0.9, balance: 35000 },
    { asset: 'Chase Credit Card', rate: 15.99, balance: 4000 },
    { asset: 'Disney Wedding Loan', rate: 9.5, balance: 41000 }
  ],
  otherDeductions: 5000,
  pentionIncome: 0,
  personalAssets: [
    { asset: 'Home', value: 500000 },
    { asset: 'Auto', value: 40000 },
    { asset: 'Other Stuff', value: 10000 }
  ],
  sameWorkResidence: "true",
  spouse401kContribution: 19000,
  spouseBirthdate: Fri Sep 06 1996 00:00:00 GMT-0700 (PDT),
  spouseCityResident: "Seattle",
  spouseEmployerDisabilityInsurance: undefined,
  spouseEmployerLifeInsurance: 50000,
  spouseFirstName: "Spouse",
  spouseGrossAnnualIncome: 100000,
  spouseHealthInsurance: "true",
  spouseIndividualDisabilityInsurance: 0,
  spouseIndividualLifeInsurance: 10000,
  spouseLastName: "User",
  spousePayrollDeductions: 400,
  spouseRothContribution: 5500,
  spouseStateResident: "WA",
  stateResident: "WA",
  studentLoans: [
    { asset: 'Federal Stafford', rate: 6.8, balance: 150000 },
    { asset: 'Federal Perkins', rate: 5.0, balance: 50000 }
  ],
  targetRetirementAge: 55,
  targetRetirementIncome: 8000,
  user401kContribution: 15000,
  userAutoInsurance: "true",
  userEmployerDisabilityInsurance: undefined,
  userEmployerLifeInsurance: 15000,
  userHealthInsurance: "true",
  userHomeInsurance: "true",
  userIndividualDisabilityInsurance: 0,
  userIndividualLifeInsurance: 0,
  userPayrollDeductions: 2000,
  userRothContribution: 5500,
  variableAssets: [
    { asset: 'Brokerage Account', value: 25000 },
    { asset: 'User 401k', value: 137000 },
    { asset: 'Spouse 401k', value: 10000 }
  ]
};
