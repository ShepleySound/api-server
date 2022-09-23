'use strict';

const express = require('express');
// Import functional middleware
const logger = require('./middleware/logger.js');
// const validator = require('./middleware/validator.js');

// Import error handling files.
const notFound = require('./middleware/error-handlers/404');
const errorHandler = require('./middleware/error-handlers/500');

// Import routes
const peopleRouter = require('./routes/people');
const booksRouter = require('./routes/books');

const app = express();

app.use(express.json());
app.use(logger);
app.use(peopleRouter);
app.use(booksRouter);

app.get('/', (req, res, next) => {
  res.status(200).send('Welcome to the server!');
});

app.use('*', notFound);

app.use(errorHandler);

module.exports = { app };