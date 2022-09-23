'use strict';

module.exports = (sequelizeDB, DataTypes) => {
  return sequelizeDB.define('users', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};