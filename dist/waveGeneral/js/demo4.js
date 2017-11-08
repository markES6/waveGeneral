const playlist = WaveGeneral.init({
  name: 'demo2',
  container: document.getElementById('wavelist'),
  markInfo: { operationCase: 32 },
});
// playlist.load([{ src: 'media/audio/all.wav', name: 'Guitar' }]);
playlist.load([
  { src: 'media/audio/0.wav', name: 'Guitar' },
  { src: 'media/audio/1.wav', name: 'Guitar' },
  { src: 'media/audio/2.wav', name: 'Guitar' },
  { src: 'media/audio/3.wav', name: 'Guitar' },
  { src: 'media/audio/4.wav', name: 'Guitar' },
  { src: 'media/audio/5.wav', name: 'Guitar' },
  { src: 'media/audio/6.wav', name: 'Guitar' },
  { src: 'media/audio/7.wav', name: 'Guitar' },
  { src: 'media/audio/8.wav', name: 'Guitar' },
  { src: 'media/audio/9.wav', name: 'Guitar' },
  { src: 'media/audio/10.wav', name: 'Guitar' },
  { src: 'media/audio/11.wav', name: 'Guitar' },
  { src: 'media/audio/12.wav', name: 'Guitar' },
  { src: 'media/audio/13.wav', name: 'Guitar' },
]);
