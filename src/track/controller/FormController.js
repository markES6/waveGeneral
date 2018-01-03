class FormController {
  constructor(ee, formInfo, markInfo) {
    this.formInfo = formInfo;
    this.markInfo = markInfo;
    this.ee = ee;
    this.formDom = document.getElementById('formInfo');
    this.selected = 0;
    this.smallNav = document.getElementById('navList');
  }
  setForminfo(formInfo) {
    this.formInfo = formInfo;
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
      case 'textarea':
        values = formDom.value;
        break;
      case 'select-one':
        values = formDom.options[formDom.selectedIndex].value;
        break;
      case 'checkbox':
        const checkboxList = formDom.getElementsByTagName('input');
        for (let i = 0; i < checkboxList.length;i ++) {
          if (checkboxList[i].checked) {
            values += `${checkboxList[i].value},`;
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
    this.formDom.getElementsByClassName('form-selected')[0].onmouseleave = () => {
      this.saveAddForm();
    };
  }
  saveAddForm(){
    this.addFormInfo();
    this.ee.emit('save', this.formInfo);
  }
  addFormInfo() {
    const formSlected = this.formDom.getElementsByClassName('form-selected')[0];
    if (!formSlected) {
      return;
    }
    const name = formSlected.getAttribute('name');
    const listDom = formSlected.getElementsByClassName('form-content');
    this.formInfo[name].extend.formValue = [];
    const operationCase = this.markInfo.operationCase;
    // const operationCase = 32;
    if (operationCase !== 4 && operationCase !== 32 && operationCase !== 128 && operationCase !== 256) {
      const state = formSlected.getElementsByClassName('quality-content')[0].getElementsByTagName('span')[0].innerHTML;
      if (state === '不合格' || state === '合格') {
        this.formInfo[name].extend.change = true;
      }
    } else {
      this.formInfo[name].extend.change = false;
    }
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
        console.log(index);
        this.ee.emit('deleteFrag', index);
      }
      if (name.indexOf('qualityState') >= 0) {
        const errorsState = document.getElementsByClassName('quality-content')[index].getElementsByClassName('form-content')[1];
        const errorsState2 = document.getElementsByClassName('quality-content')[index].getElementsByClassName('form-content')[2];
        const fragDom = document.getElementsByClassName('frag');
        if (e.target.getAttribute('value') === '0') {
          errorsState.style.display = 'none';
          errorsState2.style.display = 'none';
          fragDom[index].className = 'frag fragGreen';
          this.smallNav.getElementsByTagName('li')[index].className = 'btn green';
        } else if (e.target.getAttribute('value') === '1') {
          errorsState.style.display = 'block';
          errorsState2.style.display = 'block';
          fragDom[index].className = 'frag fragRed';
          this.smallNav.getElementsByTagName('li')[index].className = 'btn red';
          for (let i = 0; i < errorsState.getElementsByTagName('input').length; i++) {
            errorsState.getElementsByTagName('input')[i].checked = false;
          }
        }
      }
      this.selected = index;
    });
    this.formDom.onkeydown = (e) => {
      switch (e.keyCode) {
        case 32:
          e.stopPropagation();
          break;
        case 82:
          e.stopPropagation();
          break;
        default:
          break;
      }
    };
    // this.formDom.addEventListener('mouseleave', (e) => {
    //   console.log(e.target);
    //   // console.log(111)
    //   this.addFormInfo();
    //   this.ee.emit('save', this.formInfo);
    // });
    this.smallNav.addEventListener('click', (e) => {
      const name = e.target.getAttribute('name') || '';
      this.ee.emit('selectdFrag', name);
      this.ee.emit('playFrag', name);
    });
  }
}

export default FormController;
