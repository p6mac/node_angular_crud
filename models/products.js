var sequelize = require('./index');
var Sequelize = require('sequelize');


var Products = sequelize.define('products', {
	"prod_name" : Sequelize.STRING,
	"prod_cost" : Sequelize.INTEGER,
	"prod_quantity" : Sequelize.INTEGER,
	"description" : Sequelize.STRING,
	"status" : Sequelize.STRING,
	"file_name" : Sequelize.STRING
	},
	{
		timestamps : false
	});


module.exports = Products;