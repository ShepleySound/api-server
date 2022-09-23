'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const ModelInterface = require('./model-interface');


const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite:memory'
  : process.env.DATABASE_URL;

const sequelizeDB = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Require models
const Users = require('./users-model')(sequelizeDB, DataTypes);
const Books = require('./books-model')(sequelizeDB, DataTypes);

module.exports = { 
  sequelizeDB,
  UserInterface: new ModelInterface(Users),
  BookInterface: new ModelInterface(Books),
};