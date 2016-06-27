var express = require('express');
var crypto = require('crypto');
var	bodyParser = require('body-parser');
var	path = require('path');
var multer = require('multer');
var jwt = require('jsonwebtoken');
var config = require('config');
var	router = require('./routes/routes');
var app = express();
var	port = process.env.PORT || 3000;
var storage = multer.diskStorage({
  				destination: function (req, file, cb) {
    				cb(null, path.normalize('public/assets/images/'));
  				},
  				filename: function (req, file, cb) {
    	crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, 'images-' + Date.now() + path.extname(file.originalname))
    })
  }
});
var upload = multer({ storage: storage });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(upload.single('file'));
app.use('/public',express.static(__dirname+ '/public'));
app.use('/node_modules',express.static(__dirname+ '/node_modules'));
app.use('/api', router);

app.get("/", function(req,res){
	res.sendFile(path.join(__dirname + '/index.html'));
});


app.listen(port);
console.log('Starting....');
console.log('Visit at localhost:'+ port);
