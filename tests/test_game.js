function runTests() {
  console.log('Running tests...');

  // Test PaylineEngine
  const symbols = [
    [new SlotSymbol('A', 'Apple', 2, 0.4), new SlotSymbol('A', 'Apple', 2, 0.4), new SlotSymbol('A', 'Apple', 2, 0.4)],
    [new SlotSymbol('B', 'Banana', 3, 0.3), new SlotSymbol('B', 'Banana', 3, 0.3), new SlotSymbol('C', 'Cherry', 5, 0.2)],
    [new SlotSymbol('D', 'Diamond', 10, 0.1), new SlotSymbol('C', 'Cherry', 5, 0.2), new SlotSymbol('D', 'Diamond', 10, 0.1)],
  ];

  const paylines = [
    [[0, 0], [0, 1], [0, 2]], // Top row (win)
    [[1, 0], [1, 1], [1, 2]], // Middle row (no win)
    [[0, 0], [1, 1], [2, 2]], // Diagonal (no win)
  ];

  const paylineEngine = new PaylineEngine(symbols, paylines);

  // Test getConsecutiveCount
  console.assert(paylineEngine.getConsecutiveCount(symbols[0]) === 3, 'Test getConsecutiveCount: Win');
  console.assert(paylineEngine.getConsecutiveCount(symbols[1]) === 2, 'Test getConsecutiveCount: No Win');

  // Test calculateWinnings
  const winnings = paylineEngine.calculateWinnings(1);
  console.assert(winnings.length === 1, 'Test calculateWinnings: One winning line');
  console.assert(winnings[0].payout === 6, 'Test calculateWinnings: Correct payout');

  console.log('Tests finished.');
}

// Need to load the game files to run the tests
// This will be done in the test runner HTML file.
