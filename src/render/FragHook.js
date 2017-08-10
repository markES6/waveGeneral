import { secondsToPixels } from '../utils/conversions';

class FragHook {
  constructor(fragDom, formArr, samplesPerPixel, sampleRate) {
    this.formArr = formArr;
    this.samplesPerPixel = samplesPerPixel;
    this.sampleRate = sampleRate;
    this.fragDom = fragDom;
  }
  creatDom(frag, index) {
    const left = secondsToPixels(frag.start, this.samplesPerPixel, this.sampleRate);
    const width = secondsToPixels(frag.end, this.samplesPerPixel, this.sampleRate) - left;
    const dom = `<div class="frag" style='left:${left}px;width:${width}px' name=${index}></div>`;
    return dom;
  }
  renderAdd(frag) {
    const dom = this.creatDom(frag);
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
