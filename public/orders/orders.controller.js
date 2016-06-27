(function(angular){
	'use strict';

	var	OrdersController = function($scope, OrdersService,$timeout) {
		var computePayment = function(price, quantity) {
			return price * quantity;
		}
		$scope.orders = [];
		$scope.successDeleteOrder = false;

		OrdersService.getOrders().success(function(res){
			$scope.orders = res;
			for (var i = 0; i < $scope.orders.length; i++) {
				$scope.orders[i].payment = computePayment($scope.orders[i].product_price, $scope.orders[i].prod_quantity);
			}
		});

		$scope.deleteOrder = function(id){
		 	OrdersService.deleteOrder(id)
				.success(function(res){
					$scope.orders.splice(id, 1);
					$scope.successDeleteOrder = true;
					$timeout(function() {
						$scope.successDeleteOrder = false;
					}, 1000);
				});
		}
	}

	angular.module('onlineshop.orders').controller('OrdersController', OrdersController);
})(window.angular);