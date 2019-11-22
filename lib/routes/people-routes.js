'use strict';

const express = require('express');
const router = express.Router(); // app

const People = require('../models/people.js');
let people = new People();

// GET with Promises
router.get('/', (req, res, next) => {
  people.getFromField({}).then(data => {
    res.send(data);
  });
});

// GET :id with Async/Await
// people/Sarah
router.get('/:id', async (req, res, next) => {
  try{
  let data = await people.get(req.params.id);
   res.send(data);
  } catch(e){
   res.send(e);
  }
});

// GET :firstName with Async/Await
router.get('/:firstName', async (req, res, next) => {
  try{
  let data = await people.getFromField(req.params);
  res.send(data);
  } catch(e){
    res.send(e);
  }
});

router.post('/', async (req, res, next) => {
  try{
  let data = await people.create(req.body);
  res.send(data);
} catch(e){
  res.send(e);
}
});

router.put('/:id', async (req, res, next) => {
  try{
  let data = await people.update(req.params.id, req.body);
  res.send(data);
  } catch(e){
  res.send(e);
}
});

router.delete('/:id', async (req, res, next) => {
  try{
  let data = await people.delete(req.body);
  res.send(data);
  } catch(e){
    res.send(e);
  }
});

module.exports = router;
