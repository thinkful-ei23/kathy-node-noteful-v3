'use strict';

const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema({
	title: { type: String, required: true },
	content: String,
	folderId: { type: mongoose.Schema.Types.Objects, ref: 'Folder' }

});

noteSchema.set('timestamps', true);

noteSchema.methods.serialize = function () {

	return {
		_id: this._id,
		title: 'title',
		content: 'content'
	};
};

noteSchema.set('toObject', {
	virtuals: true,     // include built-in virtual `id`
	versionKey: false,  // remove `__v` version key
	transform: (doc, ret) => {
		delete ret._id; // delete `_id`
	}
});












module.exports = mongoose.model('Note', noteSchema);