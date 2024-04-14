const request = require('supertest');
const server = require('./index');

describe('Test the root path', () => {
  test('It should respond to GET method', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
  });
});

afterAll(done => {
  if (server && typeof server.close === 'function') {
    server.close(done);
  } else {
    console.warn('Unable to close server: No close() method found.');
    done();
  }
});
