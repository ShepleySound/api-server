'use strict';

const supertest = require('supertest');
const { app } = require('../server');
const request = supertest(app);

xdescribe('API Server', () => {

  test('404 on invalid route', async () => {
    const response = await request.get('/definitelydoesnotexist');
    expect(response.status).toEqual(404);
  });
  test('404 on invalid route', async () => {
    const response = await request.get('/also/does/not/exist');
    expect(response.status).toEqual(404);
  });
  test('500 if name not specified in /person query', async () => {
    const response = await request.get('/person');
    expect(response.status).toEqual(500);
  });
  test('Handle root route', async () => {
    const response = await request.get('/');
    expect(response.status).toEqual(200);
  });
  test('Handle valid person request', async () => {
    const response = await request.get('/people');
    expect(response.status).toEqual(200);
  });
  // test('405 on invalid method', async () => {
  //   const response = await request.post('/readonly')
  //   expect(response.status).toEqual(405)
  // })
});