class OtherController {
  constructor(ee) {
    this.ee = ee;
    this.smallNav = document.getElementById('smallNav');
    this.navList = document.getElementById('navList');
    this.playBig = document.getElementsByClassName('playBig')[0];
    this.playBotton = this.playBig.getElementsByClassName('playBtton')[0];
    this.pauseBtton = this.playBig.getElementsByClassName('pauseBtton')[0];
  }
  bindEvent() {
    const next = this.smallNav.getElementsByClassName('btn')[0];
    const pre = this.smallNav.getElementsByClassName('btn')[1];
    pre.addEventListener('click', (e) => {
      e.stopPropagation();
      this.navList.style.left = `${parseInt(this.navList.style.left || 0) - 95}%`;
    });
    next.addEventListener('click', (e) => {
      e.stopPropagation();
      const left = parseInt(this.navList.style.left) || 0;
      if (left >= -95) {
        this.navList.style.left = '0%';
      } else {
        this.navList.style.left = `${left + 95}%`;
      }
    });
    this.playBotton.addEventListener('click', (e) => {
      this.playBotton.style.display = 'none';
      this.pauseBtton.style.display = 'block';
      this.ee.emit('play');
    })
    this.pauseBtton.addEventListener('click', (e) => {
      this.playBotton.style.display = 'block';
      this.pauseBtton.style.display = 'none';
      this.ee.emit('pause');
    })
  }
}
export default OtherController;
