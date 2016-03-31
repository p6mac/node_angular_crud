var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	Products = require('./models/products')

var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true} ));
app.use(bodyParser.json());
app.use('/public',express.static(__dirname+ '/public'));
app.use('/node_modules',express.static(__dirname+ '/node_modules'));


router.get("/products", function(req,res){
			Products.findAll().then(function(data){
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

router.post("/addproduct", function(req,res) {
			Products.create({
 			"prod_name" : req.body.prod_name,
 			"prod_cost" : req.body.prod_cost,
 			"createdAt" : new Date().getFullYear(),
 			"updatedAt" : new Date().getFullYear()
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

router.put("/updateproduct/:id", function(req,res){
		Products.update({
			"prod_name" : req.body.prod_name,
			"prod_cost" : req.body.prod_cost,
			"createdAt" : new Date().getFullYear(),
			"updatedAt" : new Date().getFullYear(),
		},{
			where : {
				id : req.params.id
			}
		}).then(function(data){
			res.json(data);
		});
	});

app.use('/api', router);

app.get("/", function(req,res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

// app.get("/addproduct", function(req,res){
// 	res.sendFile(path.join(__dirname + '/addProduct.html'));
// });

app.listen(port);
console.log('Starting....');