/**
 * A simple, non-cryptographic random number generator.
 */
class CryptographicRNG {
  /**
   * Generates a random float between 0 (inclusive) and 1 (exclusive).
   * @returns {number} A random float.
   */
  generateFloat() {
    return Math.random();
  }

  /**
   * Selects an index from a weighted array.
   * @param {number[]} weights - An array of weights.
   * @returns {number} The selected index.
   */
  selectSymbol(weights) {
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    const random = this.generateFloat() * totalWeight;
    let weightSum = 0;
    for (let i = 0; i < weights.length; i++) {
      weightSum += weights[i];
      if (random < weightSum) {
        return i;
      }
    }
  }
}
