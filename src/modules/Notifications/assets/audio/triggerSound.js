function triggerSound(soundVolume = 0.6, soundDuration = 0.2) {
  let audioContext;

  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  const gainNode = audioContext.createGain();
  const oscillator = audioContext.createOscillator();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Set frequency to A4
  gainNode.gain.value = soundVolume;

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  let isPlaying = false;
  const events = {};

  // Create a custom audio-like object
  const audio = {
    play: () => {
      isPlaying = true;
      try {
        oscillator.start();
      } catch (error) {
        console.error('Error starting oscillator:', error);
      }
      setTimeout(() => {
        oscillator.stop();
        oscillator.disconnect();
        gainNode.disconnect();
        audio.dispatchEvent(new Event('ended'));
      }, soundDuration * 1000);
    },
    pause: () => {
      if (isPlaying) {
        oscillator.stop();
        isPlaying = false;
      }
    },
    addEventListener: (type, listener) => {
      events[type] = listener;
    },
    dispatchEvent: (event) => {
      if (events[event.type]) events[event.type](event);
    },
    volume: gainNode.gain.value,
  };

  return audio;
}

export default triggerSound;
