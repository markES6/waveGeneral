const playlist = WaveGeneral.init({
  name: 'demo1',
  container: document.getElementById('wavelist'),
  markInfo: { operationCase: 32 },
});
playlist.load([{ src: 'media/audio/1.wav', name: 'Guitar' }, { src: 'media/audio/1.mp3', name: 'Guitar' }]);
