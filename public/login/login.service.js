(function(angular){
    'use strict';

    var LoginService = function($http) {
      this.authenticate = function(data) {
        return $http.post('/api/authenticate', data)
          .success(function(data){
            return data;
          });
      }
    }

    angular.module('onlineshop.login').service('LoginService', LoginService)
})(window.angular);
