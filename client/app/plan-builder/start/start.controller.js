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
    // Plain text example
    {
      title: 'Plain Text',
      question: "This is an example of a plain text input, type something in.",
      bind: 'textthing',
      type: 'text'
    },
    // Select option example
    {
      title: 'Select',
      question: "This is an example of a select input, select something.",
      bind: 'selectAttribute',
      type: 'select',
      options: [
        {
          text: 'Select 1',
          value: true
        }, {
          text: 'Select 2',
          value: false
        }
      ]
    },
    // Checkbox example
    {
      title: 'Checkbox',
      question: "This is an example of a checkbox input, check stuff.",
      bind: 'checkedAttributes',
      type: 'checkbox',
      options: [
        {
          text: 'Check Option 1',
          value: 'One'
        }, {
          text: 'Check Option 2',
          value: 'Two'
        }, {
          text: 'Check Option 3',
          value: 'Three'
        }
      ]
    },
    // Radio option example
    {
      title: 'Radio',
      question: "This is an example of a radio input, choose something.",
      bind: 'Attribute',
      type: 'radio',
      options: [
        {
          text: 'Radio Option 1',
          value: 1
        }, {
          text: 'Radio Option 2',
          value: 2
        }, {
          text: 'Radio Option 3',
          value: 3
        }
      ]
    },
    // Button example
    {
      title: 'Button',
      question: "This is an example of a button input, click something (the buttons don't do anything yet).",
      bind: 'Attribute',
      type: 'button',
      options: [
        {
          text: 'Button 1',
          value: function() { alert('Button 1!'); }
        }, {
          text: 'Button 2',
          value: function() { alert('Button 2!'); }
        }
      ]
    },
    // Table example
    {
      title: 'Table',
      question: "This is an example of a table input.",
      bind: 'fromTable',
      type: 'table',
      fields: [
        {
          label: 'Column One (string)',
          type: 'text',
          textAlign: 'left'
        }, {
          label: 'Column Two (number)',
          type: 'number',
          textAlign: 'right'
        }
      ]
    },
    // Multi-question example
    {
      title: 'Multi-Question',
      type: 'multi',
      subqueries: [
        {
          question:'What is your first name?',
          type:'text',
          bind:'firstname'
        }, {
          question:'What is your last name?',
          type:'text',
          bind:'lastname'
        }, {
          question:'When were you born?',
          type:'date',
          bind:'birthdate'
        }
      ]
    }
  ];



});
