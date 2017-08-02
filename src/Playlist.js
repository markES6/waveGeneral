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

    // this.startTime = 0;
    // this.stopTime = 0;
    this.pauseTime = 0;
    this.lastPlay = 0;
    this.formInfo = [];
  }
  // 设置初始值
  setDefault(info) {
    this.markData = info || this.markData;
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
  // 设置缩放比例
  setZoom(zoomIndex) {
    const zoom = this.zoomLevels[zoomIndex];
    this.samplesPerPixel = zoom;
    this.tracks.forEach((track) => {
      track.calculatePeaks(zoom, this.sampleRate);
    });
  }
  // 设置缩放点率
  setSamplesPerPixel(samplesPerPixel) {
    this.samplesPerPixel = samplesPerPixel;
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

  // 控制模块
  setUpEventEmitter() {
    // const ee = this.ee;
    // ee.on('play', (now, startTime, endTime) => {
    //   this.play(now, startTime, endTime);
    // });
  }
  // 是否播放
  isPlaying() {
    return this.tracks.reduce(
      (isPlaying, track) => isPlaying || track.isPlaying(),
      false,
    );
  }

  getElapsedTime() {
    return this.ac.currentTime - this.lastPlay;
  }
  //
  playbackReset() {
    this.tracks.forEach((track) => {
      track.scheduleStop();
    });

    return Promise.all(this.playoutPromises);
  }
  // demo
  demo() {
    // const widArr = [375, 187, 93]
    console.log(this.zoomLevels);
  }

  // 播放
  play(now, startTime, endTime) {
    const end = endTime || this.duration;
    let start = startTime;
    if (this.pauseTime) {
      start = this.pauseTime;
    }
    const playoutPromises = [];
    const currentTime = this.ac.currentTime;
    this.tracks.forEach((track) => {
      playoutPromises.push(track.schedulePlay(currentTime, start, end, {
        shouldPlay: true,
        masterGain: this.masterGain,
      }));
    });
    this.lastPlay = currentTime;
    this.playoutPromises = playoutPromises;
    return Promise.all(this.playoutPromises);
  }
  // 暂停
  pause() {
    if (!this.isPlaying()) {
      return Promise.all(this.playoutPromises);
    }
    this.pauseTime += this.getElapsedTime();
    return this.playbackReset();
  }
  // 暂停
  stop() {
    this.pauseTime = 0;
    return this.playbackReset();
  }
  // 缩放大小
  zoom(zoomStyle) {
    const index = this.zoomIndex + zoomStyle;
    if (index < this.zoomLevels.length && index >= 0) {
      this.zoomIndex = index;
    }
    this.setZoom(this.zoomIndex);
    this.render();
  }

  // 加载音频并初始化显示
  load(trackList) {
    const loadPromises = trackList.map((trackInfo) => {
      const loader = LoaderFactory.createLoader(trackInfo.src, this.ac, this.ee);
      return loader.load();
    });
    return Promise.all(loadPromises).then((audioBuffers) => {
      const tracks = audioBuffers.map((audioBuffer, index) => {
        const info = trackList[index];
        const name = info.name || 'Untitled';
        const cueIn = info.cuein || 0;
        const cueOut = info.cueout || audioBuffer.duration;
        const selection = info.selected;
        const peaks = info.peaks || { type: 'WebAudio', mono: this.mono };
        const waveOutlineColor = info.waveOutlineColor || undefined;
        const playout = new Playout(this.ac, audioBuffer);
        const track = new Track();
        track.src = info.src;
        track.setBuffer(audioBuffer);
        track.setName(name);
        track.setCues(cueIn, cueOut);
        track.setWaveOutlineColor(waveOutlineColor);

        if (selection !== undefined) {
          this.setActiveTrack(track);
          this.setTimeSelection(selection.start, selection.end);
        }
        if (peaks !== undefined) {
          track.setPeakData(peaks);
        }

        track.setPlayout(playout);

        track.calculatePeaks(this.samplesPerPixel, this.sampleRate);
        return track;
      });

      this.tracks = this.tracks.concat(tracks);
      this.adjustDuration();
      this.render();
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