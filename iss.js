/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

// 'https://api.ipify.org?format=json'
// {"ip":"50.92.167.196"



const needle = require('needle');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API

  needle.get(`https://api.ipify.org?format=json`, (error, response, body) => {
    
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    callback(null, body);
    
  });

};

module.exports = { fetchMyIP };