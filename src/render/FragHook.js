import { secondsToPixels } from '../utils/conversions';

class FragHook {
  constructor(fragDom, formArr, samplesPerPixel, sampleRate) {
    this.formArr = formArr;
    this.samplesPerPixel = samplesPerPixel;
    this.sampleRate = sampleRate;
    this.fragDom = fragDom;
    this.smallNav = document.getElementById('navList');
  }
  creatDom(frag, index) {
    const start = Math.min(frag.start, frag.end);
    const end = Math.max(frag.start, frag.end);
    const left = secondsToPixels(start, this.samplesPerPixel, this.sampleRate);
    const width = secondsToPixels(end, this.samplesPerPixel, this.sampleRate) - left;
    let state = '';
    if (frag.extend.qualityState === '0') {
      state = 'fragGreen';
    } else if (frag.extend.qualityState === '1') {
      state = 'fragRed';
    }
    const dom = `<div class="frag ${state}" style='left:${left}px;width:${width}px' name=${index}></div>`;
    return dom;
  }
  creatNav(frag, index) {
    let className = 'btn';
    if (frag.extend.qualityState === '0') {
      className += ' green';
    } else if (frag.extend.qualityState === '1') {
      className += ' red';
    }
    if (frag.extend.change) {
      className += ' yellow';
    }
    const dom = `<li class="${className}" name="${index}" title="${frag.extend.content || ' '}">${index +  1}</li>`;
    return dom;
  }
  renderAdd(frag, index) {
    const dom = this.creatDom(frag, index);
    const nav = this.creatNav(frag, index);
    this.fragDom.innerHTML += dom;
    this.smallNav.innerHTML += nav;
  }
  render() {
    let domAll = '';
    let domNav = '';
    this.formArr.forEach((item, index) => {
      domAll += this.creatDom(item, index);
      domNav += this.creatNav(item, index);
    });
    this.fragDom.innerHTML = domAll;
    this.smallNav.innerHTML = domNav;
  }
}
export default FragHook;
