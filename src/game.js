class SlotSymbol {
  constructor(id, name, value, rarity) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.rarity = rarity;
  }
}

class PaylineEngine {
  constructor(symbols, paylines) {
    this.symbols = symbols;
    this.paylines = paylines;
  }

  getConsecutiveCount(lineSymbols) {
    if (!lineSymbols || lineSymbols.length === 0) {
      return 0;
    }
    const firstSymbol = lineSymbols[0];
    let count = 1;
    for (let i = 1; i < lineSymbols.length; i++) {
      if (lineSymbols[i].id === firstSymbol.id) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }

  calculateWinnings(betAmount) {
    const winningLines = [];
    for (const payline of this.paylines) {
      const lineSymbols = payline.map(pos => this.symbols[pos[0]][pos[1]]);
      const consecutiveCount = this.getConsecutiveCount(lineSymbols);

      if (consecutiveCount >= 3) {
        const multiplier = lineSymbols[0].value * consecutiveCount;
        winningLines.push({
          payline,
          symbol: lineSymbols[0],
          count: consecutiveCount,
          payout: betAmount * multiplier
        });
      }
    }
    return winningLines;
  }
}
