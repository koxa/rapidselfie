'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var SelfieSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	caption: {
		type: String,
		default: '',
		trim: true,
		//required: 'Title cannot be blank'
	},
	dataUri: {
		type: String,
		required: true
	}
	// user: {
	// 	type: Schema.ObjectId,
	// 	ref: 'User'
	// }
});

mongoose.model('Selfie', SelfieSchema);