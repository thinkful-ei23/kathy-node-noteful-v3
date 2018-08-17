'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Folder = require('../models/folder');
const router = express.Router();
const Note = require('../models/note');

//==GET ALL - Sort by Name==================
router.get('/', (req, res, next) => {
	const { searchTerm } = req.query;

	let filter = {};

	if (searchTerm) {
		filter.name = { $regex: searchTerm, $options: 'i' };
	}

	Folder.find(filter)
		.sort({ name: 1 })
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			next(err);
		});
});

//==GET ONE by ID ==============================
router.get('/:id', (req, res, next) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		const err = new Error('The `id` is not valid');
		err.status = 404;
		return next(err);
	}
	Folder.findById(id)
		.then(result => {
			if (result) {
				res.json(result);
			} else {
				next();
			}
		})
		.catch(err => {
			next(err);
		});
});

//== POST a folder =======================
router.post('/', (req, res, next) => {
	const { name } = req.body;
	let newFolder = {
		name: name
	};

	if (!name) {
		const err = new Error('Missing `name` in request body');
		err.status = 400;
		return next(err);
	}

	Folder.create(newFolder)
		.then(result => {
			res.location(`${req.originalUrl}/${result.id}`)
				.status(201)
				.json(result);
		})
		.catch(err => {
			if (err.code === 11000) {
				err = new Error('Nope, try again. That folder name already exists');
				err.status = 400;
			}
			next(err);
		});
})
// ==== PUT / UPDATE a folder by ID ================
router.put('/:id', (req, res, next) => {
	const { id } = req.params;
	const { name } = req.body;
	console.log('message 1');


	/***** Never trust users - validate input *****/
	if (!name) {
		const err = new Error('Missing `name` in request body');
		err.status = 400;
		return next(err);
	}

	/***** Never trust users - validate input *****/
	if (!mongoose.Types.ObjectId.isValid(id)) {
		const err = new Error('The `id` is not valid');
		err.status = 404;
		return next(err);
	}
	const updateFolder = { "name": name };

	Folder.findByIdAndUpdate(id, updateFolder, { new: true })
		.then(result => {
			res.json(result);
		})
		.catch(err => {
			if (err.code === 11000) {
				err = new Error('Nope, try again. That folder name already exists');
				err.status = 400;
			}
			next(err);
		});
});

// == DELETE folder and related notes
router.delete('/:id', (req, res, next) => {
	const { id } = req.params;

	/***** Never trust users - validate input *****/
	if (!mongoose.Types.ObjectId.isValid(id)) {
		const err = new Error('The `id` is not valid');
		err.status = 400;
		return next(err);
	}

	// ON DELETE SET NULL equivalent
	const folderRemovePromise = Folder.findByIdAndRemove(id);
	// ON DELETE CASCADE equivalent
	//const noteRemovePromise = Note.deleteMany({ folderId: id });

	const noteRemovePromise = Note.updateMany(
		{ folderId: id },
		{ $unset: { folderId: '' } }
	);

	Promise.all([folderRemovePromise, noteRemovePromise])
		.then(() => {
			res.status(204).end();
		})
		.catch(err => {
			next(err);
		});
});

module.exports = router;