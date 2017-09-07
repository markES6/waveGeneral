class FormController {
  constructor(ee, formInfo, markInfo) {
    this.formInfo = formInfo;
    this.markInfo = markInfo;
    this.ee = ee;
    this.formDom = document.getElementById('formInfo');
    this.selected = 0;
  }
  getIndex(target) {
    if (target.className === 'form-group' || target.className === 'form-group form-selected') {
      return target;
    } else {
      return this.getIndex(target.offsetParent);
    }
  }
  getValue(formDom) {
    if (!formDom) {
      return;
    }
    const type = formDom.type;
    let values = '';
    const name = formDom.getAttribute('name');
    switch (type) {
      case 'text':
        values = formDom.value;
        break;
      case 'select-one':
        values = formDom.options[formDom.selectedIndex].value;
        break;
      case 'checkbox':
        const checkboxList = formDom.getElementsByTagName('input');
        for (const x in checkboxList) {
          if (checkboxList[x].checked) {
            values += `${checkboxList[x].value},`;
          }
        }
        break;
      case 'radio':
        const radioList = formDom.getElementsByTagName('input');
        for (const x in radioList) {
          if (radioList[x].checked) {
            values = radioList[x].value;
          }
        }
        break;
      default:
        break;
    }
    return [name, values];
  }
  setClassName(index) {
    this.clearClassName();
    document.getElementById('wrap')
    .getElementsByClassName('form-group')[index].className = 'form-group form-selected';
  }
  addFormInfo() {
    const formSlected = this.formDom.getElementsByClassName('form-selected')[0];
    if (!formSlected) {
      return;
    }
    const name = formSlected.getAttribute('name');
    const listDom = formSlected.getElementsByClassName('form-content');
    this.formInfo[name].extend.formValue = [];
    for (let i = 0; i < listDom.length; i++) {
      const formValue = this.getValue(listDom[i].getElementsByClassName('formValue')[0]);
      this.formInfo[name].extend[formValue[0]] = formValue[1];
    }
  }
  clearClassName() {
    const frag = document.getElementsByClassName('form-group');
    for (let i = 0; i < frag.length; i++) {
      frag[i].className = 'form-group';
    }
  }
  bindEvent() {
    this.formDom.addEventListener('click', (e) => {
      const name = e.target.getAttribute('name') || '';
      const group = this.getIndex(e.target);
      const index = group.getAttribute('name');
      this.setClassName(index);
      if (name === 'close' && this.selected === index) {
        this.ee.emit('deleteFrag', index);
      }
      if (name.indexOf('qualityState') >= 0) {
        const errorsState = document.getElementsByClassName('quality-content')[index].getElementsByClassName('form-content')[1];
        const fragDom = document.getElementsByClassName('frag');
        if (e.target.getAttribute('value') === '0') {
          errorsState.style.display = 'none';
          fragDom[index].className = 'frag fragGreen';
        } else if (e.target.getAttribute('value') === '1') {
          errorsState.style.display = 'block';
          fragDom[index].className = 'frag fragRed';
          for (let i = 0; i < errorsState.getElementsByTagName('input').length; i++) {
            errorsState.getElementsByTagName('input')[i].checked = false;
          }
        }
      }
      this.selected = index;
    });
    this.formDom.addEventListener('mouseleave', () => {
      this.addFormInfo();
      this.ee.emit('save', this.formInfo);
    });
  }
}

export default FormController;
