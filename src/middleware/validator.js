'use strict';

module.exports = (req, res, next) => {
  if (req.query.name) {
    next();
  } next('This request requires a name.');
};