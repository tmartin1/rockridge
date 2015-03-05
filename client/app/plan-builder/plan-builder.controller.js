'use strict';

angular.module('rockridge')
  .controller('PlanBuilderCtrl', function($rootScope, $scope, $location, $state,
    Auth, User) {
    // Define plan object that will be used and accessed by the different planning states.

    $scope.plan = {};
    // If user is logged in, retrieve their plan
    User.get().$promise
    .then(function(user) {
      Auth.getPlan(user['@rid'])
      .then(function(plan) {
        $scope.plan = plan;
        console.log(plan);
      });
    });

    $scope.selectedSection = 0;
    // Track what sections are complete and started
    $scope.sections = {
      complete: [],
      enabled: []
    };

    // Open the first question in accordion automatically
    var nextStep = function(){
      setTimeout(function(){
        var title = $($('.ui.accordion').find('.title')[0]).attr('data-title');
        if(!$scope.sections.complete[title]){
          $($('.ui.accordion').find('.title')[0]).removeClass('disabled');
          $('.ui.accordion').accordion('open', 0);
          $scope.sections.enabled[title] = true;
        }
      }, 1000);
    };
    nextStep();

    $scope.previous = null;
    $scope.next = null;
    $scope.isCollapsed = true;
    $scope.pctComplete = 0;
    $scope.accordionSection = 0;
    $scope.user = {};
    $scope.signup = function() {
      $('.ui.modal').modal('hide');
      Auth.createUser($scope.user)
      .then(function(user) {
        User.get().$promise
        .then(function(userOb) {
          // Stringify plan b/c OrientDB won't allow keys/fields with spaces
          var plan = JSON.stringify($scope.plan);
          Auth.savePlan(userOb['@rid'], plan);
        });
      });
    };

    // Defines the order of how pages are displayed to the user.
    var order = [
      'plan-builder.start',
      'plan-builder.basics',
      'plan-builder.nws',
      'plan-builder.tax',
      'plan-builder.msa',
      'plan-builder.risk',
      'plan-builder.retire'
    ];

    // Data that controls the semantic-ui steps element
    $scope.steps = [{
        icon: 'fa fa-play icon',
        title: 'start',
        isActive: 'active',
        isComplete: false,
        key: order[0]
      }, {
        icon: 'fa fa-question icon',
        title: 'basic',
        isActive: 'disabled',
        isComplete: false,
        key: order[1]
      }, {
        icon: 'dollar icon',
        title: 'net worth',
        isActive: 'disabled',
        isComplete: false,
        key: order[2]
      }, {
        icon: 'fa fa-university icon',
        title: 'taxes',
        isActive: 'disabled',
        isComplete: false,
        key: order[3]
      },
      {
        icon: 'bar chart icon',
        title: 'budget',
        isActive: 'disabled',
        isComplete: false,
        key: order[4]
      }, {
        icon: 'fa fa-exclamation-triangle icon',
        title: 'risk',
        isActive: 'disabled',
        isComplete: false,
        key: order[5]
      }, {
        icon: 'smile icon',
        title: 'retire',
        isActive: 'disabled',
        isComplete: false,
        key: order[6]
      }
    ];

    $scope.navToStep = function(step, fromState) {
      angular.forEach($scope.steps, function(item) {
        if (fromState && fromState.name === item.key) {
          item.isComplete = true;
        }
        if (item.title === step.title || item.key === step.name) {
          item.isActive = 'active';
        } else if (item.isComplete) {
          item.isActive = '';
        } else {
          item.isActive = 'disabled';
        }
      });
    };

    // Sets the title, progress bar, and the 'previous' and 'next' links.
    var updateRelationals = function(focus) {
      $scope.heading = focus.data.title;
      var index = order.indexOf(focus.name);
      // ui-router does not currently support dynamic sref: https://github.com/angular-ui/ui-router/issues/1208
      $scope.previous = order[index - 1] ? order[index - 1] : false;
      $scope.next = order[index + 1] ? order[index + 1] : false;
      // Set all previous steps to complete
      angular.forEach($scope.steps, function(item, i) {
        if (i < index) {
          item.isComplete = true;
        }
      });
      $scope.navToStep(focus);
    };
    updateRelationals($state.current);

    // Update page heading and navbar on state change within plan-builder.
    // From docs: https://github.com/angular-ui/ui-router/wiki#wiki-state-change-events
    $scope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams) {
        if (order.indexOf(toState.name) >= 0) {
          updateRelationals(toState);
          $scope.navToStep(toState, fromState);
          nextStep();
        }
      }
    );

    $scope.nextQuestion = function(){
      var sectionComplete = true;

      var len = $('.content.active').length;
      // Make sure all required inputs are filled in before moving to next question
      var inputs = $('.content.active').find('input, select, button');
      inputs.each(function(index){
        if($(this).attr('ng-required') && !$(this).val()){
          $(this).parent().addClass('ui error');
          sectionComplete = false;
        }
      });
      // If all inputs complete, open next question or step
      if(sectionComplete || len === 0){
        //Remove all error classes
        $('.content.active').find('.error').each(function(index){
          $(this).removeClass('error');
        });
        var lastQuestion = $('.green.checkmark.icon').length-1;
        // If all questions complete, move to next step
        var title = null;
        if($scope.selectedSection === lastQuestion || len === 0){
          title = $('.title.active').attr('data-title');
          if(!$scope.sections.complete[title]){
            $scope.sections.complete[title] = true;
            $scope.pctComplete += 20;
          }
          $scope.selectedSection = 0;
          $state.go($scope.next);
        } else { // move to next section
          title = $('.title.active').attr('data-title');
          $scope.sections.complete[title] = true;
          $scope.selectedSection++;
          title = $($('.ui.accordion')
              .find('.title')[$scope.selectedSection]).attr('data-title');
          $scope.sections.enabled[title] = true;
          $('.ui.accordion').accordion('open', $scope.selectedSection);
        }
      }
    };

    // Prompt user to signup and save
    $scope.showModal = function() {
      $('.ui.modal').modal('show');
    };

    $scope.savePlan = function() {
      Auth.savePlan($scope.plan);
    };
  });
