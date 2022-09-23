'use strict';

const express = require('express');
const router = express.Router();
const { BookInterface } = require('../models');

router.get('/books', async (req, res) => {
  const books = await BookInterface.read();
  res.status(200).json(books);
});

router.get('/books/:id', async (req, res) => {
  const book = await BookInterface.read(req.params.id);
  res.status(200).json(book);
});

router.post('/books', async (req, res) => {
  const newBook = await BookInterface.create(req.body);
  res.status(201).send(newBook);
});

router.put('/books/:id', async (req, res) => {
  const updated = await BookInterface.update(req.params.id, req.body);
  res.status(200).send(updated);
});

router.delete('/books/:id', async (req, res) => {
  const deleted = await BookInterface.delete(req.params.id);
  res.status(200).send(deleted);
});

module.exports = router;