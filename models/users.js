var sequelize = require('./index');
var Sequelize = require('sequelize');


var Users = sequelize.define('users', {
	"username" : Sequelize.STRING,
  "password" : Sequelize.STRING,
	},
	{
		timestamps : false
	});

module.exports = Users;
