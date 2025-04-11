const { promiseNextISSTimesForMyLocation } = require('./iss_promised');
const { printPassTimes } = require('./printPasstimes');

promiseNextISSTimesForMyLocation()
  .then((passtimes) => {
    printPassTimes(passtimes);
  });
