import _defaults from 'lodash.defaults';

import LoaderFactory from './track/loader/LoaderFactory';

export default class {
  constructor() {
    this.load = LoaderFactory;
    this.defaults = _defaults;
  }

  // 音频码率
  setSampleRate(sampleRate) {
    this.sampleRate = sampleRate;
  }
  // 音频初始缩放比例
  setSamplesPerPixel(samplesPerPixel) {
    this.samplesPerPixel = samplesPerPixel;
  }
  // 音频AudioContext初始化
  setAudioContext(ac) {
    this.ac = ac;
  }
  // 初始化事件模块
  setEventEmitter(ee) {
    this.ee = ee;
  }
  // 初始化事件状态，且设置track模块事件状态
  setState(state) {
    this.state = state;
    this.tracks.forEach((track) => {
      track.setState(state);
    });
  }
  // 设置wave高度
  setWaveHeight(height) {
    this.waveHeight = height;
  }
  // 设置曲线的颜色
  setColors(colors) {
    this.colors = colors;
  }
  // 设置缩放的区间
  setZoomLevels(levels) {
    this.zoomLevels = levels;
  }
  // 设置缩放index
  setZoomIndex(index) {
    this.zoomIndex = index;
  }


  // 加载音频并初始化显示
  load(trackList) {
    const loadPromises = trackList.map((trackInfo) => {
      const loader = LoaderFactory.createLoader(trackInfo.src, this.ac, this.ee);
      return loader.load();
    });
    return Promise.all(loadPromises).then((audioBuffers) => {
      this.ee.emit('audiosourcesloaded');
      const tracks = audioBuffers.map((audioBuffer, index) => {
        const info = trackList[index];
        const name = info.name || 'Untitled';
        const start = info.start || 0;
        const states = info.states || {};
        const fadeIn = info.fadeIn;
        const fadeOut = info.fadeOut;
        const cueIn = info.cuein || 0;
        const cueOut = info.cueout || audioBuffer.duration;
        const gain = info.gain || 1;
        const muted = info.muted || false;
        const soloed = info.soloed || false;
        const selection = info.selected;
        const peaks = info.peaks || { type: 'WebAudio', mono: this.mono };
        const customClass = info.customClass || undefined;
        const waveOutlineColor = info.waveOutlineColor || undefined;
        // webaudio specific playout for now.
        const playout = new Playout(this.ac, audioBuffer);
        const track = new Track();
        track.src = info.src;
        track.setBuffer(audioBuffer);
        track.setName(name);
        track.setEventEmitter(this.ee);
        track.setEnabledStates(states);
        track.setCues(cueIn, cueOut);
        track.setCustomClass(customClass);
        track.setWaveOutlineColor(waveOutlineColor);

        if (fadeIn !== undefined) {
          track.setFadeIn(fadeIn.duration, fadeIn.shape);
        }

        if (fadeOut !== undefined) {
          track.setFadeOut(fadeOut.duration, fadeOut.shape);
        }

        if (selection !== undefined) {
          this.setActiveTrack(track);
          this.setTimeSelection(selection.start, selection.end);
        }

        if (peaks !== undefined) {
          track.setPeakData(peaks);
        }

        track.setState(this.getState());
        track.setStartTime(start);
        track.setPlayout(playout);

        track.setGainLevel(gain);

        if (muted) {
          this.muteTrack(track);
        }

        if (soloed) {
          this.soloTrack(track);
        }

        // extract peaks with AudioContext for now.
        track.calculatePeaks(this.samplesPerPixel, this.sampleRate);

        return track;
      });

      this.tracks = this.tracks.concat(tracks);
      this.adjustDuration();
      this.draw(this.render());

      this.ee.emit('audiosourcesrendered');
    });
  }
}