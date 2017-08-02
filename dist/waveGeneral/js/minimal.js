var playlist = WaveGeneral.init({
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
    show: true, // whether or not to include the track controls
    width: 200, // width of controls in pixels
  }
});

playlist.load([
  {
    'src': 'media/audio/sonnet.mp3',
    'name': 'Guitar',
    'start': 0,
    'fadeOut': {
      'shape': 'linear',
      'duration': 0.5,
    },
    'cuein': 0,
  },
]);

window.onload = function() {
  document.getElementById('demo').onclick = function(){
    playlist.demo();
  };
  document.getElementById('play').onclick = function(){
    playlist.play(2, 0, 100);
  };
  document.getElementById('pause').onclick = function(){
    playlist.pause();
  };
  document.getElementById('stop').onclick = function(){
    playlist.stop();
  };
  document.getElementById('bigger').onclick = function(){
    playlist.zoom(1);
  };
  document.getElementById('smaller').onclick = function(){
    playlist.zoom(-1);
  };
};