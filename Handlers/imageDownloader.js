const fs = require("fs");
const fetch = require("node-fetch-commonjs");
const path = "../data/tempImages";
module.exports = {
  async getImage(url) {
    try {
      const imageLink = await fetch(url);
      const imageBuffer = await imageLink.arrayBuffer();
      fs.writeFile(`${path}image`, imageBuffer, () =>
        console.log(`downloaded image from: ${url}`)
      );
    } catch (error) {
      console.log(error);
    }
  },
};
