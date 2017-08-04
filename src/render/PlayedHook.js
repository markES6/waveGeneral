import { secondsToPixels } from '../utils/conversions';

class PlayedHook {
  constructor(seconds, samplesPerPixel, sampleRate) {
    this.seconds = seconds;
    this.samplesPerPixel = samplesPerPixel;
    this.sampleRate = sampleRate;

    this.oDiv1 = document.getElementById('waveBack');
    this.oDiv2 = document.getElementById('wavePointer');
  }
  render() {
    const widthX = secondsToPixels(this.seconds, this.samplesPerPixel, this.sampleRate);
    this.oDiv1.style.width = widthX + 'px';
    this.oDiv2.style.left = widthX + 'px';
  }
}
export default PlayedHook;
