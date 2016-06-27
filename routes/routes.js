var express = require('express');
var router = express.Router();
var app = express();
var jwt = require('jsonwebtoken');
var Products = require('../models/products');
var Orders = require('../models/orders');
var Users = require('../models/users')
var config = require('config');

app.set('superSecret', config.token.secret);
router.get("/orders", function(req,res){
			Orders.findAll({ order: [['order_date', 'ASC']]}).then(function(data){
				res.json(data);
			});
		});

router.get("/products", function(req,res){
			Products.findAll({ limit : 200 }).then(function(data){
				res.json(data);
			});
		});

router.get("/showproduct/:id", function(req,res){
		var id = req.params.id;
		Products.find({
				where : {
					id : id
				}
			}).then(function(data){
			if(data != null) {
				res.json(data);
			} else {
				res.json("No Data Found");
			}
		});
	});

router.post("/addproduct" , function(req,res) {
			Products.create({
 			"prod_name" : req.body.prod_name,
 			"prod_cost" : req.body.prod_cost,
 			"prod_quantity" : req.body.prod_quantity,
 			"description" : req.body.description,
 			"status" : req.body.status,
 			"file_name" : req.file.filename
			}).then(function(data){
				res.json(data);
			})
		});

router.post("/orderproduct", function (req,res) {
			Orders.create({
 			"prod_name" : req.body.prod_name,
 			"product_price" : req.body.product_price,
 			"name" : req.body.name,
 			"prod_quantity" : req.body.quantity,
 			"address" : req.body.address,
 			"contact_number" : req.body.contact_number,
 			"order_date" : Date.now(),
			}).then(function(data){
				res.json(data);
			})
});

router.delete("/deleteproduct/:id", function(req,res){
		var id = req.params.id;
		Products.destroy({
			where  : {
				id : id
			}
		}).then(function(data){
			res.json("Successfully Deleted");
		});
});


router.delete("/deleteorder/:id", function(req,res){
		var id = req.params.id;
		Orders.destroy({
			where : {
				id : id
			}
		}).then(function(data){
			res.json("Successfully Deleted");
		});
});

router.put("/updateproduct/:id", function(req,res){
		Products.update({
			"prod_name" : req.body.prod_name,
 			"prod_cost" : req.body.prod_cost,
 			"prod_quantity" : req.body.prod_quantity,
 			"description" : req.body.description,
 			"status" : req.body.status,
 			"file_name" : req.file.filename
		},{
			where : {
				id : req.params.id
			}
		}).then(function(data){
			res.json(data);
		});
	});

router.get("/users", function(req,res){
		Users.findAll().then(function(data){
			res.json(data);
	})
})
router.get("/setup", function(req,res) {
		Users.create({
			"username" : "p6mac",
			"password" : "password"
		}).then(function(data){
			res.json(data);
		})
});

router.post("/authenticate", function(req,res){
		Users.find({
			where : {
				"username" : req.body.username
			}
		}).then(function(data){

				if (!data) {
					res.json({ sucess : false, message : 'Authentication Failed, User not found'})
				} else if (data) {
					if (data.password != req.body.password) {
			 			res.json({ success: false, message: 'Authentication failed. Wrong password.' });
		 		} else {

			 // if user is found and password is right
			 // create a token
			 		var token = jwt.sign(data.dataValues, app.get('superSecret'),{
						expiresIn : 60
					});
			 // return the information including token as JSON
			 		res.json({
				 			success: true,
				 			message: 'Enjoy your token!',
				 			token: token
			 			});
		 			}
				}
		});
});

// route middleware to verify a token
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});
module.exports = router;
