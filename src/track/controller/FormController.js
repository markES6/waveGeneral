class FormController {
  constructor(ee, formInfo) {
    this.formInfo = formInfo;
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
    console.log(type);
    let values = '';
    let name = '';
    switch (type) {
      case 'text':
        values = formDom.value;
        name = formDom.name;
        break;
      case 'select-one':
        values = formDom.options[formDom.selectedIndex].value;
        name = formDom.name;
        break;
      case 'checkbox':
        console.log(formDom);
        break;
      default:
        break;
    }
    return { value: values, sort: name };
  }
  setClassName(index) {
    this.clearClassName();
    document.getElementsByClassName('form-group')[index].className = 'form-group form-selected';
  }
  clearClassName() {
    const frag = document.getElementsByClassName('form-group');
    for (let i = 0; i < frag.length; i++) {
      frag[i].className = 'form-group';
    }
  }
  bindEvent() {
    this.formDom.addEventListener('click', (e) => {
      const name = e.target.getAttribute('name');
      const group = this.getIndex(e.target);
      const index = group.getAttribute('name');
      this.setClassName(index);
      if (name === 'close' && this.selected === index) {
        this.ee.emit('deleteFrag', index);
      }
      this.selected = index;
    });
    this.formDom.addEventListener('mouseleave', (e) => {
      const formSlected = this.formDom.getElementsByClassName('form-selected')[0];
      if (!formSlected) {
        return;
      }
      const listDom = formSlected.getElementsByClassName('form-content');
      for (let i = 0; i < listDom.length; i++) {
        console.log(this.getValue(listDom[i].getElementsByClassName('formValue')[0]));
      }
    });
  }
}

export default FormController;
