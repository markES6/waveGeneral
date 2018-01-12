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
    samplesPerPixel: 1500,
    controls: {
      show: false,
      width: 150,
    },
    colors: {
      waveOutlineColor: 'white',
      timeColor: 'grey',
      fadeColor: 'black',
    },
    typeArr: [{ type: 'input', sort: 'form1', title: '标题', option: '' },
              { type: 'select', sort: 'form2', title: 'select', option: ['苹果', '香蕉', '橘子'] },
           // { type: 'checkbox', sort: 'form3', title: 'checkbox', option: ['苹果', '香蕉', '橘子'] },
           // { type: 'radio', sort: 'form4', title: 'radio', option: ['苹果', '香蕉', '橘子'] }
          ],
    saveFun: (info) => {
      console.log(info);
    },
    beforeCreate: function(frag){
      return frag
    },
    canMove: false,
    errorInfo: { type: 'checkbox', sort: 'errorInfo', title: 'errorInfo', option: ['错误1', '错误2', '错误3'] },
    waveHeight: 256,
    zoomLevels: [400, 750, 1500, 3000, 6000, 11000, 19000],
  };
  const config = _assign(defaults, options);
  const zoomIndex = config.zoomLevels.indexOf(config.samplesPerPixel);

  if (zoomIndex === -1) {
    throw new Error('initial samplesPerPixel must be included in array zoomLevels');
  }
  const playlist = new Playlist();
  playlist.setSampleName(config.name);
  playlist.setDataInfo(config.markData);
  playlist.setDefault(config.markData);
  playlist.setMarkInfo(config.markInfo);
  playlist.setDataInfo();
  playlist.setTypeArr(config.typeArr);
  playlist.setErrorInfo(config.errorInfo);
  playlist.setSaveFun(config.saveFun);
  playlist.setBeforeCreate(config.beforeCreate);
  playlist.setCanMove(config.canMove);
  playlist.setSampleRate(config.sampleRate);
  playlist.setSamplesPerPixel(config.samplesPerPixel);
  playlist.setAudioContext(config.ac);
  playlist.setEventEmitter(ee);
  playlist.setUpEventEmitter();                       // 初始化音频通用方法
  playlist.setControlOptions(config.controls);        // 宽度以及show设置
  playlist.setWaveHeight(config.waveHeight);
  playlist.setColors(config.colors);
  playlist.setZoomLevels(config.zoomLevels);
  playlist.setZoomIndex(zoomIndex);

  playlist.isAutomaticScroll = config.isAutomaticScroll;
  playlist.isContinuousPlay = config.isContinuousPlay;
  playlist.linkedEndpoints = config.linkedEndpoints;

  playlist.render();
  return playlist;
}

export default function (options = {}, ee = EventEmitter()) {
  return init(options, ee);
}
