// Calculations for retirement savings projections

'use strict';


module.exports.retirementProjection = function(plan){

	plan.retireProjection = {};

	var result = {};

	result.SandP = [13.80,32.43,15.88,2.07,14.87,27.11,-37.22,5.46,15.74,4.79,10.82,28.72,-22.27,-11.98,-9.11,21.11,28.73,33.67,23.06,38.02,1.19,10.17,7.60,30.95,-3.42,32.00,16.64,5.69,19.06,32.24,5.96,23.13,21.22,-5.33,32.76,18.69, 6.41,-7.78,24.20,38.46,-26.95,-15.03,19.15,14.54, 3.60,-8.63,11.03,24.45,-10.36,12.45,16.59,23.04,-9.20,28.51,-0.74,11.59,43.40,-9.30, 6.38,28.22,55.99,-0.80,18.35,23.10,34.28,15.96, 9.51, 2.56,-12.05,39.35,19.67,23.60,21.74,-9.09,-8.91, 2.98,17.50,-32.11,32.55,54.93,-8.01,56.79,-5.81,-44.20,-22.72,-9.46,47.57,37.10,11.51,25.83,27.10, 5.45,29.07,10.15,-13.95,19.67,18.21,-18.62, 8.12,31.20,-5.39];
	result.married = plan.maritalStatus;  //false;  // get from the plan object
	result.variableReturns = plan.variableReturns;     //false;  // get from plan object, need this added to plan object
	result.switchToLongTerm = false; // we initially deplete the result.nonRetirementAccounts first
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
  result.curMonthlySavings = 22800; // plan.aggregateMonthlySavings this is in the TODO in plan
  result.needsWithInflation = [];
  result.needsWithInflation[result.currentAge] = result.monthlyNeeds*((1+result.inflation) + (1+(result.inflation * 11/12)) + (1+(result.inflation * 10/12)) + (1+(result.inflation * 9/12)) + (1+(result.inflation * 8/12)) + (1+(result.inflation * 7/12)) + (1+(result.inflation * 6/12)) + (1+(result.inflation * 5/12)) + (1+(result.inflation * 4/12)) + (1+(result.inflation * 3/12)) + (1+(result.inflation * 2/12)) + (1+(result.inflation * 1/12)));

  for(var i=0; i<plan.variableAssets.length; i++){
  	if(!!plan.variableAssets[i].retirementAcct){            //this for loop will result.run with 
  		result.nonRetirementAccounts += plan.variableAssets[i].value;    //when hooked up to get result.nonRetirementAccounts
  	}																											// and result.retireAccounts
  	else{
  		result.retireAccounts += plan.variableAssets[i].value;
  	}
  }
  if(result.married){
	 		// need to add spouse to
 		// monthly needs
		// result.nonRetirementAccounts
		// result.retireAccounts
		// result.maxSaveLongTerm  * 2
		// monthly savings  plan.spouseAggregateMonthlySavings + plan.aggregateMonthlySavings
 	}
  result.retireProj = {};
  result.retireProj[result.currentAge] = {};
  result.retireProj[result.currentAge].amountMonthlyNeeds = 0;
  result.retireProj[result.currentAge].interest = 0;
  result.retireProj[result.currentAge].earlyRetireSavings = result.nonRetirementAccounts;
  result.retireProj[result.currentAge].longTermSavings = result.retireAccounts;
  result.retireProj[result.currentAge].totalSavingsAccts = result.nonRetirementAccounts + result.retireAccounts;

  plan.retireProjection = result;
  return result;
 
  function monteCarloSimulation(){

 		//here we will generate random returns 
  }
	function getInterest(){
 
 		var SandPcopy = SandP.slice();
 
		if(result.variableReturns){
 		//have to get all returns for last 100 years from s&P 500 and randomly generate them
 			// here we will do either bootstrap returns or perhaps monte
 		}
 		else{
 			return .07;   //use a monte carlo simulation for variable option
 		}
 
 		//return tuple and calculate returns for variable and 8%
 
	}
 
	function calcEarlyRetirementSavings(i, monthlySaveWithInflation, longTermMonthlySave, interest){
	 		
		var earlySavings = result.retireProj[i-1].earlyRetireSavings * (1+interest);
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
			else if(earlySavings<result.needsWithInflation[i] && earlySavings>0){
				result.needsWithInflation[i] -= earlySavings;
				result.switchToLongTerm = true;
				return 0;
			}
			else{
				return 0;
			}
		}
	}
 
//this function calculates inflation adjusted longTerm savings with 
	function calcLongTermSavings(i, monthlySaveWithInflation, longTermMonthlySave, interest){
	 		
		var longSavings = result.retireProj[i-1].longTermSavings * (1+interest);
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
			if(result.switchToLongTerm){ //switch to subtracting from long term savings
				longSavings -= result.needsWithInflation[i];
				result.needsWithInflation[i] = (result.needsWithInflation[i-1]/12)*((1+result.inflation) + (1+(result.inflation * 11/12)) + (1+(result.inflation * 10/12)) + (1+(result.inflation * 9/12)) + (1+(result.inflation * 8/12)) + (1+(result.inflation * 7/12)) + (1+(result.inflation * 6/12)) + (1+(result.inflation * 5/12)) + (1+(result.inflation * 4/12)) + (1+(result.inflation * 3/12)) + (1+(result.inflation * 2/12)) + (1+(result.inflation * 1/12)));
				return longSavings;
			}
			else{
			return longSavings;
			}

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
		var curr = val;							 //amount saved per month by $1
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
	function calculationsHome(currentMonthlySave, result.run){
	 	var theEnd = 113;  //age the user dies
	 	var interest = 0;
	 	var monthlySaveWInflate = [];
	 	var longTermMonthlySavings = []; 
	 	//if the amount currently saved/mo < maximum can save legally in (longTerm accts), then save all current Savings in longTerm 
	 	var max = currentMonthlySave>(result.maxSaveLongTerm/12) ? (result.maxSaveLongTerm/12) : currentMonthlySave;
	  monthlySaveWInflate[result.currentAge] = [currentMonthlySave];
	  longTermMonthlySavings[result.currentAge] = [max]; 

		for(var i=result.currentAge+1; i<theEnd+1; i++){  //iterate from now till theEnd of time for user
			result.retireProj[i] = {};  // create new object for age
			interest = getInterest();   // call interest to get this year's return
			result.retireProj[i].interest = interest;
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
			result.retireProj[i].earlyRetireSavings = calcEarlyRetirementSavings(i, monthlySaveWInflate, longTermMonthlySavings, interest);
			result.retireProj[i].longTermSavings = calcLongTermSavings(i, monthlySaveWInflate, longTermMonthlySavings, interest);
			result.retireProj[i].totalSavingsAccts = result.retireProj[i].earlyRetireSavings + result.retireProj[i].longTermSavings;

			if(!result.run){ // if this is the first time calculationsHome has been called 
				if(i === theEnd && result.retireProj[i].totalSavingsAccts > 0){
					result.endSavings = [theEnd, result.retireProj[i].totalSavingsAccts, currentMonthlySave]; // [theEndAge, savingsAccountsAmt, monthlySaving ]
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
			result.endSavings = [theEnd, result.retireProj[theEnd].totalSavingsAccts, suggestMonthlySave]; //update results
	 	}
 
	}
 
	//call calculationsHome to get started generating the data
	calculationsHome(result.curMonthlySavings, result.run);
 
 
 };
