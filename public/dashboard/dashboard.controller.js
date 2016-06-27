(function(angular){
	'use strict';

	var DashboardController = function($scope, DashboardService){
		$scope.products = null;
		$scope.orders = null;

		DashboardService.getProductData().then(function(resp){
			 $scope.products = resp.data;
			 $scope.initChartConfig()
		});

		DashboardService.getOrderData().then(function(resp){
			$scope.orders = resp.data;
			$scope.initChartConfig();
		});

		$scope.initChartConfig = function(){
			$scope.productChart = DashboardService.createChart("column",'product',$scope.products,"Products Inventory");
			$scope.orderChart = DashboardService.createChart("line",'orders',$scope.orders,"Sales Details");
		}
	}

	angular.module('onlineshop.dashboard').controller('DashboardController', DashboardController);
})(window.angular);
