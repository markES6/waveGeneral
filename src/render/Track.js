// 音频播放设置
import _assign from 'lodash.assign';
import h from 'virtual-dom/h';

import extractPeaks from 'webaudio-peaks';
import { secondsToSamples, secondsToPixels } from '../utils/conversions';
import CanvasHook from '../render/CanvasHook';

const MAX_CANVAS_WIDTH = 3000;
export default class {
  constructor(fragDom) {
    this.startTime = 0;
    this.endTime = 0;
    this.fragDom = fragDom;
    this.peakData = {
      type: 'WebAudio',
      mono: true,
    };
  }
  // 设置音频流
  setBuffer(buffer) {
    this.buffer = buffer;
  }
  // 设置名称
  setName(name) {
    this.name = name;
  }
  // 设置颜色配置
  setWaveOutlineColor(color) {
    this.waveOutlineColor = color;
  }
  // 设置peakData
  setPeakData(data) {
    this.peakData = data;
  }
  // 设置playout
  setPlayout(playout) {
    this.playout = playout;
  }
  // 设置开始结束时间
  setStartTime(start) {
    this.startTime = start;
    this.endTime = start + this.duration;
  }
  // 设置区时间
  setCues(cueIn, cueOut) {
    if (cueOut < cueIn) {
      throw new Error('cue out cannot be less than cue in');
    }
    this.cueIn = cueIn;
    this.cueOut = cueOut;
    this.duration = this.cueOut - this.cueIn;
    this.endTime = this.startTime + this.duration;
  }
  // 设置peaks
  setPeaks(peaks) {
    this.peaks = peaks;
  }
  // 获取结束时间
  getEndTime() {
    return this.endTime;
  }
  // 是否播放
  isPlaying() {
    return this.playout.isPlaying();
  }
  // 播放
  schedulePlay(now, startTime, endTime, config, track) {
    const defaultOptions = {
      shouldPlay: true,
      masterGain: 1,
      isOffline: false,
    };

    const options = _assign({}, defaultOptions, config);
    const playoutSystem = options.isOffline ? this.offlinePlayout : this.playout;
    const sourcePromise = playoutSystem.setUpSource();
    playoutSystem.setVolumeGainLevel(1);
    playoutSystem.setShouldPlay(options.shouldPlay);
    playoutSystem.setMasterGainLevel(1);
    playoutSystem.play(now, startTime, endTime, track);
    return sourcePromise;
  }
  // 停止
  scheduleStop(track, now, when = 0) {
    this.playout.stop(track, now, when);
  }

  // 设置peaks
  calculatePeaks(samplesPerPixel, sampleRate) {
    this.sampleRate = sampleRate;
    const cueIn = secondsToSamples(this.cueIn, sampleRate);
    const cueOut = secondsToSamples(this.cueOut, sampleRate);
    this.setPeaks(extractPeaks(this.buffer, samplesPerPixel, this.peakData.mono, cueIn, cueOut));
  }

  // 构造canvas声音波形
  render(samplesPerPixel, sampleRate) {
    const canvasWidth = this.peaks.length;
    const canvasLeft = secondsToPixels(this.startTime, samplesPerPixel, sampleRate);
    const fragDomWid = secondsToPixels(this.startTime + this.endTime, samplesPerPixel, sampleRate);
    const canvasHeight = 300;
    this.fragDom.style.width = `${fragDomWid}px`;
    const channels = Object.keys(this.peaks.data).map((channelNum) => {
      const channelChildren = [];
      let offset = 0;
      let totalWidth = canvasWidth;
      const peaks = this.peaks.data[channelNum];
      while (totalWidth > 0) {
        const currentWidth = Math.min(totalWidth, MAX_CANVAS_WIDTH);
        const canvasColor = '#373B4D';

        channelChildren.push(h('canvas', {
          attributes: {
            width: currentWidth,
            height: canvasHeight,
            style: 'float: left; position: relative; margin: 0; padding: 0; z-index: 3;',
          },
          hook: new CanvasHook(peaks, offset, this.peaks.bits, canvasColor),
        }));
        totalWidth -= currentWidth;
        offset += MAX_CANVAS_WIDTH;
      }

      return h(`div.channel.channel-${channelNum}`,
        {
          attributes: {
            style: `height: ${canvasHeight}px;left: ${canvasLeft}px; width: ${canvasWidth}px; top: ${channelNum * canvasHeight}px; position: absolute; margin: 0; padding: 0; z-index: 1;border-top: 20px #373B4D solid;border-bottom: 20px #373B4D solid;`,
          },
        },
        channelChildren,
      );
    });
    return channels;
  }
}
