(function(angular){
	'use strict';

	var ProductsConfig = function($stateProvider , $urlRouterProvider){

		$stateProvider
		.state('main.manage_product', {
			url : '/Manage Products',
			views : {
				'main' : {
					templateUrl : '/public/products/templates/manageProductsTpl.html',
					controller : 'ProductsController',
				}
			}
		})
		.state('main.list_product', {
			url : '/List Products',
			views : {
				'main' : {
					templateUrl : '/public/products/templates/listOfProductsTpl.html',
					controller : 'ProductsController',
				}
			}
		})
		.state('main.view_product', {
			url : '/View Products?id={pid}',
			views : {
				'main' : {
					templateUrl : '/public/products/templates/viewProductTpl.html',
					controller : 'ProductsController',
				}
			}
		});
	}

	angular.module('onlineshop.products', []).config(ProductsConfig);

})(window.angular);
