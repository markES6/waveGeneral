const playlist = WaveGeneral.init({
  name: 'demo2',
  container: document.getElementById('wavelist'),
  markInfo: { operationCase: 32 },
  saveFun: (info) => {
    console.log(info);
  },
});
playlist.load([{ src: 'media/audio/0.wav', name: 'Guitar' }]);
