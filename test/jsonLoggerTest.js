const assert = require("assert");
const {
  fetchWords,
  list,
  removeWord,
  addWord,
  search,
} = require("../util/json-logger.js");
const testData = require("./logTest.json");
const pathToData = __dirname + "/logTest.json";

describe("Json Logger", function () {
  describe("#addWord()", function () {
    it("Should add a word to a json file", function () {
      const expected = {
        index: "1",
        text: "five",
      };

      addWord(pathToData, "five");
      const actual = testData.data[0];

      assert.equal(actual.index, expected.index);
      assert.equal(actual.text, expected.text);
    });
  });
});

describe("Json Logger", function () {
  describe("#removeWord()", function () {
    it("Should remove a word from a json file", function () {
      const expected = {
        index: "1",
        text: "five",
      };

      removeWord(pathToData, "1");
      const acutal = testData.data[0];
      assert.equal(acutal.index, expected.index);

      const error = removeWord(pathToData, "5");
      const expectedError = "That isnt in the list";
      assert.equal(error, expectedError);
    });
  });
});

describe("Json Logger", function () {
  describe("#fetchWords()", function () {
    it("should return a random amount of random words: should always return a non zero amount", function () {
      assert.equal(fetchWords(testData).length === 0, false);
    });
  });
});

describe("Json Logger", function () {
  describe("#list()", function () {
    it("Should list the contents of the json file referances", function () {
      const expected = "1: five \n";

      const actual = list(pathToData);
      assert.equal(actual, expected);
    });
  });
});
