(function(angular){

	function MainConfig($stateProvider, $urlRouterProvider){
		$urlRouterProvider.when('/', '/login');
		$urlRouterProvider.otherwise('/');
		$stateProvider
		.state('main', {
			url : '/App',
			abstract: true,
			templateUrl : '/public/main/templates/mainTpl.html',
		})
	}

	angular.module('onlineshop',
			['ui.router',
			 'highcharts-ng',
			 'onlineshop.dashboard',
			 'onlineshop.products',
			 'onlineshop.orders',
		 	 'onlineshop.login']).config(MainConfig);
})(window.angular);
