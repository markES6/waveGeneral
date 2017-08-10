import { pixelsToSeconds } from '../../utils/conversions';

class CanvasController {
  constructor(ee, canvasDom, samplesPerPixel, sampleRate) {
    this.canvasDom = canvasDom;
    this.samplesPerPixel = samplesPerPixel;
    this.sampleRate = sampleRate;
    this.ee = ee;
  }
  setSamples(samplesPerPixel, sampleRate) {
    this.samplesPerPixel = samplesPerPixel;
    this.sampleRate = sampleRate;
  }
  bindEvent() {
    this.canvasDom.addEventListener('mouseup', (e) => {
      const canvasLeft = this.canvasDom.getBoundingClientRect().left;
      const mouseLeft = e.clientX;
      const playWidth = mouseLeft - canvasLeft;
      const start = pixelsToSeconds(playWidth, this.samplesPerPixel, this.sampleRate);
      this.ee.emit('play', start);
    });
  }
}
export default CanvasController;
