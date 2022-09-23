'use strict';

const express = require('express');
const router = express.Router();
const { Books } = require('../models');

router.get('/books', async (req, res) => {
  const books = await Books.findAll();
  res.status(200).json(books);
});

router.get('/books/:id', async (req, res) => {
  const book = await Books.findByPk(req.params.id);
  res.status(200).json(book);
});

router.post('/books', async (req, res) => {
  console.log('Request Body:', req.body);

  const newBook = await Books.create(req.body);
  res.status(201).send(newBook);
});

router.put('/books/:id', async (req, res) => {
  const updated = await Books.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send(`${updated} row(s) updated successfully.`);
});

router.delete('/books/:id', async (req, res) => {
  const deleted = await Books.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send(`${deleted} row(s) deleted successfully.`);
});

module.exports = router;