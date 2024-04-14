/*const request = require('supertest');
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
*/

const puppeteer = require('puppeteer');
 
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
 
  try {
    // Navigate to the URL of your Node.js application
    await page.goto('http://34.201.68.90:3000/');
 
    const pageContent = await page.content();
    if (pageContent.includes('DevOps')) {
      console.log('Test passed: Expected text is present on the page.');
    } else {
      console.error('Test failed: Expected text is not present on the page.');
    }
   
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
})();
