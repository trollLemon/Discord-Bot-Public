var fs = require("fs");

module.exports = {
  /**
   * get random words and a random amount of them
   * returns an array of random words based on the given json list
   */
  fetchWords(data) {
    let amount = randomNumber(data.data.length);

    if (amount === 0) amount = 1;

    let words = "";
    for (let i = 0; i < 5; i++) {
      let rng = randomNumber(amount);
      let word = data.data[rng].text;
      words += ` ${word}`;
    }

    return words;
  },

  async addWord(data, input) {
    const words = JSON.parse(fs.readFileSync(data));
    let word = {
      index: `${Object.keys(words.data).length + 1}`,
      text: `${input}`,
    };

    words.data.push(word);
    const newData = JSON.stringify(words, null, 2);

    fs.writeFile(data, newData, (err) => {
      if (err) console.log("couldn't write to file:" + err);
    });
  },
  /**
   * remove word
   */
  async removeWord(data, index) {
    const words = JSON.parse(fs.readFileSync(data));
    if (parseInt(index) > Object.keys(words.data).length) return;
    else {
      words.data.splice(+index - 1, 1); //remove only 1 object at the index
      const newData = JSON.stringify(words, null, 2);
      fs.writeFile(data, newData, (err) => {
        if (err) console.log("couldn't write to file:" + err);
      });
    }
  },

  /**
   *  list stuff given
   */
  list(data) {
    const words = JSON.parse(fs.readFileSync(data)).data;
    let output = "";
    for (let i = 0; i < words.length; i++) {
      output += `${words[i].index}: ${words[i].text} \n`;
    }
    return output;
  },
};

//rng
const randomNumber = (size) => {
  let number = Math.floor(Math.random() * size);
  return number;
};
