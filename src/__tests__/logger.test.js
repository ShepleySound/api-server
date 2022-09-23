'use strict';

const logger = require('../middleware/logger');

describe('Logger Middleware', () => {
  test('Works as expected', async () => {
    const consoleSpy = jest.spyOn(console, 'log');

    const req = {};
    const res = {};
    const next = jest.fn();
    logger(req, res, next);
    expect(consoleSpy).toHaveBeenCalledWith(req.method, req.path);
  });
});