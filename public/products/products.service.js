(function(angular) {
	'use strict';

	var ProductsService = function($http) {
		var baseUrl = '/api';

		this.getProduct = function() {
			return $http.get(baseUrl+'/products')
				.success(function(res){
					return res;
				});
		}

		this.addProduct = function(data) {
			var fd = new FormData();
			for (var key in data) {
					fd.append(key, data[key]);
			}
			return $http.post(baseUrl+'/addproduct', fd, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined}
            });
		},

		this.showProduct = function(id){
			return $http.get(baseUrl+'/showproduct/'+id)
				.success(function(res){
					return res;
				})
		}

		this.deleteProduct = function(id){
			return $http.delete(baseUrl+'/deleteproduct/'+id)
				.success(function(res){
					return res;
				})
		}

		this.updateProduct = function(id, data){
			var fd = new FormData();
			for (var key in data) {
					fd.append(key, data[key]);
			}
			return $http.put(baseUrl+'/updateproduct/'+id, fd, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined}
            });

		}
		
		this.orderProduct = function(data){
			return $http.post(baseUrl+'/orderproduct', data)
				.success(function(res){
					return res;
				});
		}
	}

	angular.module('onlineshop.products').service('ProductsService', ProductsService);

})(window.angular);