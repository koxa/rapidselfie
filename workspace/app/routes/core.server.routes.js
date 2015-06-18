'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index);
	app.route('/selfie').post(core.saveSelfie);
	app.route('/selfie/:selfieId')
		.get(core.read)
		
	app.param('selfieId', core.selfieByID);
};