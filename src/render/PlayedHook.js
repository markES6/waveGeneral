import { secondsToPixels } from '../utils/conversions';

class PlayedHook {
  constructor(seconds, samplesPerPixel, sampleRate, duration) {
    this.seconds = seconds;
    this.samplesPerPixel = samplesPerPixel;
    this.sampleRate = sampleRate;
    this.duration = duration;

    this.oDiv0 = document.getElementById('container');
    this.oDiv1 = document.getElementById('waveBack');
    this.oDiv2 = document.getElementById('wavePointer');
    this.oDiv3 = document.getElementById('played');
  }
  render() {
    const widthX = secondsToPixels(this.seconds, this.samplesPerPixel, this.sampleRate);
    const allWidth = secondsToPixels(this.duration, this.samplesPerPixel, this.sampleRate);
    const playedWid = widthX / allWidth;
    this.oDiv0.scrollLeft = `${widthX - 400}`;
    this.oDiv1.style.width = `${widthX}px`;
    this.oDiv2.style.left = `${widthX}px`;
    this.oDiv3.style.width = `${playedWid * 100}%`;
  }
}
export default PlayedHook;
