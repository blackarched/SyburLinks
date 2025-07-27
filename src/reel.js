/**
 * Simulates the physics of a single slot machine reel.
 */
class ReelPhysics {
  /**
   * @param {HTMLElement} reelElement - The DOM element representing the reel.
   */
  constructor(reelElement) {
    this.reelElement = reelElement;
    this.symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    this.animationFrameId = null;
  }

  /**
   * Spins the reel for a given duration and lands on a final symbol.
   * @param {number} duration - The duration of the spin in milliseconds.
   * @param {number} finalSymbolIndex - The index of the final symbol to land on.
   */
  spin(duration, finalSymbolIndex) {
    const startTime = Date.now();
    let lastSymbolChange = 0;

    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime >= duration) {
        this.reelElement.textContent = this.symbols[finalSymbolIndex];
        cancelAnimationFrame(this.animationFrameId);
        return;
      }

      if (Date.now() - lastSymbolChange > 100) {
        const randomIndex = Math.floor(Math.random() * this.symbols.length);
        this.reelElement.textContent = this.symbols[randomIndex];
        lastSymbolChange = Date.now();
      }

      this.animationFrameId = requestAnimationFrame(animate);
    }

    animate();
  }
}
