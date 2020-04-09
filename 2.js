const originalData = require("./2-data");
const DESIRED_OUTPUT = 19690720;

const runOperation = ({ data, cursor }) => {
  const operation = data[cursor];
  const inputA = data[cursor + 1];
  const inputB = data[cursor + 2];
  const output = data[cursor + 3];
  let shouldBreak = false;

  switch (operation) {
    case 1:
      data[output] = data[inputA] + data[inputB];
      break;
    case 2:
      data[output] = data[inputA] * data[inputB];
      break;
    case 99:
      shouldBreak = true;
      break;
    default:
      break;
  }

  if (shouldBreak) {
    return;
  }

  runOperation({ data, cursor: cursor + 4 });
};

const runCode = (data, noun, verb) => {
  let cursor = 0;
  runOperation({ data, cursor });
  if (data[0] === DESIRED_OUTPUT) {
    console.log("RESULT:", data[0]);
    console.log("NOUN:", noun);
    console.log("VERB:", verb);
    console.log("ANSWER: ", 100 * noun + verb);
  }
};

let i;
let j;
let noun;
let verb;
let newData;

for (i = 0; i < 100; i++) {
  noun = i;
  for (j = 0; j < 100; j++) {
    verb = j;
    newData = [...originalData];
    newData[1] = noun;
    newData[2] = verb;
    runCode(newData, noun, verb);
  }
}
