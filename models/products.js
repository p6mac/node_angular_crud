var sequelize = require('./index');
var Sequelize = require('sequelize');


var Products = sequelize.define('products', {
	"prod_name" : Sequelize.STRING,
	"prod_cost" : Sequelize.INTEGER,
	},
	{
		timestamps : false
	});


module.exports = Products;