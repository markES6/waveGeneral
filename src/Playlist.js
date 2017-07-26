import _defaults from 'lodash.defaults';

import createElement from 'virtual-dom/create-element';

import TimeScale from './TimeScale';
import Track from './Track';
import Playout from './Playout';
import LoaderFactory from './track/loader/LoaderFactory';

export default class {
  constructor() {
    this.defaults = _defaults;
    this.duration = 0;
    this.scrollLeft = 0;
    this.tracks = [];
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
  // 设置show
  setControlOptions(controlOptions) {
    this.controls = controlOptions;
  }

  // 工具类
  adjustDuration() {
    this.duration = this.tracks.reduce(
      (duration, track) => Math.max(duration, track.getEndTime()),
      0,
    );
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
        // const start = info.start || 0;
        // const states = info.states || {};
        // const gain = info.gain || 1;
        const cueIn = info.cuein || 0;
        const cueOut = info.cueout || audioBuffer.duration;
        const selection = info.selected;
        const peaks = info.peaks || { type: 'WebAudio', mono: this.mono };
        // const customClass = info.customClass || undefined;
        const waveOutlineColor = info.waveOutlineColor || undefined;
        // webaudio specific playout for now.
        const playout = new Playout(this.ac, audioBuffer);
        const track = new Track();
        track.src = info.src;
        track.setBuffer(audioBuffer);
        track.setName(name);
        // track.setEventEmitter(this.ee);
        // track.setEnabledStates(states);
        track.setCues(cueIn, cueOut);
        // track.setCustomClass(customClass);
        track.setWaveOutlineColor(waveOutlineColor);

        if (selection !== undefined) {
          this.setActiveTrack(track);
          this.setTimeSelection(selection.start, selection.end);
        }
        if (peaks !== undefined) {
          track.setPeakData(peaks);
        }

        // track.setState(this.getState());
        // track.setStartTime(start);
        track.setPlayout(playout);

        // track.setGainLevel(gain);

        track.calculatePeaks(this.samplesPerPixel, this.sampleRate);

        return track;
      });

      this.tracks = this.tracks.concat(tracks);
      this.adjustDuration();
      // this.draw(this.render());
      this.render();
      // this.ee.emit('audiosourcesrendered');
    });
  }
  // 时间刻度记载
  renderTimeScale() {
    const controlWidth = this.controls.show ? this.controls.width : 0;
    const timeScale = new TimeScale(this.duration, this.scrollLeft,
      this.samplesPerPixel, this.sampleRate, controlWidth);
    return timeScale.render();
  }
  // 波形图绘制
  renderTrackSection() {
    const trackElements = this.tracks.map(track =>
      track.render(),
    );
    return trackElements;
  }
  // 加载页面
  render() {
    const timeTree = this.renderTimeScale();
    const timeNode = createElement(timeTree);
    document.getElementById('timescale').innerHTML = '';
    document.getElementById('timescale').appendChild(timeNode);

    const canvasTree = this.renderTrackSection();
    document.getElementById('waveCanvse').innerHTML = '';
    if (canvasTree.length !== 0) {
      const canvasNode = createElement(canvasTree[0][0]);
      document.getElementById('waveCanvse').appendChild(canvasNode);
    }
  }
}