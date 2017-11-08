const playlist = WaveGeneral.init({
  name: 'demo0',
  container: document.getElementById('wavelist'),
  markInfo: { operationCase: 32 },
});
playlist.load([{ src: 'media/audio/0.wav', name: 'Guitar' }]);
