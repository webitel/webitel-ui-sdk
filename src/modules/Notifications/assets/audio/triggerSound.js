function triggerSound(soundVolume = 1.0, soundDuration = 0.2) {
  // Initialize the AudioContext if it hasn't been created yet
  let audioContext;
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  const oscillator = audioContext.createOscillator();

  oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Standard A4 note

  const gainNode = audioContext.createGain();
  gainNode.gain.value = soundVolume; // Set the ringtoneVolume based on the selected value

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();

  oscillator.stop(audioContext.currentTime + soundDuration);
}

export default triggerSound;
