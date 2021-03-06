// 渲染截取框
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
    }else if (frag.extend.qualityState === '2') {
      state = 'fragOrange';
    }
    const titles = "开始时间："+start.toFixed(2)+"结束时间："+end.toFixed(2)+"共："+(end-start).toFixed(2)+"秒"
    const dom = `<div class="frag ${state}" style='left:${left}px;width:${width}px' 
    title=${titles} name=${index}></div>`;
    return dom;
  }
  creatNav(frag, index) {
    let className = 'btn';
    if (frag.extend.qualityState === '0') {
      className += ' green';
    } else if (frag.extend.qualityState === '1') {
      className += ' red';
    }else if (frag.extend.qualityState === '2') {
      className += ' orange';
    }
    if (frag.extend.change) {
      className += ' yellow';
    }
    const dom = `<li class="${className}" name="${index}" title="${'   '+frag.extend.content || ' '}">${index +  1}</li>`;
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
