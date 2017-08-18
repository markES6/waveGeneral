const playlist = WaveGeneral.init({
  name: 'demo1',
  samplesPerPixel: 512,
  waveHeight: 500,
  container: document.getElementById('wavelist'),
  colors: {
    waveOutlineColor: '#1E90FF',
    timeColor: 'grey',
    fadeColor: 'black',
  },
  timescale: true,
  controls: {
    show: true,
    width: 200,
  },
});

playlist.load([
  {
    src: 'media/audio/sonnet.wav',
    name: 'Guitar',
    start: 0,
    fadeOut: {
      shape: 'linear',
      duration: 0.5,
    },
    cuein: 0,
  },
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
  });
  $('#bigger').click(() => {
    playlist.zoom(-1);
  });
  $('#smaller').click(() => {
    playlist.zoom(1);
  });
  $('#scope').click(() => {
    playlist.play(3, 3);
  });
  $('#cycle').click(() => {
    playlist.setCycle(false);
  });
  $('#save').click(() => {
    playlist.saveLocalStorage();
  });
});
