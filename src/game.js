/**
 * Represents a single symbol on the slot machine reels.
 */
class SlotSymbol {
  /**
   * @param {string} id - The unique identifier for the symbol.
   * @param {string} name - The name of the symbol.
   * @param {number} value - The base value of the symbol.
   * @param {number} rarity - The rarity of the symbol (0 to 1).
   */
  constructor(id, name, value, rarity) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.rarity = rarity;
  }
}

/**
 * Calculates winnings based on symbol combinations on paylines.
 */
class PaylineEngine {
  /**
   * @param {SlotSymbol[][]} symbols - A 2D array of symbols representing the reels.
   * @param {number[][][]} paylines - An array of paylines, where each payline is an array of positions.
   */
  constructor(symbols, paylines) {
    this.symbols = symbols;
    this.paylines = paylines;
  }

  /**
   * Counts the number of consecutive identical symbols from the start of a line.
   * @param {SlotSymbol[]} lineSymbols - An array of symbols on a single payline.
   * @returns {number} The number of consecutive symbols.
   */
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

  /**
   * Calculates the total winnings for a given bet amount.
   * @param {number} betAmount - The amount of the bet.
   * @returns {object[]} An array of winning line objects.
   */
  calculateWinnings(betAmount) {
    const winningLines = [];
    for (const payline of this.paylines) {
      const lineSymbols = payline.map(pos => {
        if (this.symbols[pos[0]] && this.symbols[pos[0]][pos[1]]) {
          return this.symbols[pos[0]][pos[1]];
        }
        return null;
      }).filter(Boolean);

      if (lineSymbols.length < 3) {
        continue;
      }

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
