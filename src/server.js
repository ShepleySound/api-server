'use strict';

const express = require('express');
// Import functional middleware
const logger = require('./middleware/logger.js');

// Import error handling files.
const notFound = require('./middleware/error-handlers/404');
const errorHandler = require('./middleware/error-handlers/500');

// Import routes
// const usersRouter = require('./routes/users');
// const booksRouter = require('./routes/books');
const apiRouter = require('./routes/v1.js');

const app = express();

app.use(logger);
app.use(express.json());
// app.use(usersRouter);
// app.use(booksRouter);
app.use('/api/v1/:route', apiRouter);

app.get('/', (req, res, next) => {
  res.status(200).send('Welcome to the server!');
});

app.use('*', notFound);

app.use(errorHandler);

module.exports = { app };