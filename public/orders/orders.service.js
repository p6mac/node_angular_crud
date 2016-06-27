(function(angular){
	'use strict';

	var OrdersService = function($http){
		var baseUrl = "/api";
		this.getOrders = function(){
			return $http.get(baseUrl+'/orders')
				.success(function(res){
					return res;
				});
		}

		this.deleteOrder = function(id){
			return $http.delete(baseUrl+'/deleteorder/'+id)
				.success(function(res){
					return res;
				});
			}
		}

	angular.module('onlineshop.orders').service('OrdersService', OrdersService);
})(window.angular);