
const printPassTimes = (passtimeObject) => {
  console.log("\n");

  passtimeObject.forEach(nextPassTime => {

    const datetime = new Date(nextPassTime.risetime * 1000);
    const duration = nextPassTime.duration;
    
    console.log(`Next pass at ${datetime.toString()} for ${duration} seconds!`);

  });
  console.log("\n");
  return;
};

module.exports = { printPassTimes };