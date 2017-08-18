class FormController {
  constructor(ee, formInfo) {
    this.formInfo = formInfo;
    this.ee = ee;
    this.formDom = document.getElementById('formInfo');
  }
  bindEvent() {
    this.formDom.addEventListener('click', (e) => {
      console.log(e.target);
    });
  }
}

export default FormController;
