const playlist = WaveGeneral.init({
  name: 'demo2',
  container: document.getElementById('wavelist'),
  markInfo: { operationCase: 32 },
});
playlist.load([{ src: 'media/audio/0.wav', name: 'Guitar' }]);


$( function () {
  $('#demoBtn').on('click', (e) => {
    console.log(e.target.name);
  });
});
