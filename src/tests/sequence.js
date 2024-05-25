const Sequencer = require("@jest/test-sequencer").default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    const copyTests = Array.from(tests);
    const connectDBTest = "src/database/__tests__/connectDB.test.ts";
    const dbFirstTests = copyTests.sort((testA, testB) => {
      if (testA.path.includes(connectDBTest)) {
        return -1;
      }
      if (testB.path.includes(connectDBTest)) {
        return 1;
      }
    });
    return dbFirstTests;
  }
}

module.exports = CustomSequencer;
