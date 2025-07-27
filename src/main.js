document.addEventListener('DOMContentLoaded', () => {
  const reel1Element = document.getElementById('reel1');
  const reel2Element = document.getElementById('reel2');
  const reel3Element = document.getElementById('reel3');
  const spinButton = document.getElementById('spin-button');
  const resultsElement = document.getElementById('results');
  const creditsElement = document.getElementById('credits');
  const betAmountElement = document.getElementById('bet-amount');

  if (!reel1Element || !reel2Element || !reel3Element || !spinButton || !resultsElement || !creditsElement || !betAmountElement) {
    console.error('One or more DOM elements are missing.');
    return;
  }

  let credits = 100;

  const symbols = [
    new SlotSymbol('A', 'Apple', 2, 0.4),
    new SlotSymbol('B', 'Banana', 3, 0.3),
    new SlotSymbol('C', 'Cherry', 5, 0.2),
    new SlotSymbol('D', 'Diamond', 10, 0.1),
  ];

  const paylines = [
    [[0, 0], [0, 1], [0, 2]], // Top row
    [[1, 0], [1, 1], [1, 2]], // Middle row
    [[2, 0], [2, 1], [2, 2]], // Bottom row
    [[0, 0], [1, 1], [2, 2]], // Diagonal
    [[2, 0], [1, 1], [0, 2]], // Reverse diagonal
  ];

  const rng = new CryptographicRNG();
  const reel1 = new ReelPhysics(reel1Element);
  const reel2 = new ReelPhysics(reel2Element);
  const reel3 = new ReelPhysics(reel3Element);
  const audioManager = new AudioManager(
    'https://cdnjs.cloudflare.com/ajax/libs/ion-sound/3.0.7/sounds/button_click.mp3',
    'https://cdnjs.cloudflare.com/ajax/libs/ion-sound/3.0.7/sounds/bell_ring.mp3'
  );

  const spin = () => {
    const betAmount = parseInt(betAmountElement.value);
    if (credits < betAmount) {
      resultsElement.textContent = 'Not enough credits!';
      return;
    }

    credits -= betAmount;
    creditsElement.textContent = credits;
    resultsElement.textContent = '';
    audioManager.playSpinSound();

    const reel1FinalIndex = rng.selectSymbol(symbols.map(s => s.rarity));
    const reel2FinalIndex = rng.selectSymbol(symbols.map(s => s.rarity));
    const reel3FinalIndex = rng.selectSymbol(symbols.map(s => s.rarity));

    reel1.spin(1000, reel1FinalIndex);
    reel2.spin(1500, reel2FinalIndex);
    reel3.spin(2000, reel3FinalIndex);

    setTimeout(() => {
      const reelSymbols = [
        [symbols[reel1FinalIndex], symbols[rng.selectSymbol(symbols.map(s => s.rarity))], symbols[rng.selectSymbol(symbols.map(s => s.rarity))]],
        [symbols[rng.selectSymbol(symbols.map(s => s.rarity))], symbols[reel2FinalIndex], symbols[rng.selectSymbol(symbols.map(s => s.rarity))]],
        [symbols[rng.selectSymbol(symbols.map(s => s.rarity))], symbols[rng.selectSymbol(symbols.map(s => s.rarity))], symbols[reel3FinalIndex]],
      ];

      const paylineEngine = new PaylineEngine(reelSymbols, paylines);
      const winnings = paylineEngine.calculateWinnings(betAmount);

      if (winnings.length > 0) {
        let totalPayout = 0;
        winnings.forEach(win => {
          totalPayout += win.payout;
        });
        credits += totalPayout;
        creditsElement.textContent = credits;
        resultsElement.textContent = `You won ${totalPayout} credits!`;
        audioManager.playWinSound();
      } else {
        resultsElement.textContent = 'No win. Spin again!';
      }
    }, 2100);
  };

  spinButton.addEventListener('click', spin);
  document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'Enter') {
      spin();
    }
  });
});
