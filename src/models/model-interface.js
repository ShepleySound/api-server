'use strict';

class ModelInterface {

  constructor(model) {
    this.model = model;
  }

  async create(json) {
    try {
      let record = await this.model.create(json);
      return record;
    } catch (err) {
      console.error(err.message);
      return err;
    }
  }

  async read(id = null){
    try {
      let record;
      if (id) {
        record = await this.model.findByPk(id);
      } else {
        record = await this.model.findAll();
      }
      return record;
    } catch(err) {
      console.error(err.message);
      return err;
    }
  }

  async readWithRelations(query) {
    try {
      let record = await this.model.findOne(query);
      return record;
    } catch(err) {
      console.error(err.message);
      return err;
    }
  }
}

module.exports = ModelInterface;