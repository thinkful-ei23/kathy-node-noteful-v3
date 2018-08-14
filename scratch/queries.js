'use strict';

const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');

const Note = require('../models/note');


//  GET 1 Note by searchTerm=====================
mongoose.connect(MONGODB_URI)
	.then(() => {
		const searchTerm = 'rain';
		let contentFilter = {};
		let titleFilter = {};
		if (searchTerm) {
			titleFilter.title = { $regex: searchTerm };
			contentFilter.content = { $regex: searchTerm };
		}

		return Note.find({ $or: [titleFilter, contentFilter] }).sort({ updatedAt: 'desc' });
	})
	.then(results => {
		console.log(results);
	})
	.then(() => {
		return mongoose.disconnect();
	})
	.catch(err => {
		console.error(`ERROR: ${err.message}`);
		console.error(err);
	});
/*
//  GET 1 Note by ID=====================
mongoose.connect(MONGODB_URI)
	.then(() => {
		const id = '000000000000000000000006';
		//const id = '_id';
		return Note.findById(id);
	})
	.then(results => {
		console.log(results);
	})
	.then(() => {
		return mongoose.disconnect();
	})
	.catch(err => {
		console.error(`ERROR: ${err.message}`);
		console.error(err);
	});
//  CREATE new Note =====================

mongoose.connect(MONGODB_URI)
	.then(() => {
		const newNote = {
			title: 'New Stuff-i-ness title',
			content: 'other stuff and cats and rain'
		};

		return Note.create(newNote);
	})

	.then(results => {
		console.log(results);
	})
	.then(() => {
		return mongoose.disconnect();
	})
	.catch(err => {
		console.error(`ERROR: ${err.message}`);
		console.error(err);
	});
* /
//  GET 1 Note by ID and UPDATE=====================
/*
mongoose.connect(MONGODB_URI)
	.then(() => {
		const id = '000000000000000000000005';
		const updateItem = {
			title: 'Here Come the Sun, nah nah..',
			content: 'Rain, Rain Go Away'
		};
		return Note.findByIdAndUpdate(id, updateItem, { new: true, upsert: true });

	})

	.then(results => {
		console.log(results);
	})
	.then(() => {
		return mongoose.disconnect();
	})
	.catch(err => {
		console.error(`ERROR: ${err.message}`);
		console.error(err);
	});
	*/
/*

//  DELETE NOTE By ID=====================
mongoose.connect(MONGODB_URI)
	.then(() => {
		const id = '000000000000000000000003';
		//const id = '_id';
		return Note.findByIdAndRemove(id);
	})
	.then(results => {
		console.log(results);
	})
	.then(() => {
		return mongoose.disconnect();
	})
	.catch(err => {
		console.error(`ERROR: ${err.message}`);
		console.error(err);
	});

*/