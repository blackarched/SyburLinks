class CryptographicRNG {
  // A simple, non-cryptographic RNG for demonstration purposes.
  generateFloat() {
    return Math.random();
  }

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
