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
    this.formDom.addEventListener('blur', (e) => {
      console.log(e);
    });
  }
}

export default FormController;
