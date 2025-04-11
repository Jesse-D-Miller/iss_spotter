const { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);

  fetchCoordsByIp(ip, (error, data) => {

    if (error) {
      console.log("It didn't work", error);
      return;
    }
    
    console.log(`It worked! Here are your coordinates:\nLatitude: ${data.latitude}\nLongitude: ${data.longitude}`);

    fetchISSFlyOverTimes(data, (error, responseObject) => {

      if (error) {
        console.log("It didn't work", error);
        return;
      }
      console.log(`It Worked! Here is the flyover data:\n ${responseObject}`);

      console.log("\n");
      responseObject.forEach(nextPassTime => {
        console.log(nextISSTimesForMyLocation(nextPassTime));
      });
      console.log("\n");
      return;
    });
  });
});

