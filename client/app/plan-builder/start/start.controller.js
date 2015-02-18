'use strict';

angular.module('rockridge')
.controller('StartCtrl', function($scope) {
  // assign collected info to $scope.plan, defined in parent state: plan-builder.controller.js
  // ...for this example, data will bind to a temporary 'examplePlan' object
  $scope.examplePlan = {};

  // $scope.queries must be an array of question objects in the order that they should appear to 
  // the user. Question objects have a specific format that must be followed. For more info, see 
  // client/components/question/questions.directive.js
  $scope.queries = [
    { // Plain text example
      title: 'Plain Text',
      question: "This is an example of a plain text input, type something in.",
      bind: 'textthing',
      type: 'text'
    }, { // Select option example
      title: 'Select',
      question: "This is an example of a select input, select something.",
      bind: 'selectAttribute',
      type: 'select',
      options: [ 'Select 1', 'Select 2', 'Select 3' ]
    }, { // Checkbox example
      title: 'Checkbox',
      question: "This is an example of a checkbox input, check stuff.",
      bind: 'checkedAttributes',
      type: 'checkbox',
      options: [ 'Check Option 1', 'Check Option 2', 'Check Option 3' ]
    }, { // Radio option example
      title: 'Radio',
      question: "This is an example of a radio input, choose something.",
      bind: 'Attribute',
      type: 'radio',
      options: [ 'Radio Option 1', 'Radio Option 2', 'Radio Option 3' ]
    }, { // Button example
      title: 'Button',
      question: "This is an example of a button input, click something (the buttons don't do anything yet).",
      bind: 'Attribute',
      type: 'button',
      options: [ 'Button 1', 'Button 2', 'Button 3' ]
    }, { // Table example
      title: 'Table',
      question: "This is an example of a table input, input stuff (the button doesn't do anything yet, eventually will add rows).",
      bind: 'fromTable',
      type: 'table',
      fields: [
        { label: 'Column One (string)', type: 'text', textAlign: 'left' },
        { label: 'Column Two (number)', type: 'number', textAlign: 'right' }
      ]
    }, { // Multi-question example
      title: 'Multi-Question',
      type: 'multi',
      subqueries: [
        { question:'This is an example of a multi-question slide, at the moment, it can only handle simple input types.<br><br>What is your first name?', type:'text', bind:'firstname' },
        { question:'What is your last name?', type:'text', bind:'lastname' },
        { question:'When were you born?', type:'date', bind:'birthdate' }
      ]
    }, { // Prescreen example
      title: 'prescreen',
      question: "This is an example of a prescreen input, this doesn't work yet.",
      bind: 'prescreenThing',
      type: 'prescreen',
      options: [ 'Option 1', 'Option 2', 'Option 3' ]
    }
  ];


});
