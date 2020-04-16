const RANGE = "147981-691423";
const [MIN, MAX] = RANGE.split("-");

const hasTwoAdjacentDigits = (number) => {
  const numberString = String(number);
  const length = numberString.length;
  for (let i = 0; i < length - 1; i++) {
    if (numberString[i] === numberString[i + 1]) {
      return true;
    }
  }

  return false;
};

const neverDecrese = (number) => {
  const numberString = String(number);
  const length = numberString.length;
  for (let i = 0; i < length - 1; i++) {
    if (numberString[i + 1] < numberString[i]) {
      return false;
    }
  }

  return true;
};

let passwordCount = 0;

for (let i = parseInt(MIN, 10); i < parseInt(MAX, 10); i++) {
  if (hasTwoAdjacentDigits(i) && neverDecrese(i)) {
    passwordCount++;
  }
}

console.log("Password count: ", passwordCount);
