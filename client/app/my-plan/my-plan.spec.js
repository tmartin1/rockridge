'use strict';

describe('Controller: MyPlanCtrl', function () {

  // load the controller's module
  beforeEach(module('rockridge'));

  var MyPlanCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    MyPlanCtrl = $controller('MyPlanCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
