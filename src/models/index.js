'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const ModelInterface = require('./modelInterface');


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
const Users = require('./users')(sequelizeDB, DataTypes);
const Books = require('./books')(sequelizeDB, DataTypes);

module.exports = { 
  sequelizeDB,
  UserInterface: new ModelInterface(Users),
  Books: new ModelInterface(Books),
};