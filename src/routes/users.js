'use strict';

const express = require('express');
const router = express.Router();
const { UserInterface } = require('../models');
const validator = require('../middleware/validator.js');


router.get('/users', async (req, res) => {
  const users = await UserInterface.read();
  res.status(200).json(users);
});

router.get('/users/:id', async (req, res) => {
  const users = await UserInterface.read(req.params.id);
  res.status(200).json(users);
});

router.post('/users', validator, async (req, res) => {
  const newUser = await UserInterface.create(req.body);
  res.status(201).send(newUser);
});

router.put('/users/:id', async (req, res) => {
  const updated = await UserInterface.update(req.params.id, req.body);
  res.status(200).send(updated);
});

router.delete('/users/:id', async (req, res) => {
  const deleted = await UserInterface.delete(req.params.id);
  res.status(200).send(deleted);
});

module.exports = router;