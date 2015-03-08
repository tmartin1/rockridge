// Calculations for retirement savings projections

'use strict';
module.exports.retirementProjection = function(plan){

  plan.retireProjection = {};

  function dateReviver(key, value) {
    var a;
    if (typeof value === 'string') {
        a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
        if (a) {
            return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
        }
    }
    return value;
  };

  plan = JSON.parse(plan, dateReviver);

  console.log('wow', plan)

  var result = {};

  result.SandP = [13.80,32.43,15.88,2.07,14.87,27.11,-37.22,5.46,15.74,4.79,10.82,28.72,-22.27,-11.98,-9.11,21.11,28.73,33.67,23.06,38.02,1.19,10.17,7.60,30.95,-3.42,32.00,16.64,5.69,19.06,32.24,5.96,23.13,21.22,-5.33,32.76,18.69, 6.41,-7.78,24.20,38.46,-26.95,-15.03,19.15,14.54, 3.60,-8.63,11.03,24.45,-10.36,12.45,16.59,23.04,-9.20,28.51,-0.74,11.59,43.40,-9.30, 6.38,28.22,55.99,-0.80,18.35,23.10,34.28,15.96, 9.51, 2.56,-12.05,39.35,19.67,23.60,21.74,-9.09,-8.91, 2.98,17.50,-32.11,32.55,54.93,-8.01,56.79,-5.81,-44.20,-22.72,-9.46,47.57,37.10,11.51,25.83,27.10, 5.45,29.07,10.15,-13.95,19.67,18.21,-18.62, 8.12,31.20,-5.39];
  result.married = plan.maritalStatus;  //false;  // get from the plan object
  result.variableReturns = plan.variableReturns;     //false;  // get from plan object, need this added to plan object
  result.switchToLongTerm = false; // we initially deplete the result.nonRetirementAccounts first
  result.switchToLongTermWorst = false;
  result.switchToLongTermBest = false;
  result.run = false;
  result.searchForOptiSave = false;  // turns to true if do not get to the age of theEnd
  result.retireAge = plan.targetRetirementAge;      //plan.targetRetirementAge; // this is the age they wish to retire
  result.currentDate = new Date();
  result.currentAge = result.currentDate.getFullYear() - plan.birthdate.getFullYear();   //45;  // js Date Now - plan.birthdate
  result.monthlyNeeds = plan.targetRetirementIncome; //plan.targetRetirementIncome; // monthly needs
  result.inflation = .03;
  result.nonRetirementAccounts = 0;    //0;  // get from code below
  result.retireAccounts =  0;      //0; // get from code below
  result.maxSaveLongTerm = 24000;  // this is for an indvidual 403b 18500, IRA 5500
  result.curMonthlySavings = 1500; // plan.aggregateMonthlySavings this is in the TODO in plan
  result.needsWithInflation = [];
  result.needsWithInflation[result.currentAge] = result.monthlyNeeds*((1+result.inflation) + (1+(result.inflation * 11/12)) + (1+(result.inflation * 10/12)) + (1+(result.inflation * 9/12)) + (1+(result.inflation * 8/12)) + (1+(result.inflation * 7/12)) + (1+(result.inflation * 6/12)) + (1+(result.inflation * 5/12)) + (1+(result.inflation * 4/12)) + (1+(result.inflation * 3/12)) + (1+(result.inflation * 2/12)) + (1+(result.inflation * 1/12)));

  for(var i=0; i<plan.assets.variable.length; i++){
    if(plan.assets.variable[i].retirementAcct){            //this for loop will result.run with
      result.retireAccounts += plan.assets.variable[i].value;
    }                                                     // and result.retireAccounts
    else{
      result.nonRetirementAccounts += plan.assets.variable[i].value;    //when hooked up to get result.nonRetirementAccounts
    }
  }

  if(result.married){
    result.maxSaveLongTerm = result.maxSaveLongTerm * 2;
  }

  result.retireProj = {};
  result.retireProj[result.currentAge] = {};
  result.retireProj[result.currentAge].amountMonthlyNeeds = 0;
  result.retireProj[result.currentAge].interest = 0;
  result.retireProj[result.currentAge].earlyRetireSavings = result.nonRetirementAccounts;
  result.retireProj[result.currentAge].longTermSavings = result.retireAccounts;
  result.retireProj[result.currentAge].totalSavingsAccts = result.nonRetirementAccounts + result.retireAccounts;

  result.retireProj[result.currentAge].interestWorst = 0;
  result.retireProj[result.currentAge].earlyRetireSavingsWorst = result.nonRetirementAccounts;
  result.retireProj[result.currentAge].longTermSavingsWorst = result.retireAccounts;
  result.retireProj[result.currentAge].totalSavingsAcctsWorst = result.nonRetirementAccounts + result.retireAccounts;

  result.retireProj[result.currentAge].interestBest = 0;
  result.retireProj[result.currentAge].earlyRetireSavingsBest = result.nonRetirementAccounts;
  result.retireProj[result.currentAge].longTermSavingsBest = result.retireAccounts;
  result.retireProj[result.currentAge].totalSavingsAcctsBest = result.nonRetirementAccounts + result.retireAccounts;

  result.retireProjThirtyYear = {};
  result.retireProjThirtyYear[result.currentDate.getFullYear()] = {};
  result.retireProjThirtyYear[result.currentDate.getFullYear()].interest = 0;
  result.retireProjThirtyYear[result.currentDate.getFullYear()].earlyRetireSavingsThirtyYear = result.nonRetirementAccounts;
  result.retireProjThirtyYear[result.currentDate.getFullYear()].earlyRetireSavingsThirtyYearUpperBound = result.nonRetirementAccounts;
  result.retireProjThirtyYear[result.currentDate.getFullYear()].earlyRetireSavingsThirtyYearLowerBound = result.nonRetirementAccounts;
  result.retireProjThirtyYear[result.currentDate.getFullYear()].longTermSavingsThirtyYear = result.retireAccounts;
  result.retireProjThirtyYear[result.currentDate.getFullYear()].longTermSavingsThirtyYearUpperBound = result.retireAccounts;
  result.retireProjThirtyYear[result.currentDate.getFullYear()].longTermSavingsThirtyYearLowerBound = result.retireAccounts;
  result.retireProjThirtyYear[result.currentDate.getFullYear()].totalSavingsAcctsThirtyYear = result.nonRetirementAccounts + result.retireAccounts;
  result.retireProjThirtyYear[result.currentDate.getFullYear()].totalSavingsAcctsThirtyYearUpperBound = result.nonRetirementAccounts + result.retireAccounts;
  result.retireProjThirtyYear[result.currentDate.getFullYear()].totalSavingsAcctsThirtyYearLowerBound = result.nonRetirementAccounts + result.retireAccounts;

  //call calculationsHome to get started generating the data
  calculationsHome(result.curMonthlySavings, result.run);
  calcProjectionsForVariedReturns(30, result.curMonthlySavings);
  plan.retireProjection = result;
  return result;

  function getInterestWorst(i){
    var SandPworst = [-44.2, -37.22, -32.11, -26.95, -22.72, -22.27, -18.62, -15.03, -13.95, -12.05, -11.98, -10.36, -9.46, -9.3, -9.2, -9.11, -9.09, -8.91, -8.63, -8.01, -7.78, -5.81, -5.39, -5.33, -3.42, -0.8, -0.74, 1.19, 2.07, 2.56, 2.98, 3.6, 4.79, 5.45, 5.46, 5.69, 5.96, 6.38, 6.41, 7.6, 8.12, 9.51, 10.15, 10.17, 10.82, 11.03, 11.51, 11.59, 12.45, 13.8, 14.54, 14.87, 15.74, 15.88, 15.96, 16.59, 16.64, 17.5, 18.21, 18.35, 18.69, 19.06, 19.15, 19.67, 19.67, 21.11, 21.22, 21.74, 23.04, 23.06, 23.1, 23.13, 23.6, 24.2, 24.45, 25.83, 27.1, 27.11, 28.22, 28.51, 28.72, 28.73, 29.07, 30.95, 31.2, 32, 32.24, 32.43, 32.55, 32.76, 33.67, 34.28, 37.1, 38.02, 38.46, 39.35, 43.4, 47.57, 54.93, 55.99, 56.79];
    return (SandPworst[i-result.currentAge-1])/100;
  }

  //return the best interest rate for the year with S&P 500 historical returns
  function getInterestBest(i){
    var SandPbest = [56.79, 55.99, 54.93, 47.57, 43.4, 39.35, 38.46, 38.02, 37.1, 34.28, 33.67, 32.76, 32.55, 32.43, 32.24, 32, 31.2, 30.95, 29.07, 28.73, 28.72, 28.51, 28.22, 27.11, 27.1, 25.83, 24.45, 24.2, 23.6, 23.13, 23.1, 23.06, 23.04, 21.74, 21.22, 21.11, 19.67, 19.67, 19.15, 19.06, 18.69, 18.35, 18.21, 17.5, 16.64, 16.59, 15.96, 15.88, 15.74, 14.87, 14.54, 13.8, 12.45, 11.59, 11.51, 11.03, 10.82, 10.17, 10.15, 9.51, 8.12, 7.6, 6.41, 6.38, 5.96, 5.69, 5.46, 5.45, 4.79, 3.6, 2.98, 2.56, 2.07, 1.19, -0.74, -0.8, -3.42, -5.33, -5.39, -5.81, -7.78, -8.01, -8.63, -8.91, -9.09, -9.11, -9.2, -9.3, -9.46, -10.36, -11.98, -12.05, -13.95, -15.03, -18.62, -22.27, -22.72, -26.95, -32.11, -37.22, -44.2];
    return (SandPbest[i-result.currentAge-1])/100;
  }

  function calcEarlyRetirementSavings(i, monthlySaveWithInflation, longTermMonthlySave, interest, route, stdev){
    var nowYr = result.currentDate.getFullYear();
    route = route || 'fixed';
    var earlySavings = 0;
    if(route === 'fixed'){
      earlySavings = result.retireProj[i-1].earlyRetireSavings * (1+interest);
    }
    else if(route === 'best'){
      earlySavings = result.retireProj[i-1].earlyRetireSavingsBest * (1+interest);
    }
    else if(route === 'worst'){
      earlySavings = result.retireProj[i-1].earlyRetireSavingsWorst * (1+interest);
    }
    else if(route === 'upper'){
      earlySavings = result.retireProjThirtyYear[nowYr+i-1].earlyRetireSavingsThirtyYearUpperBound * (1+(interest+(stdev*3)));
    }
    else if(route === 'lower'){
      earlySavings = result.retireProjThirtyYear[nowYr+i-1].earlyRetireSavingsThirtyYearLowerBound * (1+(interest-(stdev*3)));
    }
    else{
      earlySavings = result.retireProjThirtyYear[nowYr+i-1].earlyRetireSavingsThirtyYear * (1+interest);
    }
    if(i<result.retireAge){
      if((monthlySaveWithInflation[i] - longTermMonthlySave[i])<=0){ //chk if have surplus for non-retirement
        return earlySavings;
      }
      else{
        earlySavings += (monthlySaveWithInflation[i] - longTermMonthlySave[i]) * ((1+interest) + (1+(interest * 11/12)) + (1+(interest * 10/12)) + (1+(interest * 9/12)) + (1+(interest * 8/12)) + (1+(interest * 7/12)) + (1+(interest * 6/12)) + (1+(interest * 5/12)) + (1+(interest * 4/12)) + (1+(interest * 3/12)) + (1+(interest * 2/12)) + (1+(interest * 1/12)));
        return earlySavings;
      }
    }
    else{
      if(earlySavings>result.needsWithInflation[i]){
        return earlySavings - result.needsWithInflation[i];
      }
      else if(earlySavings<result.needsWithInflation[i] && earlySavings>0 && route === 'fixed'){
        result.needsWithInflation[i] -= earlySavings;
        result.switchToLongTerm = true;
        return 0;
      }
      else if(earlySavings<result.needsWithInflation[i] && earlySavings>0 && route === 'worst'){
        result.needsWithInflation[i] -= earlySavings;
        result.switchToLongTermWorst = true;
        return 0;
      }
      else if(earlySavings<result.needsWithInflation[i] && earlySavings>0 && route === 'best'){
        result.needsWithInflation[i] -= earlySavings;
        result.switchToLongTermBest = true;
        return 0;
      }
      else{
        return 0;
      }
    }
  }

  function calcLongTermSavings(i, monthlySaveWithInflation, longTermMonthlySave, interest, route, stdev){
    var nowYr = result.currentDate.getFullYear();
    route = route || 'fixed';
    var longSavings = 0;
    if(route === 'fixed'){
      longSavings = result.retireProj[i-1].longTermSavings * (1+interest);
    }
    else if(route === 'best'){
      longSavings = result.retireProj[i-1].longTermSavingsBest * (1+interest);
    }
    else if(route === 'worst'){
      longSavings = result.retireProj[i-1].longTermSavingsWorst * (1+interest);
    }
    else if(route === 'upper'){
      longSavings = result.retireProjThirtyYear[nowYr+i-1].longTermSavingsThirtyYearUpperBound * (1+(interest+(stdev*3)));
    }
    else if(route === 'lower'){
      longSavings = result.retireProjThirtyYear[nowYr+i-1].longTermSavingsThirtyYearLowerBound * (1+(interest-(stdev*3)));
    }
    else{
      longSavings = result.retireProjThirtyYear[nowYr+i-1].longTermSavingsThirtyYear * (1+interest);
    }
    if(i<result.retireAge){
      if(monthlySaveWithInflation[i]>longTermMonthlySave[i]){
        longSavings += (longTermMonthlySave[i]) * ((1+interest) + (1+(interest * 11/12)) + (1+(interest * 10/12)) + (1+(interest * 9/12)) + (1+(interest * 8/12)) + (1+(interest * 7/12)) + (1+(interest * 6/12)) + (1+(interest * 5/12)) + (1+(interest * 4/12)) + (1+(interest * 3/12)) + (1+(interest * 2/12)) + (1+(interest * 1/12)));
        return longSavings;
      }
      else if(monthlySaveWithInflation[i]>0){
        longSavings += (monthlySaveWithInflation[i]) * ((1+interest) + (1+(interest * 11/12)) + (1+(interest * 10/12)) + (1+(interest * 9/12)) + (1+(interest * 8/12)) + (1+(interest * 7/12)) + (1+(interest * 6/12)) + (1+(interest * 5/12)) + (1+(interest * 4/12)) + (1+(interest * 3/12)) + (1+(interest * 2/12)) + (1+(interest * 1/12)));
        return longSavings;
      }
      else{
        return longSavings;
      }
    }
    else{
      if(result.switchToLongTerm && route === 'fixed'){ //switch to subtracting from long term savings
        longSavings -= result.needsWithInflation[i];
        result.needsWithInflation[i] = (result.needsWithInflation[i-1]/12)*((1+result.inflation) + (1+(result.inflation * 11/12)) + (1+(result.inflation * 10/12)) + (1+(result.inflation * 9/12)) + (1+(result.inflation * 8/12)) + (1+(result.inflation * 7/12)) + (1+(result.inflation * 6/12)) + (1+(result.inflation * 5/12)) + (1+(result.inflation * 4/12)) + (1+(result.inflation * 3/12)) + (1+(result.inflation * 2/12)) + (1+(result.inflation * 1/12)));
        return longSavings;
      }
      else if(result.switchToLongTermWorst && route === 'worst'){
        longSavings -= result.needsWithInflation[i];
        result.needsWithInflation[i] = (result.needsWithInflation[i-1]/12)*((1+result.inflation) + (1+(result.inflation * 11/12)) + (1+(result.inflation * 10/12)) + (1+(result.inflation * 9/12)) + (1+(result.inflation * 8/12)) + (1+(result.inflation * 7/12)) + (1+(result.inflation * 6/12)) + (1+(result.inflation * 5/12)) + (1+(result.inflation * 4/12)) + (1+(result.inflation * 3/12)) + (1+(result.inflation * 2/12)) + (1+(result.inflation * 1/12)));
        if(longSavings<=0){
          return 0;
        }
        return longSavings;
      }
      else if(result.switchToLongTermBest && route === 'best'){
        longSavings -= result.needsWithInflation[i];
        result.needsWithInflation[i] = (result.needsWithInflation[i-1]/12)*((1+result.inflation) + (1+(result.inflation * 11/12)) + (1+(result.inflation * 10/12)) + (1+(result.inflation * 9/12)) + (1+(result.inflation * 8/12)) + (1+(result.inflation * 7/12)) + (1+(result.inflation * 6/12)) + (1+(result.inflation * 5/12)) + (1+(result.inflation * 4/12)) + (1+(result.inflation * 3/12)) + (1+(result.inflation * 2/12)) + (1+(result.inflation * 1/12)));
        return longSavings;
      }
      else{
        return longSavings;
      }

    }
  }

  function monteCarloSimulation(){
    // monthlyReturns = 360 monthly returns taken from historical prices found on yahoo finance
    var monthlyReturns = [0.05344,-0.03153,-0.00420,0.02424,0.02294,-0.01564,0.03696,-0.01519,0.01888,0.02081,0.00618,0.00691,0.04221,-0.03623,0.02329,0.02766,0.04363,0.02932,-0.03180,0.04828
                          ,-0.01511,0.02055,0.01792,0.03536,0.01100,0.04920,0.00704,0.00284,-0.01999,0.02395,0.01957,0.01252,0.03879,-0.06470,-0.00753,0.03085,0.03979,0.04266,0.00850,-0.00507,0.10231
                          ,-0.07447,-0.05847,-0.02171,-0.01843,-0.01359,0.02810,-0.00105,0.03146,0.02239,0.06326,-0.00229,0.03619,0.08393,-0.04861,0.06652,-0.05539,-0.08553,0.01465,0.05713,0.02811,-0.03768,0.01761,0.05578,-0.01996
                          ,0.03510,0.03301,0.07152,0.00020,0.05172,0.08977,0.08195,-0.11646,-0.08955,0.00779,-0.07780,-0.18564,-0.09518,0.01212,-0.00991,-0.08988,0.01062,0.04645,-0.00598,-0.03538,-0.06311,-0.00867,-0.04504,0.01471,0.03517,0.01278
                          ,-0.03250,-0.01798,0.03203,0.04238,0.00993,-0.02209,0.01396,0.01254,0.01633,0.03102,0.02427,0.02105,0.00507,0.00009,-0.03140,0.01208,0.01103,0.00045,0.02515,-0.00095
                          ,0.03458,-0.01790,0.00692,-0.01129,0.03534,-0.00014,0.02951,-0.02031,-0.01930,0.01873,-0.02562,0.03194,0.03787,0.01392,0.00932,0.00228,-0.03489,0.01783,0.01201,-0.01693,-0.01649
                          ,0.01214,0.01713,0.04952,0.00710,0.05350,-0.01202,0.01772,0.01609,0.01126,0.04965,0.07793,0.00832,-0.01715,-0.02780,-0.06223,0.05550,0.08291,-0.11656,0.00487,-0.08230
                          ,-0.07521,-0.00912,-0.06338,0.03608,-0.02098,-0.01570,0.00755,0.07248,0.01794,-0.08526,-0.06626,-0.01080,-0.02535,0.00508,0.07401,-0.06636,-0.09683,0.03405,0.00405,-0.08346,-0.00496,-0.05497,0.05893,-0.01648
                          ,0.02365,-0.02216,-0.03128,0.09232,-0.02031,-0.05224,0.05623,0.01888,0.06066,-0.02897,-0.00627,-0.03257,0.05301,-0.02529,0.03724,0.03806,-0.03282,0.04019,0.05484,0.05744,0.07723,0.06053,-0.15759,-0.01168
                          ,0.03868,-0.01901,0.00904,0.04874,0.06808,0.01010,0.01561,0.04362,-0.03509,0.05179,-0.05918,0.07524,0.04254,0.05693,0.05676,-0.04355,0.00591
                          ,0.05951,-0.02174,0.07081,0.02577,0.05279,0.01864,-0.04683,0.00225,0.02260,0.01334,0.00789,0.00691,0.03210,0.01729,0.04023,-0.00499,0.03931,-0.00032,0.03128,0.02106,0.03567,0.02758,0.02696,0.03544,0.02399,0.01222,-0.04031,0.02062,-0.02725
                          ,0.03691,0.03100,-0.02716,0.01232,0.01146,-0.04683,-0.03051,0.03198,0.01004,-0.01299,0.01921,-0.01004,0.03385,-0.00534,0.00075,0.02246,-0.02575,0.01852,0.01043
                          ,0.00702,0.01006,0.02981,0.00210,0.00906,-0.02429,0.03862,-0.01751,0.00096,0.02751,-0.02207,0.00954,-0.02012,0.10579,-0.04490,0.01176,-0.01933,0.01946,0.04388
                          ,-0.04908,0.03788,0.00032,0.02196,0.06511,0.04068,0.02452,0.05821,-0.00672,-0.05254,-0.09906,-0.00524,-0.00893,0.08800,-0.02726,0.02397,0.00850,-0.07130,0.02119
                          ,0.01641,-0.02550,-0.00657,0.01540,0.08468,-0.00796,0.03453,0.04888,0.02059,-0.02937,0.06870,0.01458,-0.01907,0.02563,0.03896,-0.03936,-0.00543
                          ,0.04235,0.00317,0.00938,-0.03391,0.04097,0.03964,0.07033,-0.08921,-0.24543,-0.02446,0.03436,0.04710,0.04680,0.00602,-0.01152,0.02605,0.03626,0.12378
                          ,-0.02870,0.02125,0.05328,-0.08931,0.06877,-0.06048,0.01401,0.04901,-0.01425,0.05145,0.06905,0.00236,0.04408,0.06303,0.04163,-0.03534,-0.01207,-0.00486,0.01206,0.05264,-0.00460, 0.01206];
    //360 monthly returns;
    var newMonthReturns = [];
    var yearlyReturns = [];
    var thirtyYearlyReturns = [];
    for(var j=0; j<1000; j++){   //1000 X 360, rows X cols, iterations X monthlyReturns
      newMonthReturns.push([]);
      for(var i=0; i<360; i++){
        //use random number generator to draw 360 random returns from the array above, repeat 1000 times
        newMonthReturns[j].push(monthlyReturns[Math.floor(Math.random()*360)]);
      }
    }
    ///get 1000 iterations of 30 year returns
    var fini = 12;
    var calcYearRet = function(start, finish, index){
      var result;
      //get consecutive twelve months from the from the 360 monthly random returns generated
      var subArr = newMonthReturns[index].slice(start, finish);
      //calculate the yearly return, each month compounded, subtract 1 to account for the added 1
      result = (subArr[0]+1)*(subArr[1]+1)*(subArr[2]+1)*(subArr[3]+1)*(subArr[4]+1)*(subArr[5]+1)*(subArr[6]+1)*(subArr[7]+1)*(subArr[8]+1)*(subArr[9]+1)*(subArr[10]+1)*(subArr[11]+1);
      return result-1;
    };

    for(var i=0; i<1000; i++){  // 1000 iterations X 30 years
      yearlyReturns.push([]);
      for(var j=0; j<30; j++){
        //get 1000 iterations of 30 years of returns, call calcYearRet, passing the start and end value
        //which is 0 to 12 months, then iterate to months 12 to 24, 24 to 36, and so on
        yearlyReturns[i].push(calcYearRet(fini-12, fini, i));
        fini+=12;
      }
      fini = 12;
    }
    //getting 30 years of yearly returns from the 1000 iterations by averaging them
    // 30 X 1
    var sum = 1;
    var geoMean = 0;
    for(var j=0; j<30; j++){
      for(var i=0; i<1000; i++){
        sum *= (yearlyReturns[i][j]+1);
      }
      //used a geometric mean because it is a lower and more strict average
      geoMean = Math.pow(sum, (1/1000))-1;
      thirtyYearlyReturns.push(geoMean);
      sum=1;
    }

    return thirtyYearlyReturns;
  }

  function calcStdev(rets){
    var retsSum = 0;
    var retsMean = 0;
    var retsSqSum = 0;
    for(var i=0; i<rets.length; i++){
      retsSum += rets[i];
    }
    retsMean = retsSum/rets.length;
    for(var j=0; j<rets.length; j++){
      retsSqSum += Math.pow((rets[j]-retsMean), 2);
    }
    return Math.pow((retsSqSum/(rets.length-1)), 1/2);
  }

  function calcProjectionsForVariedReturns(years, currentMonthlySave){
    var rets = monteCarloSimulation();
    var monthlySaveWInflateVaried = [];
    var longTermMonthlySavingsVaried = [];
    var max = currentMonthlySave>(result.maxSaveLongTerm/12) ? (result.maxSaveLongTerm/12) : currentMonthlySave;
    monthlySaveWInflateVaried[0] = [currentMonthlySave];
    longTermMonthlySavingsVaried[0] = [max];
   console.log("monthlySaveWInflateVaried: " + monthlySaveWInflateVaried);
   console.log("longTermMonthlySavingsVaried: "+ longTermMonthlySavingsVaried);
    var yearsCounter = 1;
    var variedInterest = 0;
    var stdev = calcStdev(rets);
    var nowYr = result.currentDate.getFullYear();

    for(var i=1; i<=years; i++){
      variedInterest = rets[i-1]; //retRetsTuple[0];
      monthlySaveWInflateVaried[i] = (1+(result.inflation/12))*monthlySaveWInflateVaried[i-1];  // get inflation adjusted monthlySavings
      longTermMonthlySavingsVaried[i] = (1+(result.inflation/12))*longTermMonthlySavingsVaried[i-1];
      result.retireProjThirtyYear[nowYr+i] = {};
      result.retireProjThirtyYear[nowYr+i].interest = variedInterest;
      result.retireProjThirtyYear[nowYr+i].earlyRetireSavingsThirtyYear = calcEarlyRetirementSavings(i, monthlySaveWInflateVaried, longTermMonthlySavingsVaried, variedInterest, 'varied');
      result.retireProjThirtyYear[nowYr+i].earlyRetireSavingsThirtyYearUpperBound = calcEarlyRetirementSavings(i, monthlySaveWInflateVaried, longTermMonthlySavingsVaried, variedInterest, 'upper', stdev);
      result.retireProjThirtyYear[nowYr+i].earlyRetireSavingsThirtyYearLowerBound = calcEarlyRetirementSavings(i, monthlySaveWInflateVaried, longTermMonthlySavingsVaried, variedInterest, 'lower', stdev);
      result.retireProjThirtyYear[nowYr+i].longTermSavingsThirtyYear = calcLongTermSavings(i, monthlySaveWInflateVaried, longTermMonthlySavingsVaried, variedInterest, 'varied');
      result.retireProjThirtyYear[nowYr+i].longTermSavingsThirtyYearUpperBound = calcLongTermSavings(i, monthlySaveWInflateVaried, longTermMonthlySavingsVaried, variedInterest, 'upper', stdev);
      result.retireProjThirtyYear[nowYr+i].longTermSavingsThirtyYearLowerBound = calcLongTermSavings(i, monthlySaveWInflateVaried, longTermMonthlySavingsVaried, variedInterest, 'lower', stdev);
      result.retireProjThirtyYear[nowYr+i].totalSavingsAcctsThirtyYear = result.retireProjThirtyYear[nowYr+i].earlyRetireSavingsThirtyYear + result.retireProjThirtyYear[nowYr+i].longTermSavingsThirtyYear;
      result.retireProjThirtyYear[nowYr+i].totalSavingsAcctsThirtyYearUpperBound = result.retireProjThirtyYear[nowYr+i].earlyRetireSavingsThirtyYearUpperBound + result.retireProjThirtyYear[nowYr+i].longTermSavingsThirtyYearUpperBound;
      result.retireProjThirtyYear[nowYr+i].totalSavingsAcctsThirtyYearLowerBound = result.retireProjThirtyYear[nowYr+i].earlyRetireSavingsThirtyYearLowerBound + result.retireProjThirtyYear[nowYr+i].longTermSavingsThirtyYearLowerBound;
    }
  }
  //this function is called to find the minimum amount per month in whole dollars the user
  //needs to save to meet their monthly needs in retirement
  //function is only called if the users current monthly savings fails to get them to theEnd with a
  // positive balance
  function calcMonthlySavingsToMeetGoals(monthlySave){

    result.run = true; //now we are past our first result.run, this will take us to a different
                       //set of if else statements in calculationsHome
    var startSaving = 0;
    var callWhile = function(val){ //function calls a while loop that calls calcHome incrementing the
    var curr = val;              //amount saved per month by $1
    var value = -1;
      while(value<0){
        curr+=1;
        value = calculationsHome(curr, result.run); //call calcHome and set to value
      }
      return curr;
    };
    startSaving = callWhile(monthlySave);
    return startSaving;    //return the amount to save to meet retirement goals
  }

//function generates all the data for the results container
  function calculationsHome(currentMonthlySave, run){
    var theEnd = 120;  //age the user dies
    var interest = 0;
    var interestWorst = 0;
    var interestBest = 0;
   // var interestVariable = 0;
    var monthlySaveWInflate = [];
    var longTermMonthlySavings = [];
    //if the amount currently saved/mo < maximum can save legally in (longTerm accts), then save all current Savings in longTerm
    var max = currentMonthlySave>(result.maxSaveLongTerm/12) ? (result.maxSaveLongTerm/12) : currentMonthlySave;
    monthlySaveWInflate[result.currentAge] = [currentMonthlySave];
   // console.log('monthlySaveWInflate', monthlySaveWInflate);
    longTermMonthlySavings[result.currentAge] = [max];
    //console.log('longTermMonthlySavings',longTermMonthlySavings);

    for(var i=result.currentAge+1; i<theEnd+1; i++){  //iterate from now till theEnd of time for user
      result.retireProj[i] = {};  // create new object for age
      interest = 0.07;   // call interest to get this year's return
      interestWorst = getInterestWorst(i);
      interestBest = getInterestBest(i);

      result.retireProj[i].interest = interest;
      result.retireProj[i].interestWorst = interestWorst;
      result.retireProj[i].interestBest = interestBest;
      result.needsWithInflation[i] = (result.needsWithInflation[i-1]/12)*((1+result.inflation) + (1+(result.inflation * 11/12)) + (1+(result.inflation * 10/12)) + (1+(result.inflation * 9/12)) + (1+(result.inflation * 8/12)) + (1+(result.inflation * 7/12)) + (1+(result.inflation * 6/12)) + (1+(result.inflation * 5/12)) + (1+(result.inflation * 4/12)) + (1+(result.inflation * 3/12)) + (1+(result.inflation * 2/12)) + (1+(result.inflation * 1/12)));

      if(i>=result.retireAge){  // check if user is retired
        result.retireProj[i].amountMonthlyNeeds = (result.needsWithInflation[i]/12);  // get inflation adjusted monthly needs in retirement
      }
      else{
        result.retireProj[i].amountMonthlyNeeds = 0;
        monthlySaveWInflate[i] = (1+(result.inflation/12))*monthlySaveWInflate[i-1];  // get inflation adjusted monthlySavings
        longTermMonthlySavings[i] = (1+(result.inflation/12))*longTermMonthlySavings[i-1]; // get inflastion adjusted longTermMonthlySavings
      }
      //call appropriate functions to calc items in retireProj
      
      result.retireProj[i].earlyRetireSavings = calcEarlyRetirementSavings(i, monthlySaveWInflate, longTermMonthlySavings, interest, 'fixed');
      result.retireProj[i].longTermSavings = calcLongTermSavings(i, monthlySaveWInflate, longTermMonthlySavings, interest, 'fixed');
      result.retireProj[i].totalSavingsAccts = result.retireProj[i].earlyRetireSavings + result.retireProj[i].longTermSavings;

      result.retireProj[i].earlyRetireSavingsWorst = calcEarlyRetirementSavings(i, monthlySaveWInflate, longTermMonthlySavings, interestWorst, 'worst');
      result.retireProj[i].longTermSavingsWorst = calcLongTermSavings(i, monthlySaveWInflate, longTermMonthlySavings, interestWorst, 'worst');
      result.retireProj[i].totalSavingsAcctsWorst = result.retireProj[i].earlyRetireSavingsWorst + result.retireProj[i].longTermSavingsWorst;

      result.retireProj[i].earlyRetireSavingsBest = calcEarlyRetirementSavings(i, monthlySaveWInflate, longTermMonthlySavings, interestBest, 'best');
      result.retireProj[i].longTermSavingsBest = calcLongTermSavings(i, monthlySaveWInflate, longTermMonthlySavings, interestBest, 'best');
      result.retireProj[i].totalSavingsAcctsBest = result.retireProj[i].earlyRetireSavingsBest + result.retireProj[i].longTermSavingsBest;

      if(!run){ // if this is the first time calculationsHome has been called
        if(i === theEnd && result.retireProj[i].totalSavingsAccts > 0){
          result.retireProj.endSavings = [theEnd, result.retireProj[i].totalSavingsAccts, currentMonthlySave]; // [theEndAge, savingsAccountsAmt, monthlySaving ]
        }
        else if(i<theEnd && i>result.retireAge && result.retireProj[i].totalSavingsAccts < result.needsWithInflation[i]){
          result.switchToLongTerm = false;  //stop taking monthlyNeeds from longTermSavings, because monthlySavings are insufficient and we are going to recalculate
          result.searchForOptiSave = true; //flag to call calcMonthlySavingsToMeetGoals
          break;
        }
      }

      else{ //if calculationsHome has been called > 1, this else part is used during the calcMonthlySavingsToMeetGoals calls
        if(i >= theEnd && result.retireProj[i].totalSavingsAccts > 0){
          return result.retireProj[i].totalSavingsAccts;
        }
        else if(i<theEnd && i>result.retireAge && result.retireProj[i].totalSavingsAccts < result.needsWithInflation[i]){
          result.switchToLongTerm = false; //stop taking monthlyNeeds from longTermSavings, because monthlySavings are insufficient and we are going to recalculate
          return  -1; //return -1 to keep calcMonthlySavingsToMeetGoals monthlySavings increasing
        }
      }

    }

    if(result.searchForOptiSave){
      var suggestMonthlySave = calcMonthlySavingsToMeetGoals(currentMonthlySave);
      result.retireProj.endSavings = [theEnd, result.retireProj[theEnd].totalSavingsAccts, suggestMonthlySave]; //update results
    } 
  }
 
};
