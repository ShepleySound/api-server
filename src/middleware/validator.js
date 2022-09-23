'use strict';

module.exports = (req, res, next) => {
  if (req.body.name) {
    next();
  } else next('This request requires a name.');
};