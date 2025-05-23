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

// As input it expects a latitude/longitude pair, an altitude, and how many results to return.

// As output you get the same inputs back (for checking) and a time stamp when the API ran in addition to a success or failure message and a list of passes. Each pass has a duration in seconds and a rise time as a unix time stamp.

const fetchISSFlyOverTimes = (coords, callback) => {
  needle.get(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg3 = `Status code ${response.statusCode} when fetching data for fly over times.\nResponse: "${body}"`;
      callback(Error(msg3), null);
      return;
    }

    callback(null, body.response);
    
  });
};

//function with call back
//takes in array of objects (responses)
//for each loop interation for outputs (outputs in index)
//////
const nextISSTimesForMyLocation = (nextPassTime) => {
  
  const datetime = new Date(nextPassTime.risetime * 1000);
  const duration = nextPassTime.duration;

  return `Next pass at ${datetime.toString()} for ${duration} seconds!`;

};

module.exports = { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation };