class FragController {
  constructor(ee, fragId) {
    this.ee = ee;
    this.fragId = fragId;
  }
  bindEvent() {
    // this.removeEvent(fragId);
    this.fragId.addEventListener('mouseup', (e) => {
      const index = e.target.getAttribute('name');
      this.ee.emit('playFrag', index);
    });
    this.fragId.addEventListener('ondblclick', (e) => {
      const index = e.target.getAttribute('name');
      this.ee.emit('playFrag', index);
    });
  }
}

export default FragController;
