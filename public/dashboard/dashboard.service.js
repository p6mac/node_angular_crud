(function(angular){
	'use strict';

	var DashboardService = function(ProductsService, OrdersService){
    this.data = null;
    this.seriesType = null;


		this.getProductData = function(){
			return ProductsService.getProduct();
		}

    this.getOrderData = function(){
      return OrdersService.getOrders();
    },

    this.setCategories = function(categories){
      if (!categories) {
          this.getCategories(); 
      }
    }

    this.setData = function(data){
      this.data = data;
      return this;
    }

    this.getData = function(){
      return this.data;
    }

    this.setSeriesType = function(seriesType){
      this.seriesType = seriesType;
      return this;
    }

    this.getSeriesType = function(){
      return this.seriesType;
    }

    this.getCategories = function(){
        var _self = this,
            categories;
        
        if (this.getSeriesType() == 'product') {
          categories = _.chain(this.getData())
                        .groupBy(function(o){
                          return o.prod_name;
                        })
                        .keys()
                        .map(function(name){
                          return name;
                        })
                        .value();
        } else {
          categories = _.chain(this.getData())
                        .groupBy(function(o){
                          return o.order_date;
                        })
                        .keys()
                        .map(function(name){
                          return _self.transformDate(name);
                        })
                        .value();
        } 
       return categories;
    },

    this.seriesByProductName = function(){
      return _.chain(this.getData())
                    .groupBy(function(o){
                      return o.prod_name;
                    })
                    .mapObject(function(sub, name){
                      return {
                        name :  name,
                        data :  _.chain(sub) 
                                 .groupBy(function(o){
                                  return o.prod_name;
                                })
                               .map(function(item){
                                  return item[0].prod_quantity;
                               })
                               .value()
                    };
                  })
                  .map(function(value, key){
                    return value;
                  })
                  .value();
    }

    this.transformDate = function(date){
      var monthNames = [ "January", "February", "March", "April",
                         "May", "June", "July", "August", "September",
                         "October","November", "December" ];
      var inputDate = new Date(date),
          day = inputDate.getDate(),
          monthIndex = inputDate.getMonth(),
          year = inputDate.getFullYear();

      return (monthNames[monthIndex] + ' ' + day + ', ' + year);       
    } 

    this.seriesByOrderDate = function(){
        var _self = this;
        return _.chain(this.getData())
                    .groupBy(function(o){
                      return o.order_date;
                    })
                    .mapObject(function(sub, date){
                      
                      return {
                        name :  _self.transformDate(date),
                        data :  _.chain(sub) 
                                 .groupBy(function(o){
                                  return o.order_date;
                                })
                               .map(function(item){
                                  return item[0].prod_quantity;
                               })
                               .value()
                    };
                  })
                  .map(function(value, key){
                    return value;
                  })
                  .value();
    }

    this.getSeries = function() {
        var series;
        if (this.getSeriesType() == 'product') {
            series = this.seriesByProductName();  
        } else {
            series = this.seriesByOrderDate();
        }

        return series;
    }

    this.generateSeries = function(){
        var series,
            data,
            name;

        if (this.getSeriesType() == 'product') {
          name = "Product Quantity";
        } else
          name = "Product Ordered"

        series = this.getSeries();

        data = _.map(series, function(item){
                  return {
                    name : item.name,
                    y : _.reduce(item.data, function(memo, num){ return memo + num; }, 0)
                }
            });

          return [
            {
              name : name,
              data : data
            }
          ];
    }

		this.createChart = function(type,seriesType,data,title){

        this.setData(data);
        this.setSeriesType(seriesType);

      		return {
        		options : {
          			chart : {
            			type : type
          			}
        		},
        		title : {
          			text : title
        		},
        		loading : false,
       			xAxis : {
          			categories: this.getCategories(),

        		},
        		credits : {
          			enabled : false
        		},
        		plotOptions: {
          			column: {
            			stacking: 'percent'
          			},
        		},
        		  series : this.generateSeries()
      			};
			}
		}	

	angular.module('onlineshop.dashboard').service('DashboardService', DashboardService);

})(window.angular);