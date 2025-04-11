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

const fetchMyIP = (callback) => {
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

    callback(null, body.ip);
    
  });

};

// It should take in two arguments: ip (string) and callback
// Add the function to the object properties being exported from iss.js
// For now, it can have an empty body and do nothing

const fetchCoordsByIp = (ip, callback) => {
  needle.get(`http://ipwho.is/${ip}`, (error, response, body) => {
    
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg1 = `Status code ${response.statusCode} when fetching coordinates. Response ${body}`;
      callback(Error(msg1), null);
      return;
    }

    if (!body.success) {
      const msg2 = `Success status was false. Server message says: Invalid IP address when fetching for IP ${ip}`;
      callback(Error(msg2), null);
      return;
    }

    const coordObject = {
      latitude: body.latitude,
      longitude: body.longitude,
    };
  
    callback(null, coordObject);
    
  });
};

module.exports = { fetchMyIP, fetchCoordsByIp };