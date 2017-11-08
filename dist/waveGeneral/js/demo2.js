const playlist = WaveGeneral.init({
  name: 'demo2',
  container: document.getElementById('wavelist'),
  markInfo: { operationCase: 32 },
  samplesPerPixel: 19000, // 默认放大比例
  zoomLevels: [300, 600, 1000, 14000, 16000, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 19000], // 放大区间 300-19000之间
});
playlist.load([{ src: 'media/audio/0.wav', name: 'Guitar' }, { src: 'media/audio/1.mp3', name: 'Guitar' }]);
