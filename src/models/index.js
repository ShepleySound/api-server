'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const ModelInterface = require('./model-interface');


const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory'
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
const User = require('./users-model')(sequelizeDB, DataTypes);
const Book = require('./books-model')(sequelizeDB, DataTypes);

User.belongsToMany(Book, { through: 'BookUsers' });
Book.belongsToMany(User, { through: 'BookUsers' });

module.exports = { 
  sequelizeDB,
  UserInterface: new ModelInterface(User),
  BookInterface: new ModelInterface(Book),
};