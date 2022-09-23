'use strict';

module.exports = (req, res, next) => {
  if (req.params.route !== 'users' || req.body.name) {
    next();
  } else next('This request requires a name.');
};