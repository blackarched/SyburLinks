class ReelPhysics {
  constructor(reelElement) {
    this.reelElement = reelElement;
    this.symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  }

  spin(duration, finalSymbolIndex) {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime >= duration) {
        clearInterval(interval);
        this.reelElement.textContent = this.symbols[finalSymbolIndex];
        return;
      }
      const randomIndex = Math.floor(Math.random() * this.symbols.length);
      this.reelElement.textContent = this.symbols[randomIndex];
    }, 100);
  }
}
