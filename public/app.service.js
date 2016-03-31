(function(angular) {
	'use strict';

	var MainService = function($http) {
		var baseUrl = '/api';

		this.getProduct = function() {
			return $http.get(baseUrl+'/products')
				.success(function(res){
					return res;
				});
		}

		this.addProduct = function(data) {
			return $http.post(baseUrl+'/addproduct', data)
				.success(function(res){
					return res;
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
			return $http.put(baseUrl+'/updateproduct/'+id, data)
				.success(function(res){
					return res;
				});
		}
	}

	angular.module('myShoppingCart').service('MainService', MainService);

})(window.angular);