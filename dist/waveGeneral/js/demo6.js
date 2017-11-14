const playlist = WaveGeneral.init({
  name: 'demo2',
  container: document.getElementById('wavelist'),
  markInfo: { operationCase: 32 },
});
playlist.load([{ src: 'media/audio/0.wav', name: 'Guitar' }]);


$( function () {
  $('#demoBtn').on('click', (e) => {
    const funName = e.target.getAttribute('name');
    let index;
    let index1;
    let index2;
    let frag;
    switch (funName) {
      case 'playTime':
        const playTime = parseFloat($('#playInput').val());
        playlist.play(parseFloat(playTime));
        return;
      case 'play':
        playlist.play();
        return;
      case 'pause':
        playlist.pause();
        return;
      case 'stop':
        playlist.stop();
        return;
      case 'cycle':
        playlist.setCycle(!playlist.cycle);
        return;
      case 'playFrag':
        index = parseInt($('#playFrag').val());
        playlist.playFrag(index);
        return;
      case 'deleteFrag':
        index = parseInt($('#deleteFrag').val());
        playlist.deleteFragHook(index);
        return;
      case 'addFrag':
        index = parseFloat($('#addfragStart').val());
        index1 = parseFloat($('#addfragEnd').val());
        const addfragInfo = { start: index, end: index1, extend: {}, title: '' };
        playlist.formInfo.push(addfragInfo);
        playlist.setFragHook(playlist.formInfo);
        return;
      case 'changeFragHook':
        index = parseInt($('#changeFragHook').val());
        index1 = parseFloat($('#changeStart').val());
        index2 = parseFloat($('#changeEnd').val());
        const changefragInfo = { start: index1, end: index2, extend: {}, title: '' };
        playlist.changeFragHook(changefragInfo, index);
        return;
      case 'setFormType':
        index = parseInt($('#setFormType').val());
        playlist.setTypeArr(index);
        return;
      case 'setErrorInfo':
        index = parseInt($('#setErrorInfo').val());
        playlist.setErrorInfo(index);
        return;
      case 'setZoom':
        index = parseInt($('#setZoom').val());
        playlist.zoom(index);
        return;
      case 'waveRender':
        playlist.render();
        return;
      case 'getFromInfo':
        console.log(playlist.formInfo);
        return;
      case 'getAllTime':
        console.log(playlist.allTime);
        return;
      case 'getStartTime':
        console.log(playlist.startTime);
        return;
      case 'getStopTime':
        console.log(playlist.stopTime);
        return;
      case 'getPauseTime':
        console.log(playlist.pauseTime);
        return;
      case 'getName':
        console.log(playlist.name);
        return;
      case 'getFormType':
        console.log(playlist.typeArr);
        return;
      case 'getQuForm':
        console.log(playlist.errorInfo);
        return;
      case 'getSaveFun':
        console.log(playlist.saveFun);
        return;
      case 'getCycle':
        console.log(playlist.cycle);
        return;
      case 'getSampleRate':
        console.log(playlist.sampleRate);
        return;
      case 'getZoomIndex':
        console.log(playlist.zoomIndex);
        return;
      case 'getAC':
        console.log(playlist.ac);
        return;
      case 'getZoomArr':
        console.log(playlist.zoomLevels);
        return;

    }

  });
});
