/**
 * Handles audio playback for the game.
 */
class AudioManager {
  /**
   * @param {string} spinSoundUrl - The URL of the spin sound.
   * @param {string} winSoundUrl - The URL of the win sound.
   */
  constructor(spinSoundUrl, winSoundUrl) {
    this.spinSound = new Audio(spinSoundUrl);
    this.winSound = new Audio(winSoundUrl);
  }

  /**
   * Plays the spin sound.
   */
  playSpinSound() {
    this.spinSound.currentTime = 0;
    this.spinSound.play();
  }

  /**
   * Plays the win sound.
   */
  playWinSound() {
    this.winSound.currentTime = 0;
    this.winSound.play();
  }
}
