import { secondsToPixels } from '../utils/conversions';

class FromHook {
  constructor(typeArr, errorInfo, formInfo, samplesPerPixel, sampleRate, ee, markInfo = {}) {
    this.typeArr = typeArr;
    this.errorInfo = errorInfo;
    this.formInfo = formInfo;
    this.markInfo = markInfo;
    this.samplesPerPixel = samplesPerPixel;
    this.sampleRate = sampleRate;
    this.ee = ee;


    this.formDom = document.getElementById('formInfo');
  }
  renderInput(item, typeInfo, state) {
    const checkValue = item.extend[typeInfo.sort] || '';
    const inputDom = `<div class="form-content" style="display:${state}"><p>${typeInfo.title}:</p><input type="text" value="${checkValue}" class="formValue" name="${typeInfo.sort}"></div>`;
    return inputDom;
  }
  renderCheckbox(item, typeInfo, index, state) {
    let listDom = '';
    let checkValue = item.extend[typeInfo.sort] || [];
    if (typeof checkValue === 'string') {
      checkValue = checkValue.split(',');
    }
    typeInfo.option.forEach((name, indexT) => {
      let checked = '';
      checkValue.forEach((check) => {
        if (check === `${indexT}`) {
          checked = 'checked';
        }
      });
      listDom += `<li>
                    <input type="checkbox" name="checkbox-${index}" value='${indexT}' ${checked}>
                    <label>${name}</label>
                  </li>
                `;
    });
    const checkboxDom = `<div class="form-content" style="display:${state}"><p>${typeInfo.title}:</p> 
                          <ul class="cd-form-list formValue" name="${typeInfo.sort}" type="checkbox">
                            ${listDom}
                          </ul>
                        </div>`;
    return checkboxDom;
  }
  renderRadio(item, typeInfo, index) {
    let listDom = '';
    const checkValue = item.extend[typeInfo.sort] || '';
    typeInfo.option.forEach((name, indexT) => {
      const checked = checkValue === `${indexT}` ? 'checked' : '';
      listDom += `<li>
                    <input type="radio" name="radio-${index}" value="${indexT}" ${checked}>
                    <label>${name}</label>
                  </li>
                `;
    });
    const radioDom = `<div class="form-content" name="${typeInfo.sort}"><p>${typeInfo.title}:</p>
                          <ul class="cd-form-list formValue" type="radio" name="${typeInfo.sort}">
                            ${listDom}
                          </ul>
                        </div>`;
    return radioDom;
  }
  renderSelect(item, typeInfo) {
    let listDom = '';
    const checkValue = item.extend[typeInfo.sort] || '';
    typeInfo.option.forEach((name, indexT) => {
      const checked = checkValue === `${indexT}` ? 'selected' : '';
      listDom += `<option value=${indexT} ${checked}>${name}</option>`;
    });
    const selectDom = `<div class="form-content"><p>${typeInfo.title}:</p>
                          <p class="cd-select icon">
                            <select class="formValue" name="${typeInfo.sort}">
                             ${listDom}
                            </select>
                         </p>
                      </div>`;
    return selectDom;
  }
  qualityRender(formItem, errorInfo, index) {
    const state = formItem.extend.qualityState == '0' ? 'none' : 'block';
    const qualityType = { type: 'radio', sort: 'qualityState', title: 'State', option: ['合格', '不合格'] };
    const errorType = { type: 'input', sort: 'errorsMessage', title: 'ErrMessage'};
    let qualityState = this.renderRadio(formItem, qualityType, `qualityState${index}`);
    let errorsState = this.renderCheckbox(formItem, errorInfo, `errorsState${index}`, state);
    let errorsMessage = this.renderInput(formItem, errorType, state);
    if (this.markInfo.operationCase == 2 || this.markInfo.operationCase == 1) {
      let checkValue = formItem.extend.errorInfo || '';
      let errorValue = '';
      if (typeof checkValue === 'string') {
        checkValue = checkValue.split(',');
      }
      checkValue.forEach((item) => {
        errorValue += `${errorInfo.option[item] || ''},`;
      });
      const errorMes = formItem.extend.errorsMessage || '';
      qualityState = `<div><p>状态:</p><span>${qualityType.option[formItem.extend.qualityState] || ''}</span></div>`;
      errorsState = `<div><p>错误信息:</p><span>${errorValue}</span></div>`;
      errorsMessage = `<div><p>错误信息:</p><span>${errorMes}</span></div>`;
    }
    const qualityDom = `<div class="quality-content">
                          ${qualityState}
                          ${errorsState}
                          ${errorsMessage}
                        </div>`;
    return qualityDom;
  }
  creatDom(formItem, index) {
    const left = secondsToPixels(formItem.start, this.samplesPerPixel, this.sampleRate);
    let formContent = '';
    const qualityDom =  this.qualityRender(formItem, this.errorInfo, index);
    this.typeArr.forEach((typeItem) => {
      switch (typeItem.type) {
        case 'input':
          formContent += this.renderInput(formItem, typeItem);
          break;
        case 'checkbox':
          formContent += this.renderCheckbox(formItem, typeItem, index);
          break;
        case 'radio':
          formContent += this.renderRadio(formItem, typeItem, index);
          break;
        case 'select':
          formContent += this.renderSelect(formItem, typeItem);
          break;
        default:
          break;
      }
    });
    return `<div class="form-group" style="left:${left}px" name="${index}">
            <div class="form-title"><h1>${index}</h1><h2 name="close">X</h2></div>
            ${formContent}
            ${qualityDom}
            </div>`;
  }
  renderAdd(form) {
    this.formInfo = form;
    this.render();
    // let formContent = '';
    // this.formInfo.forEach((formItem, index) => {
    //   formContent += this.creatDom(formItem, index);
    // });
    // formContent += this.creatDom(form, indexs);
    // this.formDom.innerHTML = formContent;
  }
  render() {
    this.ee.emit('saveFun', this.formInfo);
    let formContent = '';
    this.formInfo.forEach((formItem, index) => {
      formContent += this.creatDom(formItem, index);
    });
    this.formDom.innerHTML = '';
    this.formDom.innerHTML = formContent;
  }
}

export default FromHook;
