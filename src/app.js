import _assign from 'lodash.assign';
import EventEmitter from 'event-emitter';
import Playlist from './Playlist';


export function init(options = {}, ee = EventEmitter()) {
  if (options.container === undefined) {
    throw new Error('DOM element container must be given.');
  }

  window.OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  const audioContext = new window.AudioContext();

  const defaults = {
    ac: audioContext,
    sampleRate: audioContext.sampleRate,
    samplesPerPixel: 512,
    mono: true,
    fadeType: 'logarithmic',
    exclSolo: false,
    timescale: false,
    controls: {
      show: false,
      width: 150,
    },
    colors: {
      waveOutlineColor: 'white',
      timeColor: 'grey',
      fadeColor: 'black',
    },
    seekStyle: 'line',
    waveHeight: 128,
    state: 'cursor',
    zoomLevels: [128, 256, 512, 1024, 2048, 4096, 8192, 16384],
    annotationList: {
      annotations: [],
      controls: [],
      editable: false,
      linkEndpoints: false,
      isContinuousPlay: false,
    },
    isAutomaticScroll: false,
  };

  const config = _assign(defaults, options);
  const zoomIndex = config.zoomLevels.indexOf(config.samplesPerPixel);

  if (zoomIndex === -1) {
    throw new Error('initial samplesPerPixel must be included in array zoomLevels');
  }

  const playlist = new Playlist();
  playlist.setSampleRate(config.sampleRate);
  playlist.setSamplesPerPixel(config.samplesPerPixel);
  playlist.setAudioContext(config.ac);
  playlist.setEventEmitter(ee);
  playlist.setUpEventEmitter();                       // 初始化音频通用方法
  // playlist.setTimeSelection(0, 0);                    // 初始化播放起始结束点
  // playlist.setState(config.state);
  playlist.setControlOptions(config.controls);        // 宽度以及show设置
  playlist.setWaveHeight(config.waveHeight);
  playlist.setColors(config.colors);
  playlist.setZoomLevels(config.zoomLevels);
  playlist.setZoomIndex(zoomIndex);
  // playlist.setMono(config.mono);                      // 设置是否填充满
  // playlist.setExclSolo(config.exclSolo);              // 未知
  // playlist.setShowTimeScale(config.timescale);        // 设置时间刻度条show
  // playlist.setSeekStyle(config.seekStyle);            // 设置播放模式line
  // playlist.setAnnotations(config.annotationList);     // 未知 重要
  playlist.isAutomaticScroll = config.isAutomaticScroll;
  playlist.isContinuousPlay = config.isContinuousPlay;
  playlist.linkedEndpoints = config.linkedEndpoints;

  playlist.render();

  return playlist;
}

export default function (options = {}, ee = EventEmitter()) {
  return init(options, ee);
}
