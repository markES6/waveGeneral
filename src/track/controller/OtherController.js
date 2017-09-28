class OtherController {
  constructor(ee) {
    this.ee = ee;
    this.smallNav = document.getElementById('smallNav');
    this.navList = document.getElementById('navList');
  }
  bindEvent() {
    const next = this.smallNav.getElementsByClassName('btn')[0];
    const pre = this.smallNav.getElementsByClassName('btn')[1];
    pre.addEventListener('click', (e) => {
      e.stopPropagation();
      this.navList.style.left = `${parseInt(this.navList.style.left || 0) - 90}%`;
    });
    next.addEventListener('click', (e) => {
      e.stopPropagation();
      const left = parseInt(this.navList.style.left) || 0;
      if (left >= -90) {
        this.navList.style.left = '0%';
      } else {
        this.navList.style.left = `${left + 90}%`;
      }
    });
  }
}
export default OtherController;
