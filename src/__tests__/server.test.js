'use strict';

const supertest = require('supertest');
const { app } = require('../server');
const { sequelizeDB } = require('../models');
const request = supertest(app);

beforeAll(async () => {
  await sequelizeDB.sync();
});

afterAll(async () => {
  await sequelizeDB.drop();
});

describe('Test API Server', () => {

  test('404 on invalid route', async () => {
    const response = await request.get('/definitelydoesnotexist');
    expect(response.status).toEqual(404);
  });

  test('404 on invalid route', async () => {
    const response = await request.get('/also/does/not/exist');
    expect(response.status).toEqual(404);
  });

  test('Test root route', async () => {
    const response = await request.get('/');
    expect(response.status).toEqual(200);
  });

  test('500 if name not specified in /users POST', async () => {
    const response = await request.post('/api/v1/users').send({
      notName: 'Test User',
    });
    expect(response.status).toEqual(500);
  });
  // test('405 on invalid method', async () => {
  //   const response = await request.post('/readonly')
  //   expect(response.status).toEqual(405)
  // })
});

describe('Test /users endpoint methods', () => {
  test('Handle getting all users', async () => {
    const response = await request.get('/api/v1/users');
    expect(response.status).toEqual(200);
    expect(response.body[0]).toBeUndefined();
  });

  test('Create a user', async () => {
    let response = await request.post('/api/v1/users').send({
      name: 'Test User',
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('Test User');
  });

  test('Get a user by id', async () => {
    const response = await request.get('/api/v1/users/1');
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Test User');
  });

  test('Update a user', async () => {
    let response = await request.put('/api/v1/users/1').send({
      name: 'Updated Test User',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Updated Test User');
  });

  test('Delete a user', async () => {
    let response = await request.delete('/api/v1/users/1');
    expect(response.status).toEqual(200);
    expect(response.body.title).toBeUndefined();
  });
});

describe('Test /books endpoint methods', () => {
  test('Handle getting all books', async () => {
    const response = await request.get('/api/v1/books');
    expect(response.status).toEqual(200);
  });

  test('Create a book', async () => {
    let response = await request.post('/api/v1/books').send({
      title: 'Test Book',
      author: 'Test Author',
      pages: 100,
    });
    expect(response.status).toEqual(201);
    expect(response.body.title).toEqual('Test Book');
    expect(response.body.author).toEqual('Test Author');
    expect(response.body.pages).toEqual(100);
  });

  test('Get a book by id', async () => {
    const response = await request.get('/api/v1/books/1');
    expect(response.status).toEqual(200);
    expect(response.body.title).toEqual('Test Book');
    expect(response.body.author).toEqual('Test Author');
    expect(response.body.pages).toEqual(100);
  });

  test('Update a book', async () => {
    let response = await request.put('/api/v1/books/1').send({
      title: 'Updated Test Book',
    });
    expect(response.status).toEqual(200);
    expect(response.body.title).toEqual('Updated Test Book');
    expect(response.body.author).toEqual('Test Author');
    expect(response.body.pages).toEqual(100);
  });

  test('Delete a book', async () => {
    let response = await request.delete('/api/v1/books/1');
    expect(response.status).toEqual(200);
    expect(response.body.title).toBeUndefined();
  });
});