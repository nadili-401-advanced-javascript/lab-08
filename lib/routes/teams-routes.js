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
  try{
  let data = await teams.getFromField(req.params);
  res.send(data);
  } catch(e){
    res.send(e);
  }
});

router.post('/', async (req, res, next) => {
  try{
  let data = await teams.create(req.body);
  res.send(data);
} catch(e){
  res.send(e);
}
});

router.put('/:id', async (req, res, next) => {
  try {
  let data = await teams.update(req.body._id, req.body);
  res.send(data);
  }catch(e){
    res.send(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
  let data = await teams.delete(req.body);
  res.send(data);
  } catch(e){
    res.send(e);
  }
});

module.exports = router;