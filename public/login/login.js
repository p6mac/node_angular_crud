(function(angular){

	function LoginConfig($stateProvider, $urlRouterProvider){

		$stateProvider
		.state('login', {
			url : '/login',
			templateUrl : '/public/login/templates/loginTpl.html',
			controller : 'LoginController',
			controllerAs : 'loginCtrl'
		})
	}

	angular.module('onlineshop.login',[]).config(LoginConfig);
})(window.angular);
