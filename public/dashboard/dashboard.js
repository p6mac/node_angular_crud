(function(angular){
	'use strict';

	function DashboardConfig($stateProvider,$urlRouterProvider){

		$stateProvider
		.state('main.dashboard', {
			url : '/Dashboard',
			views : {
				'main' : {
					templateUrl : '/public/dashboard/templates/dashboardTpl.html',
					controller : 'DashboardController',
					controllerAs : 'dashboardController'
				}
			}
		})
	}

	angular.module('onlineshop.dashboard', []).config(DashboardConfig);

})(window.angular);
