import _defaults from 'lodash.defaults';

import createElement from 'virtual-dom/create-element';

import TimeScale from './render/TimeScale';
import Track from './render/Track';
import Playout from './Playout';
import PlayedHook from './render/PlayedHook';
import FragHook from './render/FragHook';
import FormHook from './render/FormHook';

import FragController from './track/controller/FragController';
import FormController from './track/controller/FormController';
import OtherController from './track/controller/OtherController';

import LoaderFactory from './track/loader/LoaderFactory';

export default class {
  constructor() {
    this.defaults = _defaults;
    this.duration = 0;
    this.scrollLeft = 0;
    this.tracks = [];
    this.timer = null;
    this.cycle = true;
    this.allTime = 0;
    this.loadFirst = true;

    this.startTime = 0;
    this.stopTime = 0;
    this.pauseTime = 0;
    this.lastPlay = 0;
    this.formInfo = [];


    this.fragDom = document.getElementById('waveFrag');
    this.canvasDom = document.getElementById('waveCanvse');
    this.playBig = document.getElementsByClassName('playBig')[0];
    this.playBotton = this.playBig.getElementsByClassName('playBtton')[0];
    this.pauseBtton = this.playBig.getElementsByClassName('pauseBtton')[0];
  }
  // 设置初始值
  setDefault(info) {
    this.markData = info || this.markData;
  }
  // 设置项目名称ID
  setSampleName(name) {
    this.name = name;
  }
  // 设置初始值
  setDataInfo(info) {
    if (info) {
      this.formInfo = info;
      return;
    }
    // if (localStorage[this.name] && localStorage[this.name] !== '[]') {
    //   this.formInfo = JSON.parse(localStorage[this.name]);
    // }
  }
  setTypeArr(typeArr) {
    this.typeArr = typeArr;
  }
  setErrorInfo(errorInfo) {
    this.errorInfo = errorInfo;
  }
  setSaveFun(saveFun) {
    this.saveFun = saveFun;
  }
  setCanMove(canmove) {
    this.canMove = canmove;
  }
  setMarkInfo(markInfo) {
    this.markInfo = markInfo;
  }
  // 设置循环
  setCycle(bol) {
    this.cycle = bol;
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
  // 设置show
  setControlOptions(controlOptions) {
    this.controls = controlOptions;
  }
  // 保存数据
  saveLocalStorage() {
    localStorage.setItem(this.name, JSON.stringify(this.formInfo));
    return this.formInfo;
  }
  // 工具类
  adjustDuration() {
    this.duration = this.tracks.reduce(
      (duration, track) => Math.max(duration, track.getEndTime()),
      0,
    );
    this.allTime += this.tracks[this.tracks.length - 1].duration;
  }
  // 添加新片段
  setFragHook(frag) {
    this.formInfo = frag;
    this.formController.setForminfo(this.formInfo);
    this.fragController.setForminfo(this.formInfo);
    this.fragHook.renderAdd(frag[frag.length - 1], frag.length - 1);
    this.formHook.renderAdd(this.formInfo);
  }
  changeFragHook(frag, index) {
    this.formInfo.splice(index, 1, frag);
    this.formHook.render();
  }
  clearInfo(){
    this.formInfo = [];
    this.formController.setForminfo(this.formInfo);
    this.fragController.setForminfo(this.formInfo);
    this.render();
  }
  deleteFragHook(index) {
    document.getElementsByClassName('form-selected')[0].className = 'form-group';
    this.formInfo.splice(index, 1);
    this.formController.setForminfo(this.formInfo);
    this.fragController.setForminfo(this.formInfo);
    this.fragController.setSelected();
    this.fragHook.render();
    this.formHook.render(true);
  }
  saveAddlastForm(){
    this.formController.saveAddForm();
  }

  // 控制模块
  setUpEventEmitter() {
    const ee = this.ee;
    this.fragController = new FragController(ee, this.fragDom,
      this.formInfo, this.samplesPerPixel, this.sampleRate, this.canMove);
    this.fragController.bindEvent();
    this.formController = new FormController(ee, this.formInfo, this.markInfo);
    this.formController.bindEvent();
    this.otherController = new OtherController(ee);
    this.otherController.bindEvent();
    ee.on('play', (startTime, endTime) => {
      this.play(startTime, endTime);
    });
    ee.on('pause', () => {
      this.pause();
    });
    ee.on('playFrag', (index) => {
      this.playFrag(index);
    });
    ee.on('changeFrag', (frag, index) => {
      this.changeFragHook(frag, index);
    });
    ee.on('addFrag', (frag) => {
      this.setFragHook(frag);
    });
    ee.on('selectdFrag', (index) => {
      this.formController.setClassName(index);
    });
    ee.on('deleteFrag', (index) => {
      this.deleteFragHook(index);
    });
    ee.on('saveAddForm', () => {
      this.formController.saveAddForm();
    })
    ee.on('zoom', (index) => {
      this.zoom(index);
    });
    ee.on('save', (formData) => {
      this.formInfo = formData;
      this.saveLocalStorage();
      this.saveFun(this.formInfo);
    });
    ee.on('saveFun', (formInfo) => {
      this.formController.saveAddForm();
      this.saveFun(formInfo);
    });
    ee.on('loadFirst', () => {
      const self = this;
      if (this.loadFirst) {
        setTimeout(() => self.play(), 1000);
        this.loadFirst = false;
      }
    });
    ee.on('clear', () => {
      this.clearInfo();
    });
    ee.on('demo', () => {
      console.log(111);
    });
    document.getElementById('wrap').onmousewheel = (e) => {
      const zoomIndex = e.deltaY === 100 ? 1 : -1;
      e.preventDefault();
      ee.emit('zoom', zoomIndex);
    };
    document.getElementById('container').onscroll = (e) => {
      document.getElementById('formInfo').style.left = `-${e.path[0].scrollLeft}px`;
    };
    document.onkeydown = (e) => {
      switch (e.keyCode) {
        case 32:
          this.isPlaying() ? this.pause() : this.play();
          e.preventDefault();
          break;
        case 82:
          this.ee.emit('rightEvent', e);
          break;
        // case 8:
        //   const index = document.getElementsByClassName('fragSelected')[0].getAttribute('name');
        //   this.deleteFragHook(index);
        default:
          break;
      }
    };
  }
  playFrag(index) {
    const start = this.formInfo[index].start;
    const end = this.formInfo[index].end - start;
    this.play(start, end);
  }
  // 是否播放
  isPlaying() {
    let isplay = false;
    this.tracks.forEach((track) => {
      if (track.isPlaying()) {
        isplay = true;
      }
    });
    return isplay;
  }
  // 获取间隔时间TODO
  getElapsedTime() {
    return this.ac.currentTime - this.lastPlay;
  }
  // 停止
  playbackReset() {
    this.tracks.forEach((track) => {
      track.scheduleStop(track, this.lastPlay);
    });

    return Promise.all(this.playoutPromises);
  }
  // 启动动画
  startAnimation() {
    this.stopAnimation();
    this.timer = requestAnimationFrame((step) => {
      this.stepStart = step;
      this.animationRequest(step);
    });
  }
  animationRequest(step) {
    const stepStart = (step - this.stepStart) / 1000;
    this.lastPlay = this.startTime ? this.startTime + stepStart : this.pauseTime + stepStart;
    if (this.lastPlay >= this.startTime + this.endTime) {
      if (this.cycle) {
        this.play(this.startTime, this.endTime);
        return;
      }
      this.stopAnimation();
      this.pauseTime = this.lastPlay;
    } else {
      this.renderPlayed(this.lastPlay);
      this.timer = requestAnimationFrame((steps) => {
        this.animationRequest(steps);
      });
      if (this.lastPlay > this.allTime) {
        this.stop();
      }
    }
  }
  // 停止动画
  stopAnimation() {
    window.cancelAnimationFrame(this.timer);
  }
  // demo
  demo() {
    this.ee.emit('demo');
  }

  // 播放
  play(startTime, endTime) {
    const start = startTime || this.pauseTime;
    const end = endTime || this.allTime;
    this.startTime = startTime;
    this.endTime = end;
    if (this.isPlaying()) {
      return this.restartPlayFrom(start, end);
    }
    this.startAnimation();
    const playoutPromises = [];
    const currentTime = this.ac.currentTime;
    this.tracks.forEach((track) => {
      playoutPromises.push(track.schedulePlay(currentTime, start, end, {
        shouldPlay: true,
        masterGain: this.masterGain,
      }, track));
    });
    this.playoutPromises = playoutPromises;

    document.getElementById('play').style.display = 'none';
    this.playBotton.style.display = 'none';
    this.pauseBtton.style.display = 'block';
    return Promise.all(this.playoutPromises);
  }
  // 暂停
  pause() {
    if (!this.isPlaying()) {
      return;
      // return Promise.all(this.playoutPromises);
    }
    this.stopAnimation();
    this.pauseTime = this.lastPlay;
    document.getElementById('play').style.display = 'block';
    this.playBotton.style.display = 'block';
    this.pauseBtton.style.display = 'none';
    return this.playbackReset();
  }
  // 停止
  stop() {
    this.stopAnimation();
    this.pauseTime = 0;
    this.renderPlayed(this.pauseTime);
    document.getElementById('play').style.display = 'block';
    return this.playbackReset();
  }
  // 重新播放
  restartPlayFrom(start, end) {
    this.stopAnimation();
    this.tracks.forEach((editor) => {
      editor.scheduleStop(editor, this.lastPlay);
    });

    return Promise.all(this.playoutPromises).then(this.play.bind(this, start, end));
  }
  // 缩放大小
  zoom(zoomStyle) {
    const index = this.zoomIndex + zoomStyle;
    if (index < this.zoomLevels.length && index >= 0 && this.zoomBol) {
      this.zoomIndex = index;
      this.zoomBol = false;
    } else {
      return;
    }
    this.setZoom(this.zoomIndex);
    this.fragController.setSamples(this.samplesPerPixel, this.sampleRate);
    this.renderPlayed(this.pauseTime);
    this.render();
  }

  // 加载音频并初始化显示
  load(trackList) {
    if (!trackList || trackList.length === 0) {
      this.zoomBol = true;
      return;
    }
    const promiseTrack = [trackList[0]];
    trackList.shift();
    const loadPromises = promiseTrack.map((trackInfo) => {
      const loader = LoaderFactory.createLoader(trackInfo.src, this.ac, this.ee);
      return loader.load();
    });
    return Promise.all(loadPromises).then((audioBuffers) => {
      const tracks = audioBuffers.map((audioBuffer, index) => {
        const info = promiseTrack[index];
        const name = info.name || 'Untitled';
        const cueIn = info.cuein || 0;
        const cueOut = info.cueout || audioBuffer.duration;
        const selection = info.selected;
        const peaks = info.peaks || { type: 'WebAudio', mono: this.mono };
        const waveOutlineColor = info.waveOutlineColor || undefined;
        const playout = new Playout(this.ac, audioBuffer);
        const track = new Track(this.fragDom);
        track.src = info.src;
        track.setBuffer(audioBuffer);
        track.setName(name);
        track.setCues(cueIn, cueOut);
        track.setWaveOutlineColor(waveOutlineColor);
        track.startTime = this.allTime;

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
      this.render(trackList);
    });
  }
  // 时间刻度记载
  renderTimeScale() {
    this.fragController.setAllTime(this.allTime);
    let timeScaleArr = [];
    let surplusTime = this.allTime;
    while (surplusTime >= 60) {
      surplusTime -= 60;
      timeScaleArr.push(this.renderTime(60, timeScaleArr.length));
    }
    timeScaleArr.push(this.renderTime(surplusTime, timeScaleArr.length));
    return timeScaleArr;
  }
  renderTime(time, length) {
    const controlWidth = this.controls.show ? this.controls.width : 0;
    const timeScale = new TimeScale(time, 60 * length,
      this.samplesPerPixel, this.sampleRate, controlWidth);
    return timeScale.render();
  }
  // 波形图绘制
  renderTrackSection() {
    const trackElements = this.tracks.map(track =>
      track.render(this.samplesPerPixel, this.sampleRate),
    );
    return trackElements;
  }
  // 播放过音频控制
  renderPlayed(seconds) {
    const played = new PlayedHook(seconds, this.samplesPerPixel, this.sampleRate, this.allTime);
    return played.render();
  }
  // 加载片段框
  renderFrag() {
    this.fragHook = new
    FragHook(this.fragDom, this.formInfo, this.samplesPerPixel, this.sampleRate, this.ee);
    this.fragHook.render();
    this.formHook = new FormHook(this.typeArr, this.errorInfo, this.formInfo, this.samplesPerPixel,
      this.sampleRate, this.ee, this.markInfo);
    this.formHook.render();
  }
  // 加载页面
  render(trackList) {
    const timeTree = this.renderTimeScale();
    document.getElementById('timescale').innerHTML = '';
    timeTree.forEach(item => {
      const timeNode = createElement(item);
      document.getElementById('timescale').appendChild(timeNode);
    });
    const canvasTree = this.renderTrackSection();
    this.canvasDom.innerHTML = '';
    if (canvasTree.length !== 0) {
      for (let i = 0; i < canvasTree.length; i++) {
        const canvasNode = createElement(canvasTree[i][0]);
        this.canvasDom.appendChild(canvasNode);
      }
    }
    this.renderFrag();
    this.load(trackList);
  }
}