'use strict';

const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema({
	title: { type: String, required: true },
	content: String
});

noteSchema.set('timestamps', true);

noteSchema.methods.serialize = function () {

	return {
		_id: this._id,
		title: 'title',
		content: 'content'
	};
};












module.exports = mongoose.model('Note', noteSchema);