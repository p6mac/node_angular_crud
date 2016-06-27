(function(angular){

	var ProductsController = function($scope, ProductsService, $timeout, $state){
		$scope.successAdd = false;
		$scope.updateForm = false;
		$scope.addForm = false;
		$scope.orderForm = false;
		$scope.successUpdate = false;
		$scope.successDelete = false;
		$scope.successOrder = false;
		$scope.order = {};
		$scope.pid = $state.params.pid;

		ProductsService.getProduct().success(function(data){
			var handleData = data;
			$scope.products = handleData;
			for (var i = 0; i < handleData.length; i++) {
				if (handleData[i].file_name == null) {
				   handleData[i].file_name = 'no_product_image.jpg';
				}
			}
		});

		ProductsService.showProduct($scope.pid)
			.success(function(data){
			$scope.viewProduct = data;
			$scope.order.prod_name = data.prod_name;
			$scope.order.product_price = data.prod_cost;
			if (data.file_name == null) {
				data.file_name = 'no_product_image.jpg';
			}
		});

		$scope.showOrderForm = function(){
			$scope.orderForm = true;
		}
		$scope.addShowForm = function(){
			$scope.addForm = true;
		}
		$scope.showForm = function(id){
			$scope.updateForm = true;
			$scope.showProduct(id);
		}

		$scope.hideForm = function(){
			$scope.updateForm = false;
			$scope.addForm = false;
			$scope.orderForm = false;
		}

		$scope.addProduct = function(){
			ProductsService.addProduct($scope.data)
				.success(function(res){
					$scope.products.push($scope.data);
					$scope.successAdd = true;
					$timeout(function() {
						$scope.successAdd = false;
					}, 1000);
				});
		}

		$scope.showProduct = function(id){
			ProductsService.showProduct(id)
				.success(function(res){
					console.log(res);
					$scope.newdata = res;
				});
		}

		$scope.deleteProduct = function(id){
			ProductsService.deleteProduct(id)
				.success(function(res){
					$scope.products.splice(id, 1);
					$scope.successDelete = true;
					$timeout(function() {
						$scope.successDelete = false;
					}, 1000);
				});
		}

		$scope.updateProduct = function(id) {
			ProductsService.updateProduct(id, $scope.newdata)
				.success(function(res){
					$scope.successUpdate = true;
					$timeout(function() {
						$scope.successUpdate = false;
					}, 1000);
				});
		}

		$scope.orderProduct = function(){
			ProductsService.orderProduct($scope.order)
				.success(function(res){
					$scope.successOrder = true;
					$timeout(function(){
						$scope.successOrder = false;
					},1000)
				})
		}
	}

	angular.module('onlineshop.products')
			.controller('ProductsController', ProductsController);
})(window.angular);