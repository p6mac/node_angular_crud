(function(angular){
  'use strict';

  var LoginController = function($scope,$state,LoginService) {
    $scope.account = {};

    this.login = function(){
      LoginService.authenticate($scope.account)
            .then(function(data){
              $state.go('main.dashboard');
      })
    }
  }

  angular.module('onlineshop.login').controller('LoginController', LoginController);
})(window.angular);
