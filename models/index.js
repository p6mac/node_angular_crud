var Sequelize = require('sequelize');
var config = require('config');

var sequelize = new Sequelize(
		config.get('dbconfig.database'),
		config.get('dbconfig.user'),
		config.get('dbconfig.password'),{
				"host" : 'localhost',
				"dialect" : 'mysql' });

module.exports = sequelize;