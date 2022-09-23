'use strict';

const express = require('express');
const router = express.Router();
const { Users } = require('../models');

router.get('/users', async (req, res) => {
  const users = await Users.findAll();
  res.status(200).json(users);
});

router.get('/users/:id', async (req, res) => {
  const users = await Users.findByPk(req.params.id);
  res.status(200).json(users);
});

router.post('/users', async (req, res) => {
  console.log('Request Body:', req.body);

  const newUser = await Users.create(req.body);
  res.status(201).send(newUser);
});

router.put('/users/:id', async (req, res) => {
  const updated = await Users.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send(`${updated} row(s) updated successfully.`);
});

router.delete('/users/:id', async (req, res) => {
  const deleted = await Users.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send(`${deleted} row(s) deleted successfully.`);
});

module.exports = router;