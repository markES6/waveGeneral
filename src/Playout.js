export default class {

  constructor(ac, buffer) {
    this.ac = ac;
    this.gain = 1;
    this.buffer = buffer;
    this.destination = this.ac.destination;
    this.bol = false;
  }

  isPlaying() {
    // console.log(this.source !== undefined);
    return this.bol;
  }

  getDuration() {
    return this.buffer.duration;
  }

  setAudioContext(audioContext) {
    this.ac = audioContext;
    this.destination = this.ac.destination;
  }

  setUpSource() {
    this.source = this.ac.createBufferSource();
    this.source.buffer = this.buffer;

    const sourcePromise = new Promise((resolve) => {
      // keep track of the buffer state.
      this.source.onended = () => {
        this.source.disconnect();
        this.fadeGain.disconnect();
        this.volumeGain.disconnect();
        this.shouldPlayGain.disconnect();
        this.masterGain.disconnect();


        this.source = undefined;
        this.fadeGain = undefined;
        this.volumeGain = undefined;
        this.shouldPlayGain = undefined;
        this.masterGain = undefined;

        resolve();
      };
    });

    this.fadeGain = this.ac.createGain();
    // used for track volume slider
    this.volumeGain = this.ac.createGain();
    // used for solo/mute
    this.shouldPlayGain = this.ac.createGain();
    this.masterGain = this.ac.createGain();

    this.source.connect(this.fadeGain);
    this.fadeGain.connect(this.volumeGain);
    this.volumeGain.connect(this.shouldPlayGain);
    this.shouldPlayGain.connect(this.masterGain);
    this.masterGain.connect(this.destination);

    return sourcePromise;
  }

  setVolumeGainLevel(level) {
    if (this.volumeGain) {
      this.volumeGain.gain.value = level;
    }
  }

  setShouldPlay(bool) {
    if (this.shouldPlayGain) {
      this.shouldPlayGain.gain.value = bool ? 1 : 0;
    }
  }

  setMasterGainLevel(level) {
    if (this.masterGain) {
      this.masterGain.gain.value = level;
    }
  }

  /*
    source.start is picky when passing the end time.
    If rounding error causes a number to make the source think
    it is playing slightly more samples than it has it won't play at all.
    Unfortunately it doesn't seem to work if you just give it a start time.
  */
  play(when, start, duration, track) {
    if (track.startTime <= start && track.startTime + duration >= start) {
      this.source.start(when, start - track.startTime, duration);
      this.bol = true;
    }
  }

  stop(track, now, when = 0) {
    // const now = 10;
    if (this.source) {
      if (track.startTime <= now && track.startTime + track.duration >= now) {
        this.source.stop(when);
        this.bol = false;
      }
    }
  }
}
