import { pixelsToSeconds, secondsToPixels } from '../../utils/conversions'

class FragController {
  constructor(ee, fragId, formInfo, samplesPerPixel, sampleRate, canmove) {
    this.ee = ee
    this.fragId = fragId
    this.formInfo = formInfo
    this.samplesPerPixel = samplesPerPixel
    this.sampleRate = sampleRate
    this.shortFrag = document.getElementById('shortFrag')
    this.mouseE
    this.canMove = canmove
    this.moveEditbefore = false
    this.moveEditing = false

    this.downPoint = null
    this.creatDom = false
    this.selected = false
    this.hitPoint = false
    this.changeFrag = null
  }
  setSamples(samplesPerPixel, sampleRate) {
    this.samplesPerPixel = samplesPerPixel
    this.sampleRate = sampleRate
  }
  setAllTime(allTime) {
    this.allTime = allTime
  }
  setForminfo(formInfo) {
    this.formInfo = formInfo
  }
  setSelected(selected) {
    this.selected = selected
  }
  bindEvent() {
    // oncontextmenu
    this.fragId.addEventListener('contextmenu', (e) => {
      e.stopPropagation()
      e.preventDefault()
      this.rightEvent(e)
    })
    this.ee.on('rightEvent', (e) => {
      e.stopPropagation()
      e.preventDefault()
      this.rightEvent(this.mouseE)
    })
    this.fragId.addEventListener('mousedown', (e) => {
      // 选中状态
      // e.stopPropagation()
      // e.preventDefault()
      this.moveEditbefore = this.moveEdit(e)
      if (e.which === 1) {
        if (this.selected) {
          this.downRightEvent(e)
          return
        } else if (this.moveEditbefore[0]) {
          this.moveEditing = true
          return
        }
        this.downEvent(e)
      }
    })
    this.fragId.addEventListener('mousemove', (e) => {
      this.mouseE = e
      // 选中状态
      e.stopPropagation()
      e.preventDefault()
      this.moveEdit(e)
      if (this.selected) {
        this.moveRightEvent(e)
        return
      } else if (this.moveEditing) {
        this.editMoveEvent(e)
        return
      }
      if (this.downPoint) {
        this.moveEvent(e)
      }
    })
    this.fragId.addEventListener('mouseup', (e) => {
      // 选中状态
      e.stopPropagation()
      e.preventDefault()
      if (e.which === 3) { return }
      if (this.selected) {
        this.upRightEvent()
        return
      } else if (this.moveEditing) {
        this.upRightEvent()
        this.moveEditing = false
        this.moveEditbefore = false
        return
      }
      if (this.creatDom) {
        this.upEventCreat(e)
      } else {
        this.upEventPlay(e)
      }
      this.shortFrag.style.display = 'none'
      this.downPoint = null
      this.creatDom = false
    })
    this.fragId.addEventListener('mouseleave', (e) => {
      e.stopPropagation()
      e.preventDefault()
      if (e.which === 3) { return }
      // if (this.selected) {
      //   this.upRightEvent()
      //   return
      // }
      if (this.creatDom) {
        this.upEventCreat(e)
      }
      if (this.moveEditing) {
        this.upRightEvent()
        this.moveEditing = false
        this.moveEditbefore = false
        return
      }
      this.shortFrag.style.display = 'none'
      this.downPoint = null
      this.creatDom = false
    })
  }
  getAttrName(e) {
    const name = e.target.getAttribute('name')
    return name
  }
  setClassName(e) {
    this.clearClassName()
    e.target.className = `${e.target.className} fragSelected`
  }
  clearClassName() {
    const frag = document.getElementsByClassName('frag')
    for (let i = 0; i < frag.length; i++) {
      frag[i].className = frag[i].className.replace('fragSelected')
    }
  }
  getMouseLeft(e) {
    const canvasLeft = this.fragId.getBoundingClientRect().left
    const mouseLeft = e.clientX
    const playWidth = mouseLeft - parseFloat(canvasLeft)
    return playWidth
  }
  getHitPoint(e) {
    const canvasLeft = this.fragId.getBoundingClientRect().left
    const selected = this.formInfo[this.selected]
    const mouseLeft = pixelsToSeconds(e.clientX - parseFloat(canvasLeft), this.samplesPerPixel, this.sampleRate)
    let pointSlected = false
    if (selected.end - 0.1 < mouseLeft && selected.end + 0.1 > mouseLeft) {
      pointSlected = 'end'
    } else if (selected.start - 0.1 < mouseLeft && selected.start + 0.1 > mouseLeft) {
      pointSlected = 'start'
    }
    return pointSlected
  }
  setShortFrag(playWidth) {
    const left = Math.min(playWidth, this.downPoint)
    const right = Math.max(playWidth, this.downPoint)
    const width = right - left
    this.shortFrag.style.display = 'block'
    this.shortFrag.style.left = `${left}px`
    this.shortFrag.style.width = `${width}px`
  }
  pointStart(Point, out) {
    let setUp = true
    const points = pixelsToSeconds(Point, this.samplesPerPixel, this.sampleRate)
    this.formInfo.forEach((item, index) => {
      if ((points > item.start && points < item.end) && parseInt(out) !== index) {
        setUp = false
      }
      if (points <= 0 || points > this.allTime) {
        setUp = false
      }
    })
    return setUp
  }
  pointEnd(Point) {
    const point1 = pixelsToSeconds(this.downPoint, this.samplesPerPixel, this.sampleRate)
    let point2 = pixelsToSeconds(Point, this.samplesPerPixel, this.sampleRate)
    this.formInfo.forEach((item) => {
      if (point1 < point2 && point1 < item.start && point2 >= item.start) {
        point2 = item.start
      } else if (point1 > point2 && point1 > item.end && point2 <= item.end) {
        point2 = item.end
      }
    })
    if (point2 > this.allTime) {
      point2 = this.allTime
    }
    return secondsToPixels(point2, this.samplesPerPixel, this.sampleRate)
  }
  downEvent(e) {
    const playWidth = this.getMouseLeft(e)
    if (this.pointStart(playWidth)) {
      this.downPoint = playWidth
    }
  }
  moveEvent(e) {
    const upPoint = this.pointEnd(this.getMouseLeft(e))
    const moveWidth = upPoint - this.downPoint
    if (moveWidth > 5 || moveWidth < -5) {
      this.setShortFrag(upPoint)
      this.creatDom = true
    }
  }
  moveEdit(e) {
    const fragList = document.getElementsByClassName('frag')
    const canvasLeft = this.fragId.getBoundingClientRect().left
    const mouseLeft = pixelsToSeconds(e.clientX - parseFloat(canvasLeft), this.samplesPerPixel, this.sampleRate)
    document.getElementById('movePointer').style.left = `${e.clientX - parseFloat(canvasLeft)}px`
    let pointSlected = false
    let index
    for (let i = 0; i < fragList.length; i++) {
      const name = parseInt(fragList[i].getAttribute('name'))
      if (this.formInfo[name].end - 0.1 < mouseLeft && this.formInfo[name].end > mouseLeft) {
        index = name
        pointSlected = 'end'
      } else if (this.formInfo[name].start < mouseLeft && this.formInfo[name].start + 0.1 > mouseLeft) {
        index = name
        pointSlected = 'start'
      }
    }
    if (pointSlected) {
      document.body.style.cursor = 'w-resize'
    } else {
      document.body.style.cursor = 'default'
    }
    return [pointSlected, index]
  }
  upEventPlay(e) {
    const name = this.getAttrName(e)
    this.downPoint = null
    if (name === 'waveFrag') {
      const upPoint = this.getMouseLeft(e)
      const start = pixelsToSeconds(upPoint, this.samplesPerPixel, this.sampleRate)
      this.ee.emit('play', start)
    } else {
      this.ee.emit('selectdFrag', name)
      this.ee.emit('playFrag', name)
    }
  }
  upEventCreat(e) {
    const upPoint = this.pointEnd(this.getMouseLeft(e))
    const start = Math.min(upPoint, this.downPoint)
    const end = pixelsToSeconds(Math.max(upPoint, this.downPoint), this.samplesPerPixel, this.sampleRate)
    const endTime = end >= this.allTime ? this.allTime : end
    const frag = {
      start: pixelsToSeconds(start, this.samplesPerPixel, this.sampleRate),
      end: endTime,
      title: '',
      extend: {},
    }
    this.formInfo.push(this.checkedFrag(frag, -1))
    this.ee.emit('addFrag', this.formInfo)
  }

  rightEvent(e) {
    const name = this.getAttrName(e)
    if (name !== 'waveFrag') {
      this.selected = name
      this.setClassName(e)
      this.ee.emit('selectdFrag', name)
      this.ee.emit('pause')
    }
  }
  downRightEvent(e) {
    const name = this.getAttrName(e)
    this.hitPoint = this.getHitPoint(e)
    this.movePoint = e.clientX
    if (name === this.selected || this.hitPoint) {
      // this.selected = name
      // console.log(this.hitPoint)
    } else {
      this.selected = null
      this.clearClassName()
    }
  }
  editMoveEvent(e) {
    const index = this.moveEditbefore[1]
    const selectedDom = document.getElementsByClassName('frag')[index]
    if (!selectedDom) { return }
    let left
    let width
    if (this.moveEditbefore[0] === 'end') {
      left = window.parseFloat(selectedDom.style.left)
      width = window.parseFloat(selectedDom.style.width) + e.movementX
    } else if (this.moveEditbefore[0] === 'start') {
      left = window.parseFloat(selectedDom.style.left) + e.movementX
      width = window.parseFloat(selectedDom.style.width) - e.movementX
    }
    if (this.pointStart(left, index) && this.pointStart(left + width, index)) {
      selectedDom.style.left = `${left}px`
      selectedDom.style.width = `${width}px`
    }
    const starts = pixelsToSeconds(left, this.samplesPerPixel, this.sampleRate)
    const ends = pixelsToSeconds(left + width, this.samplesPerPixel, this.sampleRate)
    // const newPoint = e.target.getAttribute('name')
    // if (index !== newPoint && newPoint !== 'waveFrag') {
    //   this.upRightEvent()
    //   return
    // }
    this.changeFrag = { start: starts, end: ends, title: this.formInfo[index].title, extend: this.formInfo[index].extend }
  }
  moveRightEvent(e) {
    const selectedDom = document.getElementsByClassName('fragSelected')[0]
    if (!selectedDom) { return }
    let left
    let width
    if (this.getHitPoint(e)) {
      document.body.style.cursor = 'w-resize'
    } else {
      document.body.style.cursor = 'move'
    }
    if (this.movePoint) {
      if (this.hitPoint) {
        if (this.hitPoint === 'end') {
          left = window.parseFloat(selectedDom.style.left)
          width = window.parseFloat(selectedDom.style.width) + e.movementX
        } else if (this.hitPoint === 'start') {
          left = window.parseFloat(selectedDom.style.left) + e.movementX
          width = window.parseFloat(selectedDom.style.width) - e.movementX
        }
      } else if (!this.canMove) {
        left = window.parseFloat(selectedDom.style.left) + e.movementX
        width = window.parseFloat(selectedDom.style.width)
      }
    }
    if (this.pointStart(left, this.selected) && this.pointStart(left + width, this.selected)) {
      selectedDom.style.left = `${left}px`
      selectedDom.style.width = `${width}px`
    }
    const starts = pixelsToSeconds(left, this.samplesPerPixel, this.sampleRate)
    const ends = pixelsToSeconds(left + width, this.samplesPerPixel, this.sampleRate)
    const index = selectedDom.getAttribute('name')
    const newPoint = e.target.getAttribute('name')
    if (index !== newPoint && newPoint !== 'waveFrag') {
      this.upRightEvent()
      return
    }
    this.changeFrag = { start: starts, end: ends, title: this.formInfo[index].title, extend: this.formInfo[index].extend }
  }
  upRightEvent() {
    if (this.changeFrag && !isNaN(this.changeFrag.start)) {
      const selected = this.selected || this.moveEditbefore[1]
      const frag = this.checkedFrag(this.changeFrag, selected)
      this.ee.emit('changeFrag', frag, selected)
      this.formInfo[selected] = this.changeFrag
    }
    this.movePoint = false
    this.hitPoint = false
  }
  checkedFrag(frag, name) {
    this.formInfo.forEach((item, index) => {
      const itemStart = item.start
      const itemEnd = item.end
      if (frag.start > itemStart && frag.start < itemEnd && index !== parseInt(name)) {
        frag.start = itemEnd
      }
      if (frag.end > itemStart && frag.end < itemEnd && index !== parseInt(name)) {
        frag.end = itemStart
      }
    })
    return frag
  }
}

export default FragController
