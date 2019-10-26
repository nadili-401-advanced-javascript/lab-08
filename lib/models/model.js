'use strict';

const mongoose = require('mongoose');

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  get(_id) {
    if (mongoose.Types.ObjectId.isValid(_id))
      return this.schema.findOne({ _id });
    else return null;
  }

  getFromField(query) {
    if (query) return this.schema.find(query);
    else return this.schema.find({});
  }


  async create(record) {
    if (sanitize (record)){
        let res = await fetch(this.url, {
          method: 'POST',
          body: JSON.stringify(record),
          headers: { 'Content-Type': 'application/json' }
        });

        if (res.ok) {
          let json = await res.json();
          console.log('Data:', json);
        } else console.log(res.statusText);
      }else { 
        console.log('wrong format!');
      } 
  }

  
   async update (id, record) {
    let path = this.url + '/' + id;
    if (sanitize (record)) {
      let res = await fetch(path, {
        method: 'PUT',
        body: JSON.stringify(record),
        headers: { 'Content-Type': 'application/json' },
      });

      if(res.ok) {
        let json = await res.json();
        return json;
      } else {
        console.log(res.statusText);
      }
    }
  }

  async delete (id) {
    let path = this.url + '/' + id;
    let res = await fetch(path, {
      method: 'DELETE',
    });

    if(res.ok) {
      console.log(`Deleted!`);
    } else {
      console.log(res.statusText);
    }
  }

    async count () {
      let path = this.url;
  
      let res = await fetch(path, { method: 'GET'});
      let json = await res.json();
      if(res.ok) {
        return json.length;
      }
    }
    sanitize (record) {
      return validate(record, this.schema);
    } 
}

module.exports = Model;
