const fs = require("fs");
module.exports = {
  async deleteImage(path) {
    try {
      fs.unlinkSync(path);
    } catch (error) {
      console.log(error);
    }
  },
};
