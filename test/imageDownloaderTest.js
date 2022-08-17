const assert = require("assert");
const { getImage } = require("../Handlers/imageDownloader.js");
const dir = "../data/tempImages";
const fs = require("fs");

describe("image downloader", function () {
  describe("#getImage()", function () {
    it("download an image from a url", async function () {
      const url =
        "https://static.wikia.nocookie.net/surrealmemes/images/9/97/SUS.webp/revision/latest/scale-to-width-down/250?cb=20210513163113";

      await getImage(url); //get an image from the link given

      //test if it got a file. If the directory is empty then it failed
      assert(isDirEmpty(dir), false);
    });
  });
});

const isDirEmpty = (dirname) => {
  return fs.promises.readdir(dirname).then((files) => {
    return files.length === 0;
  });
};
