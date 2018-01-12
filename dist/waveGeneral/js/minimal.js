const playlist = WaveGeneral.init({
  name: 'demo1',
  samplesPerPixel: 750,
  waveHeight: 500,
  container: document.getElementById('wavelist'),
  saveFun: function (info) {
  },
  beforeCreate: function (frag) {
    let maxEnd = 0
    for (let i = 0; i < this.formInfo.length; i++) {
      if (frag.start > this.formInfo[i].end && this.formInfo[i].end > maxEnd) {
        maxEnd = this.formInfo[i].end
      }
    }
    frag.start = maxEnd
    return frag
  },
  markInfo: { operationCase: 1 },
  typeArr: [{ type: 'input', sort: 'form1', title: '标题', option: '' },{ type: 'textarea', sort: 'form2', title: '标题2', option: '' }],
  errorInfo: { type: 'checkbox', sort: 'errorInfo', title: '标题', option: ['测试1', '测试2', '测试3'] },
  timescale: true,
  canMove: true,
})
playlist.load([
  {
    src: 'media/audio/0.wav',
    name: 'Guitar',
  }, {
    src: 'media/audio/1.wav',
    name: 'Guitar',
  }, {
    src: 'media/audio/2.wav',
    name: 'Guitar',
  }, {
    src: 'media/audio/3.wav',
    name: 'Guitar',
  }
  //}, {
  //   src: 'media/audio/4.wav',
  //   name: 'Guitar',
  //   start: 0,
  //   fadeOut: {
  //     shape: 'linear',
  //     duration: 0.5,
  //   },
  //   cuein: 0,
  // }, {
  //   src: 'media/audio/5.wav',
  //   name: 'Guitar',
  //   start: 0,
  //   fadeOut: {
  //     shape: 'linear',
  //     duration: 0.5,
  //   },
  //   cuein: 0,
  // }, {
  //   src: 'media/audio/6.wav',
  //   name: 'Guitar',
  //   start: 0,
  //   fadeOut: {
  //     shape: 'linear',
  //     duration: 0.5,
  //   },
  //   cuein: 0,
  // }, {
  //   src: 'media/audio/7.wav',
  //   name: 'Guitar',
  //   start: 0,
  //   fadeOut: {
  //     shape: 'linear',
  //     duration: 0.5,
  //   },
  //   cuein: 0,
  // }, {
  //   src: 'media/audio/8.wav',
  //   name: 'Guitar',
  //   start: 0,
  //   fadeOut: {
  //     shape: 'linear',
  //     duration: 0.5,
  //   },
  //   cuein: 0,
  // }, {
  //   src: 'media/audio/9.wav',
  //   name: 'Guitar',
  //   start: 0,
  //   fadeOut: {
  //     shape: 'linear',
  //     duration: 0.5,
  //   },
  //   cuein: 0,
  // }, {
  //   src: 'media/audio/10.wav',
  //   name: 'Guitar',
  //   start: 0,
  //   fadeOut: {
  //     shape: 'linear',
  //     duration: 0.5,
  //   },
  //   cuein: 0,
  // }, {
  //   src: 'media/audio/11.wav',
  //   name: 'Guitar',
  //   start: 0,
  //   fadeOut: {
  //     shape: 'linear',
  //     duration: 0.5,
  //   },
  //   cuein: 0,
  // }, {
  //   src: 'media/audio/12.wav',
  //   name: 'Guitar',
  //   start: 0,
  //   fadeOut: {
  //     shape: 'linear',
  //     duration: 0.5,
  //   },
  //   cuein: 0,
  // }, {
  //   src: 'media/audio/13.wav',
  //   name: 'Guitar',
  //   start: 0,
  //   fadeOut: {
  //     shape: 'linear',
  //     duration: 0.5,
  //   },
  //   cuein: 0,
  // },
])
playlist.setCycle(false)
$(() => {
  $('#demo').click(() => {
    playlist.demo()
  })
  $('#play').click(() => {
    playlist.play()
  })
  $('#pause').click(() => {
    playlist.pause()
  })
  $('#stop').click(() => {
    playlist.stop()
    document.getElementById('play').style.display = 'block'
  })
  $('#scope').click(() => {
    playlist.play(3, 3)
  })
  $('#cycle').click(() => {
    playlist.setCycle(false)
  })
  $('#save').click(() => {
    playlist.saveAddlastForm()
    console.log(playlist.saveLocalStorage())
  })
})
