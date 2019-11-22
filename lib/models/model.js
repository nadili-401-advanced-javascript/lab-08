'use strict';

const mongoose = require('mongoose');

class Model {
  constructor(schema) {
    this.schema = schema;
  }
  /**
   * verifys that id is a vallid UUID
   * If the id is valid, it finds the entry matching that id in the mongo db
   * @param {uuid} _id
   * @returns {uuid} _id
   */

  get(_id) {
    if (mongoose.Types.ObjectId.isValid(_id))
      return this.schema.findOne({ _id });
    else return null;
  }

 /**
  * queries db based on passed field: value 
   * @param {object} query
   * @returns record
   */

  getFromField(query) {
    if (query) return this.schema.find(query);
    else return this.schema.find({});
  }

 /**
   * creates a new entry in the db
   * @param {object} item
   * @returns record
   */

  async create(record) {
    let validatedItem = new this.schema(record);
    return validatedItem.save();
  }

 
 /**
   * finds an item in the db by id and updates it with the parameters passed 
   * @param {uuid} _id
   * @param {object} item
   * @returns updated record
   * 
   */
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, { ...record });
  }

  /**
   * finds an item in the db by id and deletes it
   * @param {uuid} _id
   * @function delete()
   * @returns deleted record
   */
  delete(_id) {
    if (mongoose.Types.ObjectId.isValid(_id))
      return this.schema.findByIdAndDelete(_id);
    else if (String(_id)) return this.schema.find(_id);
    else return null;
  }

  
  /**
   * search the database for items that match the object paramter
   * return the number of items that match.
   * @param {object} obj
   * @function count()
   * @returns number of objects
   */
  count(obj) {
    return this.schema.countDocuments(obj);
  }
}

module.exports = Model;
