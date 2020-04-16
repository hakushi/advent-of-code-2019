const originalData = require("./5-data");
const INPUT = 1;

const step = (data, cursor) => {
  let opCode = data[cursor];
  let inputA, inputB, output, a, b;

  let parameterModes = "00";

  const stringOpCode = String(opCode);

  if (stringOpCode.length > 2) {
    console.log("OP CODE:", opCode);
    console.log("CURSOR:", cursor);
    opCode = parseInt(stringOpCode.substr(stringOpCode.length - 2), 10);
    console.log("OP CODE:", opCode);
    parameterModes = stringOpCode.substr(0, stringOpCode.length - 2);
    if (parameterModes.length === 1) {
      parameterModes = "0" + parameterModes;
    }
    console.log("PARAMETER MODES:", parameterModes);
  }

  inputA = data[cursor + 1];
  inputB = data[cursor + 2];

  paramA = parameterModes.substr(1);
  paramB = parameterModes.substr(0, 1);

  console.log("MODE A: ", paramA);
  console.log("MODE B: ", paramB);

  a = paramA === "1" ? inputA : data[inputA];
  b = paramB === "1" ? inputB : data[inputB];

  console.log("A: ", a, "B: ", b);

  output = data[cursor + 3];

  switch (opCode) {
    case 1:
      data[output] = a + b;
      return { shouldBreak: false, cursorIncrease: 4 };
    case 2:
      data[output] = a * b;
      return { shouldBreak: false, cursorIncrease: 4 };
    case 3:
      data[inputA] = INPUT;
      return { shouldBreak: false, cursorIncrease: 2 };
    case 4:
      if (a === 0) {
        console.log("OUTPUT: ", a, " SUCCESS!");
      }
      if (a !== 0) {
        console.log("FINAL OUTPUT: ", a);
        console.log(data);
        return { shouldBreak: true, cursorIncrease: 0 };
      }
      return { shouldBreak: false, cursorIncrease: 2 };
    case 99:
      return { shouldBreak: true, cursorIncrease: 0 };
    default: {
      return { shouldBreak: false, cursorIncrease: 2 };
    }
  }
};

const runOperation = ({ data, cursor }) => {
  const { shouldBreak, cursorIncrease } = step(data, cursor);

  if (shouldBreak) {
    return;
  }
  runOperation({ data, cursor: cursor + cursorIncrease });
};

let newData;

newData = [...originalData];
runOperation({ data: newData, cursor: 0 });
