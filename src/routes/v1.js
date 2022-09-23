'use strict';

const express = require('express');
const router = express.Router({mergeParams: true});
const validator = require('../middleware/validator.js');
let modelInterface;
// let baseRoute;

router.use((req, res, next) => {
  const baseRoute = req.params.route;
  if (baseRoute === 'users') {
    modelInterface = require('../models').UserInterface;
  } else if (baseRoute === 'books') {
    modelInterface = require('../models').BookInterface;
  } else next('Route not found');
  next();
});

router.get('/', async (req, res) => {
  const users = await modelInterface.read();
  res.status(200).json(users);
});

router.get(`/:id`, async (req, res) => {
  const users = await modelInterface.read(req.params.id);
  res.status(200).json(users);
});

router.post(`/`, validator, async (req, res) => {
  const newUser = await modelInterface.create(req.body);
  res.status(201).send(newUser);
});

router.put(`/:id`, async (req, res) => {
  const updated = await modelInterface.update(req.params.id, req.body);
  res.status(200).send(updated);
});

router.delete(`/:id`, async (req, res) => {
  const deleted = await modelInterface.delete(req.params.id);
  res.status(200).send(deleted);
});

module.exports = router;