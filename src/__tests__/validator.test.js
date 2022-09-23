'use strict';

const validator = require('../middleware/validator');

describe('Validator Middleware', () => {
  test('Works as expected', async () => {

    const req = {
      query: {
        name: 'hello',
      },
    };
    const res = {};
    const next = jest.fn();
    validator(req, res, next);
    expect(req.query.name).toBeTruthy();
    expect(next).toHaveBeenCalled();
  });
});