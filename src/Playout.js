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

  // whensd:延时 offset 偏移量 duration 持续时间
  // when：当前时间轴 start：开始时间 duration：持续时间 track：音频信息
  // TODO 整体修改
  play(when, start, duration, track) {
    const offset = start - track.startTime <=0 ? 0 : start - track.startTime;
    console.log(offset);
    console.log(duration);
    if (offset >= duration) {
      this.source.start(10000, 0, duration);
    } else {
      const whens = when + track.startTime - start <= 0 ? 0 : when + track.startTime - start;
      this.source.start(whens, offset, 10000);
    }
    this.bol = true;
  }

  stop(track, now, when = 0) {
    if (this.source) {
      this.source.stop(when);
      this.bol = false;
    }
  }
}
