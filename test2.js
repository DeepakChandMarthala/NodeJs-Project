const axios = require('axios');
const assert = require('assert');

// Define the URL of your deployed Node.js application
const url = 'http://100.25.196.208:3000';

// Function to perform a simple text presence check
async function testTextPresence() {
    try {
        const response = await axios.get(url);
        const responseBody = response.data;

        // Assert that the response body contains the expected text
        assert(responseBody.includes('Welcome to Our DevOps Project'), 'Expected text not found');

        console.log('Text presence test passed!');
    } catch (error) {
        console.error('Text presence test failed:', error.message);
    }
}

// Execute the test function
testTextPresence();










