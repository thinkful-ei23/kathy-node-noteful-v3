const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../server');
const { TEST_MONGODB_URI } = require('../config');
const model = require('../models/notes');
const seed = require('../db/seed/notes');

const expect = chai.expect;
chai.use(chaiHttp);

describe(
	before(function () {
		return mongoose.connect(TEST_MONGODB_URI)
			.then(() => mongoose.connection.db.dropDatabase());
	});

beforeEach(function () {
	return Note.insertMany(seedNotes);
});

afterEach(function () {
	return mongoose.connection.db.dropDatabase();
});

after(function () {
	return mongoose.disconnect();
});








)