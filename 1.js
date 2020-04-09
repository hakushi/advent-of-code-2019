const data = require("./data");

const dataArray = data.split(/\n/g);

const fuelNeeded = (mass) => {
  const fuel = Math.floor(mass / 3) - 2;
  if (fuel < 0) {
    return 0;
  }

  return fuel;
};

const fuelNeededV2 = (mass) => {
  const fuel = Math.floor(mass / 3) - 2;
  if (fuel < 0) {
    return 0;
  }
  return fuel + fuelNeededV2(fuel);
};

const calculateTotalFuel = () => {
  let totalFuelNeeded = 0;
  dataArray.forEach((mass) => (totalFuelNeeded += fuelNeeded(mass)));
  return totalFuelNeeded;
};

const calculateTotalFuelV2 = () => {
  let totalFuelNeeded = 0;
  dataArray.forEach((mass) => {
    totalFuelNeeded += fuelNeededV2(mass);
  });

  return totalFuelNeeded;
};

console.log("TOTAL FUEL NEEDED: ", calculateTotalFuelV2());
