var sequelize = require('./index');
var Sequelize = require('sequelize');


var Orders = sequelize.define('orders', {
	"prod_name" : Sequelize.STRING,
	"name" : Sequelize.STRING,
	"prod_quantity" : Sequelize.INTEGER,
	"contact_number" : Sequelize.STRING,
	"address" : Sequelize.STRING,
	"order_date" : Sequelize.DATE,
	"product_price" : Sequelize.INTEGER
	},
	{
		timestamps : false
	});


module.exports = Orders;