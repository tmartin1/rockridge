'use strict';

angular.module('rockridge')
.factory('User', function($resource) {
  return $resource('api/user/:id/:controller',
  {id: '@rid'},
  {
    get: {
      method: 'GET',
      params: {id: 'me'}
    },
    savePlan: {
      method: 'POST',
      params: {
        id: 'me',
        controller: 'saveplan'
      }
    }
  });
});
