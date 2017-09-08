import { pixelsToSeconds, secondsToPixels } from '../../utils/conversions';

class FragController {
  constructor(ee, fragId, formInfo, samplesPerPixel, sampleRate) {
    this.ee = ee;
    this.fragId = fragId;
    this.formInfo = formInfo;
    this.samplesPerPixel = samplesPerPixel;
    this.sampleRate = sampleRate;
    this.shortFrag = document.getElementById('shortFrag');

    this.downPoint = null;
    this.creatDom = false;
    this.selected = false;
    this.hitPoint = false;
    this.changeFrag = null;
  }
  setSamples(samplesPerPixel, sampleRate) {
    this.samplesPerPixel = samplesPerPixel;
    this.sampleRate = sampleRate;
  }
  bindEvent() {
    // oncontextmenu
    this.fragId.addEventListener('contextmenu', (e) => {
      this.rightEvent(e);
      e.preventDefault();
    });
    this.fragId.addEventListener('mousedown', (e) => {
      // 选中状态
      if (e.which === 1) {
        if (this.selected) {
          this.downRightEvent(e);
          return;
        }
        this.downEvent(e);
      }
    });
    this.fragId.addEventListener('mousemove', (e) => {
      // 选中状态
      if (this.selected) {
        this.moveRightEvent(e);
        return;
      }
      if (this.downPoint) {
        this.moveEvent(e);
      }
    });
    this.fragId.addEventListener('mouseup', (e) => {
      // 选中状态
      if (e.which === 3) { return; }
      if (this.selected) {
        this.upRightEvent();
        return;
      }
      if (this.creatDom) {
        this.upEventCreat(e);
      } else {
        this.upEventPlay(e);
      }
      this.shortFrag.style.display = 'none';
      this.downPoint = null;
      this.creatDom = false;
    });
    this.fragId.addEventListener('mouseleave', (e) => {
      if (e.which === 3) { return; }
      // if (this.selected) {
      //   this.upRightEvent();
      //   return;
      // }
      if (this.creatDom) {
        this.upEventCreat(e);
      }
      this.shortFrag.style.display = 'none';
      this.downPoint = null;
      this.creatDom = false;
    });
  }
  getAttrName(e) {
    const name = e.target.getAttribute('name');
    return name;
  }
  setClassName(e) {
    this.clearClassName();
    e.target.className = `${e.target.className} fragSelected`;
  }
  clearClassName() {
    const frag = document.getElementsByClassName('frag');
    for (let i = 0; i < frag.length; i++) {
      frag[i].className = frag[i].className.replace('fragSelected');
    }
  }
  getMouseLeft(e) {
    const canvasLeft = this.fragId.getBoundingClientRect().left;
    const mouseLeft = e.clientX;
    const playWidth = mouseLeft - parseInt(canvasLeft);
    return playWidth;
  }
  getHitPoint(e) {
    const canvasLeft = this.fragId.getBoundingClientRect().left;
    const selected = this.formInfo[this.selected];
    const mouseLeft = pixelsToSeconds(e.clientX - parseInt(canvasLeft), this.samplesPerPixel, this.sampleRate);
    let pointSlected = false;
    if (selected.end - 0.1 < mouseLeft && selected.end + 0.1 > mouseLeft) {
      pointSlected = 'end';
    } else if (selected.start - 0.1 < mouseLeft && selected.start + 0.1 > mouseLeft) {
      pointSlected = 'start';
    }
    return pointSlected;
  }
  setShortFrag(playWidth) {
    const left = Math.min(playWidth, this.downPoint);
    const right = Math.max(playWidth, this.downPoint);
    const width = right - left;
    this.shortFrag.style.display = 'block';
    this.shortFrag.style.left = `${left}px`;
    this.shortFrag.style.width = `${width}px`;
  }
  pointStart(Point, out) {
    let setUp = true;
    const points = pixelsToSeconds(Point, this.samplesPerPixel, this.sampleRate);
    this.formInfo.forEach((item, index) => {
      if ((points > item.start && points < item.end) && parseInt(out) !== index) {
        setUp = false;
      }
    });
    return setUp;
  }
  pointEnd(Point) {
    const point1 = pixelsToSeconds(this.downPoint, this.samplesPerPixel, this.sampleRate);
    let point2 = pixelsToSeconds(Point, this.samplesPerPixel, this.sampleRate);
    this.formInfo.forEach((item) => {
      if (point1 < point2 && point1 < item.start && point2 >= item.start) {
        point2 = item.start;
      } else if (point1 > point2 && point1 > item.end && point2 <= item.end) {
        point2 = item.end;
      }
    });
    return secondsToPixels(point2, this.samplesPerPixel, this.sampleRate);
  }
  downEvent(e) {
    const playWidth = this.getMouseLeft(e);
    if (this.pointStart(playWidth)) {
      this.downPoint = playWidth;
    }
  }
  moveEvent(e) {
    const upPoint = this.pointEnd(this.getMouseLeft(e));
    const moveWidth = upPoint - this.downPoint;
    if (moveWidth > 5 || moveWidth < -5) {
      this.setShortFrag(upPoint);
      this.creatDom = true;
    }
  }
  upEventPlay(e) {
    const name = this.getAttrName(e);
    this.downPoint = null;
    if (name === 'waveFrag') {
      const upPoint = this.getMouseLeft(e);
      const start = pixelsToSeconds(upPoint, this.samplesPerPixel, this.sampleRate);
      this.ee.emit('play', start);
    } else {
      this.ee.emit('selectdFrag', name);
      this.ee.emit('playFrag', name);
    }
  }
  upEventCreat(e) {
    const upPoint = this.pointEnd(this.getMouseLeft(e));
    const start = Math.min(upPoint, this.downPoint);
    const end = Math.max(upPoint, this.downPoint);
    const frag = {
      start: pixelsToSeconds(start, this.samplesPerPixel, this.sampleRate),
      end: pixelsToSeconds(end, this.samplesPerPixel, this.sampleRate),
      title: '',
      extend: {},
    };
    this.formInfo.push(frag);
    this.ee.emit('addFrag', this.formInfo);
  }

  rightEvent(e) {
    const name = this.getAttrName(e);
    if (name !== 'waveFrag') {
      this.selected = name;
      this.setClassName(e);
      this.ee.emit('selectdFrag', name);
      this.ee.emit('pause');
    }
  }
  downRightEvent(e) {
    const name = this.getAttrName(e);
    this.hitPoint = this.getHitPoint(e);
    this.movePoint = e.clientX;
    if (name === this.selected || this.hitPoint) {
      // this.selected = name;
      // console.log(this.hitPoint);
    } else {
      this.selected = null;
      this.clearClassName();
    }
  }
  moveRightEvent(e) {
    const selectedDom = document.getElementsByClassName('fragSelected')[0];
    let left;
    let width;
    if (this.movePoint) {
      if (this.hitPoint) {
        if (this.hitPoint === 'end') {
          left = window.parseInt(selectedDom.style.left);
          width = window.parseInt(selectedDom.style.width) + e.movementX;
        } else if (this.hitPoint === 'start') {
          left = window.parseInt(selectedDom.style.left) + e.movementX;
          width = window.parseInt(selectedDom.style.width) - e.movementX;
        }
      } else {
        left = window.parseInt(selectedDom.style.left) + e.movementX;
        width = window.parseInt(selectedDom.style.width);
      }
    }
    if (this.pointStart(left, this.selected) && this.pointStart(left + width, this.selected)) {
      selectedDom.style.left = `${left}px`;
      selectedDom.style.width = `${width}px`;
    }
    const starts = pixelsToSeconds(left, this.samplesPerPixel, this.sampleRate);
    const ends = pixelsToSeconds(left + width, this.samplesPerPixel, this.sampleRate);
    const index = selectedDom.getAttribute('name');
    this.changeFrag = { start: starts, end: ends, title: this.formInfo[index].title, extend: this.formInfo[index].extend };
  }
  upRightEvent() {
    if (this.changeFrag) {
      this.ee.emit('changeFrag', this.changeFrag, this.selected);
    }
    this.movePoint = false;
    this.hitPoint = false;
  }
}

export default FragController;
