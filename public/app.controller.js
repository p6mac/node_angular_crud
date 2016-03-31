(function(angular){

	var MainController = function($scope, MainService){
		
		MainService.getProduct().success(function(data){
			$scope.products = data;
		});

		$scope.addProduct = function(){
			MainService.addProduct($scope.data)
				.success(function(res){
					$scope.products.push($scope.data);
				});
		}

		$scope.showProduct = function(id){
			MainService.showProduct(id)
				.success(function(res){
					$scope.data = res;
				});
		}

		$scope.deleteProduct = function(id){
			MainService.deleteProduct(id)
				.success(function(res){
					$scope.products.splice(id, 1);
				});
		}

		$scope.updateProduct = function(id) {
			MainService.updateProduct(id, $scope.data)
				.success(function(res){
					console.log('success');
				});
		}
	}

	angular.module('myShoppingCart')
			.controller('mainController', MainController);
})(window.angular);