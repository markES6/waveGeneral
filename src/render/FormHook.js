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
  renderInput(item, typeInfo) {
    const inputDom = `<div class="form-content"><p>${typeInfo.title}:</p><input type="text" value=${item.title}></div>`;
    return inputDom;
  }
  renderCheckbox(item, typeInfo, index) {
    let listDom = '';
    typeInfo.option.forEach((name) => {
      listDom += `<li>
                    <input type="checkbox" name="checkbox-${index}">
                    <label>${name}</label>
                  </li>
                `;
    });
    const checkboxDom = `<div class="form-content"><p>${typeInfo.title}:</p>
                          <ul class="cd-form-list">
                            ${listDom}
                          </ul>
                        </div>`;
    return checkboxDom;
  }
  renderRadio(item, typeInfo, index) {
    let listDom = '';
    typeInfo.option.forEach((name) => {
      listDom += `<li>
                    <input type="radio" name="radio-${index}" checked>
                    <label>${name}</label>
                  </li>
                `;
    });
    const radioDom = `<div class="form-content"><p>${typeInfo.title}:</p>
                          <ul class="cd-form-list">
                            ${listDom}
                          </ul>
                        </div>`;
    return radioDom;
  }
  creatDom(formItem, index) {
    const left = secondsToPixels(formItem.start, this.samplesPerPixel, this.sampleRate);
    let formContent = '';
    this.typeArr.forEach((typeItem) => {
      switch (typeItem.type) {
        case 'input':
          formContent += this.renderInput(formItem, typeItem);
          break;
        case 'checkbox':
          formContent += this.renderCheckbox(formItem, typeItem);
          break;
        case 'radio':
          formContent += this.renderRadio(formItem, typeItem, index);
          break;
        default:
          break;
      }
    });
    return `<div class="form-group" style="left:${left}px" name="${index}">
            <div class="form-title"><h1>${index}</h1><h2 name="close">X</h2></div>
            ${formContent}
            </div>`;
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
