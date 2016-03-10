var express = require('express');
var router = express.Router();
var _ = require('underscore');
var shop = require('../data/shopDB.js');

// note that typically data would NOT be loaded from the filesystem in this manner :)

router.get('/articles', function(req, res, next) {

	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Header", "X-Requestd-With");
	shop.find({}, null, function(error, docs){
		res.json(docs);
	});
});

router.get('/articles/:id', function(req, res, next) {
	var id = req.params.id;
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Header", "X-Requestd-With");
	shop.findById(id, function(error, doc){
		res.render('detail', {data: doc});
	});
});

module.exports = router;