'use strict';

const express = require('express');

const router = express.Router();

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {

  mongoose.connect(MONGODB_URI)

  return Note.find()

    .then(results => {
      return (results);

      console.log('Get All Notes');
      res.json([
        { id: 1, title: 'Temp 1' },
        { id: 2, title: 'Temp 2' },
        { id: 3, title: 'Temp 3' }
      ]);
    })
    .then(() => {
      return mongoose.disconnect();
    })
    .catch(err => {
      next(err);
    });
});

/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/:id', (req, res, next) => {
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
      return (results);
    })
    .then(() => {
      return mongoose.disconnect();
    })
    .catch(err => {
      next(err);
    });

  console.log('Get a Note');
  res.json({ id: 1, title: 'Temp 1' });

});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {

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


  console.log('Create a Note');
  res.location('path/to/new/document').status(201).json({ id: 2, title: 'Temp 2' });

});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:id', (req, res, next) => {

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
  console.log('Update a Note');
  res.json({ id: 1, title: 'Updated Temp 1' });

});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', (req, res, next) => {

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

  console.log('Delete a Note');
  res.status(204).end();
});

module.exports = router;