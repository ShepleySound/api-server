'use strict';

const validator = require('../middleware/validator');

describe('Validator Middleware', () => {
  test('Works as expected', async () => {
    const req = {
      params: {
        route: 'users',
      },
      body: {
        name: 'hello',
      },
    };
    const res = {};
    const next = jest.fn();
    validator(req, res, next);
    expect(req.body.name).toBeTruthy();
    expect(next).toHaveBeenCalled();
  });
});