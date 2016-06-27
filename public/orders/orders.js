(function(angular){
	'use strict';

	var OrdersConfig = function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.orders', {
			url : '/List of Orders',
			views : {
				'main' : {
					templateUrl : '/public/orders/templates/listOfOrdersTpl.html',
					controller : 'OrdersController',
				}
			}
		})
	}

	angular.module('onlineshop.orders',[])
		.config(OrdersConfig);
})(window.angular);
