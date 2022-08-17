

class ArrayUtil {
  target = [];
  sortTypes = [];

  constructor(array) {
    if (!Array.isArray(array)) throw new Error("Object is not an array");
    if (array.length === 0) throw new Error("Cannot operate on an empty array");

    this.target = array;
  }

  /**
   * shuffles the target array
   */
  shuffle() {
    let currentIndex = this.target.length,
      randomIndex;

    //Fisher-Yates Shuffle
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.target[currentIndex], this.target[randomIndex]] = [
        this.target[randomIndex],
        this.target[currentIndex],
      ];
    }
  }

  /**
   * @returns {Array} - the new array after all the operations are done
   */
  get target() {
    return this.target;
  }
}

//export
module.exports = { ArrayUtil };
