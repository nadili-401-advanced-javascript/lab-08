'use strict';

const Model = require('./model.js');
const schema = require('./people-schema.js');

class People extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = People;
