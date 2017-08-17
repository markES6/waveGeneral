import { secondsToPixels } from '../utils/conversions';

class FromHook {
  constructor(typeArr, formInfo, samplesPerPixel, sampleRate, ee) {
    this.typeArr = typeArr;
    this.formInfo = formInfo;
    this.samplesPerPixel = samplesPerPixel;
    this.sampleRate = sampleRate;
    this.ee = ee;


    this.formDom = document.getElementById('formInfo');
  }
  renderInput(item, index) {
    const left = secondsToPixels(item.start, this.samplesPerPixel, this.sampleRate);
    const inputDom = `<div class="form-group" style="left:${left}px">
            <div class="form-title"><h1>${index}</h1><h2>X</h2></div>
            <div class="form-content"><p>标注内容:</p><input type="text" value=${item.title}></div>
          </div>`;
    return inputDom;
  }
  creatDom(formItem, index) {
    let formContent = '';
    this.typeArr.forEach((typeItem) => {
      switch (typeItem) {
        case 'input':
          formContent += this.renderInput(formItem, index);
          break;
        default:
          break;
      }
    });
    return formContent;
  }
  renderAdd(form, index) {
    const formContent = this.creatDom(form, index);
    this.formDom.innerHTML += formContent;
  }
  render() {
    let formContent = '';
    this.formInfo.forEach((formItem, index) => {
      formContent += this.creatDom(formItem, index);
    });
    this.formDom.innerHTML = '';
    this.formDom.innerHTML = formContent;
  }
}

export default FromHook;
