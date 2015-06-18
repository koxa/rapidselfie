'use strict';

var mongoose = require('mongoose'),
	Selfie = mongoose.model('Selfie');
/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

exports.read = function(req, res) {
	res.json(req.selfie);
};

exports.selfieByID = function(req, res, next, id) {
	Selfie.findById(id).exec(function(err, selfie) {
		if (err) return next(err);
		if (!selfie) return next(new Error('Failed to load selfie ' + id));
		req.selfie = selfie;
		next();
	});
};

exports.saveSelfie = function(req, res){
	var selfie = new Selfie(req.body);
	//selfie.user = req.user;

	selfie.save(function(err) {
		if (err) {
			res.json(err);
			// return res.status(400).send({
			// 	message: errorHandler.getErrorMessage(err)
			// });
		} else {
			res.json(selfie);
		}
	});
}