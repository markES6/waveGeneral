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
  }
  setSamples(samplesPerPixel, sampleRate) {
    this.samplesPerPixel = samplesPerPixel;
    this.sampleRate = sampleRate;
  }
  bindEvent() {
    // oncontextmenu
    this.fragId.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    this.fragId.addEventListener('mousedown', (e) => {
      if (e.which === 1) {
        this.downEvent(e);
      }
    });
    this.fragId.addEventListener('mousemove', (e) => {
      if (this.downPoint) {
        this.moveEvent(e);
      }
    });
    this.fragId.addEventListener('mouseup', (e) => {
      if (e.which === 3) { return; }
      if (this.creatDom) {
        this.upEventCreat(e);
      } else {
        this.upEventPlay(e);
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
  getMouseLeft(e) {
    const canvasLeft = this.fragId.getBoundingClientRect().left;
    const mouseLeft = e.clientX;
    const playWidth = mouseLeft - canvasLeft;
    return playWidth;
  }
  setShortFrag(playWidth) {
    const left = Math.min(playWidth, this.downPoint);
    const right = Math.max(playWidth, this.downPoint);
    const width = right - left;
    this.shortFrag.style.display = 'block';
    this.shortFrag.style.left =  left + 'px';
    this.shortFrag.style.width = width + 'px';
  }
  selectedStart(Point) {
    let setUp = true;
    const points = pixelsToSeconds(Point, this.samplesPerPixel, this.sampleRate);
    this.formInfo.forEach((item) => {
      if (points > item.start && points < item.end) {
        setUp = false;
      }
    });
    return setUp;
  }
  selectedEnd(Point) {
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
    if (this.selectedStart(playWidth)) {
      this.downPoint = playWidth;
    }
  }
  moveEvent(e) {
    const upPoint = this.selectedEnd(this.getMouseLeft(e));
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
      this.ee.emit('playFrag', name);
    }
  }
  upEventCreat(e) {
    const upPoint = this.selectedEnd(this.getMouseLeft(e));
    const start = Math.min(upPoint, this.downPoint);
    const end = Math.max(upPoint, this.downPoint);
    const frag = {
      start: pixelsToSeconds(start, this.samplesPerPixel, this.sampleRate),
      end: pixelsToSeconds(end, this.samplesPerPixel, this.sampleRate),
    };
    this.formInfo.push(frag);
    this.ee.emit('addFrag', frag);
  }
}

export default FragController;
