#!/usr/bin/env node

/**
 * Simple test script to verify backend endpoints
 */

const http = require('http');

const testEndpoint = (path, expectedStatus = 200) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          if (res.statusCode === expectedStatus) {
            console.log(`✅ ${path} - Status: ${res.statusCode}`);
            resolve({ path, status: res.statusCode, data: jsonData });
          } else {
            console.log(`❌ ${path} - Expected: ${expectedStatus}, Got: ${res.statusCode}`);
            reject({ path, status: res.statusCode, data: jsonData });
          }
        } catch (error) {
          console.log(`❌ ${path} - JSON Parse Error: ${error.message}`);
          reject({ path, error: error.message });
        }
      });
    });

    req.on('error', (error) => {
      console.log(`❌ ${path} - Request Error: ${error.message}`);
      reject({ path, error: error.message });
    });

    req.setTimeout(5000, () => {
      console.log(`❌ ${path} - Timeout`);
      req.destroy();
      reject({ path, error: 'Timeout' });
    });

    req.end();
  });
};

const runTests = async () => {
  console.log('🧪 Testing backend endpoints...\n');

  try {
    // Test health endpoint
    await testEndpoint('/health');
    
    // Test API base endpoint
    await testEndpoint('/api');
    
    // Test 404 endpoint
    await testEndpoint('/nonexistent', 404);

    console.log('\n🎉 All tests passed!');
  } catch (error) {
    console.log('\n💥 Some tests failed:', error);
    process.exit(1);
  }
};

// Run tests if server is running
console.log('Waiting 2 seconds for server to be ready...');
setTimeout(runTests, 2000);