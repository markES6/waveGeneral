import { secondsToPixels } from '../utils/conversions';

class FragHook {
  constructor(fragDom, formArr, samplesPerPixel, sampleRate) {
    this.formArr = formArr;
    this.samplesPerPixel = samplesPerPixel;
    this.sampleRate = sampleRate;
    this.fragDom = fragDom;
  }
  creatDom(frag, index) {
    const start = Math.min(frag.start, frag.end);
    const end = Math.max(frag.start, frag.end);
    const left = secondsToPixels(start, this.samplesPerPixel, this.sampleRate);
    const width = secondsToPixels(end, this.samplesPerPixel, this.sampleRate) - left;
    const dom = `<div class="frag" style='left:${left}px;width:${width}px' name=${index}></div>`;
    return dom;
  }
  renderAdd(frag, index) {
    const dom = this.creatDom(frag, index);
    this.fragDom.innerHTML += dom;
  }
  render() {
    let domAll = '';
    this.formArr.forEach((item, index) => {
      domAll += this.creatDom(item, index);
    });
    this.fragDom.innerHTML = domAll;
  }
}
export default FragHook;
