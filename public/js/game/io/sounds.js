export const SoundsModule = (() => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();


  function makeStatic(length) {
    // Create an empty three-second stereo buffer at the sample rate of the AudioContext
    var myArrayBuffer = audioCtx.createBuffer(2, audioCtx.sampleRate * 0.4, audioCtx.sampleRate);

    const base_d = 25;
    const d = 0;
    let level = 0;

    // Fill the buffer with white noise;
    // just random values between -1.0 and 1.0
    for (var channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
      let count = 14;

      // This gives us the actual ArrayBuffer that contains the data
      var nowBuffering = myArrayBuffer.getChannelData(channel);
      for (var i = 0; i < myArrayBuffer.length; i++) {
        // Math.random() is in [0; 1.0]
        // audio needs to be in [-1.0; 1.0]

        if (i % count === 0) {
          level = Math.random() * 2 - 1;
        }

        if (i > myArrayBuffer.length / 7 * 4) {
          count = 10;
        }
        nowBuffering[i] = level + Math.random() / 10;
      }
    }

    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer
    var source = audioCtx.createBufferSource();
    // set the buffer in the AudioBufferSourceNode
    source.buffer = myArrayBuffer;
    // connect the AudioBufferSourceNode to the
    // destination so we can hear the sound
    source.connect(audioCtx.destination);
    // start the source playing
    source.start();
  }

  return {
    makeStatic
  };
})();
