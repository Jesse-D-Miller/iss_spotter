const needle = require('needle');

const promiseFetchMyIP = () => {
  return needle('get', 'https://api.ipify.org?format=json')
    .then((response) => {
      const body = response.body;
      const ip = body.ip;
      return ip;
    });
};

const promiseFetchCoordsByIp = (ip) => {
  return needle('get', `http://ipwho.is/${ip}`)
    .then((response) => {
      const body = response.body;
      const coordObject = {
        latitude: body.latitude,
        longitude: body.longitude,
      };
      return coordObject;
    });
};

const promiseFetchISSFlyOverTimes = (coords) => {
  return needle('get', `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`)
    .then((response) => {
      const body = response.body;
      const passtimes = body.response;
      return passtimes;
    });

};

const promiseNextISSTimesForMyLocation = function() {
  return promiseFetchMyIP()
    .then((ip) => promiseFetchCoordsByIp(ip))
    .then((coords) => promiseFetchISSFlyOverTimes(coords))
    .then((passtimes) => {
      return passtimes;
    });

};


module.exports = { promiseNextISSTimesForMyLocation };