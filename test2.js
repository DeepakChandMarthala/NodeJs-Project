const axios = require('axios');
const assert = require('assert');

const url = 'http://100.25.144.76:3000';

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

testTextPresence();










