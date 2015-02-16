'use strict';

angular.module('rockridge')
.factory('Auth', function($location, $rootScope, $http, User, $cookieStore, $q) {
  var currentUser = {};
    if($cookieStore.get('token')) {
      currentUser = User.get();
    }

    return {
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },
      createUser: function(user, callback) {
        var cb = callback || angular.noop;
        return User.save(user,
          function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },
      getCurrentUser: function() {
        return currentUser;
      },

      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
});
