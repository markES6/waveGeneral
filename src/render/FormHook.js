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
    const checkValue = item.extend[typeInfo.sort] || '';
    const inputDom = `<div class="form-content"><p>${typeInfo.title}:</p><input type="text" value="${checkValue}" class="formValue" name="${typeInfo.sort}"></div>`;
    return inputDom;
  }
  renderCheckbox(item, typeInfo, index) {
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
    const checkboxDom = `<div class="form-content" ><p>${typeInfo.title}:</p> 
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
    const qualityType = { type: 'radio', sort: 'qualityState', title: 'State', option: ['合格', '不合格'] };
    const qualityState = this.renderRadio(formItem, qualityType, `qualityState${index}`);
    const errorsState = this.renderCheckbox(formItem, errorInfo, `errorsState${index}`);
    const qualityDom = `<div class="quality-content">
                          ${qualityState}
                          ${errorsState}
                        </div>`;
    return qualityDom;
  }
  creatDom(formItem, index) {
    const errorInfo = { type: 'checkbox', sort: 'errorInfo', title: 'errorInfo', option: ['错误1', '错误2', '错误3'] };
    const left = secondsToPixels(formItem.start, this.samplesPerPixel, this.sampleRate);
    let formContent = '';
    const qualityDom =  this.qualityRender(formItem, errorInfo, index);
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
