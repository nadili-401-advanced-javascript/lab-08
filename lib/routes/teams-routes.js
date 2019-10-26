'use strict';

const express = require('express');
const router = express.Router(); // app

const Teams = require('../models/teams.js');
let teams = new Teams();

// GET with Promises
router.get('/', (req, res, next) => {
  teams.getFromField({}).then(data => {
    res.send(data);
  });
});

// GET :id with Async/Await
// people/Sarah
router.get('/:id', async (req, res, next) => {
  let data = await teams.get(req.params.id);
  if (data && data._id) res.send(data);
  else next('route');
});

// GET :firstName with Async/Await
router.get('/:name', async (req, res, next) => {
  let data = await teams.getFromField(req.params);
  res.send(data);
});

module.exports = router;