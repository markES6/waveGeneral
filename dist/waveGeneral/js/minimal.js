const playlist = WaveGeneral.init({
  name: 'demo1',
  samplesPerPixel: 750,
  waveHeight: 500,
  container: document.getElementById('wavelist'),
  saveFun: (info) => {
    console.log(info);
  },
  markInfo: { operationCase: 1 },
  markData : [{"start":1.870748299319728,"end":4.2687074829931975,"title":"","extend":{"formValue":[],"change":true,"form1":"9879465","form2":"54165123","qualityState":"1","errorInfo":"","errorsMessage":"3333"}},{"start":6.224489795918367,"end":8.945578231292517,"title":"","extend":{"formValue":[],"change":true,"form1":"55555","form2":"6549879","qualityState":"0","errorInfo":"","errorsMessage":""}},{"start":9.931972789115646,"end":10.884353741496598,"title":"","extend":{"formValue":[],"form1":"2222","form2":""}},{"start":11.649659863945578,"end":12.227891156462585,"title":"","extend":{"formValue":[],"form1":"33333","form2":""}}],
  typeArr: [{ type: 'input', sort: 'form1', title: '标题', option: '' },{ type: 'textarea', sort: 'form2', title: '标题2', option: '' }],
  errorInfo: { type: 'checkbox', sort: 'errorInfo', title: '标题', option: ['测试1', '测试2', '测试3'] },
  timescale: true,
  canMove: true,
});
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
]);
$(() => {
  $('#demo').click(() => {
    playlist.demo();
  });
  $('#play').click(() => {
    playlist.play();
  });
  $('#pause').click(() => {
    playlist.pause();
  });
  $('#stop').click(() => {
    playlist.stop();
    document.getElementById('play').style.display = 'block';
  });
  $('#scope').click(() => {
    playlist.play(3, 3);
  });
  $('#cycle').click(() => {
    playlist.setCycle(false);
  });
  $('#save').click(() => {
    playlist.saveAddlastForm();
    console.log(JSON.stringify(playlist.saveLocalStorage()));
  });
});
