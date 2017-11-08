const playlist = WaveGeneral.init({
  name: 'demo3',
  container: document.getElementById('wavelist'),
  markInfo: { operationCase: 32 },
  typeArr: [{ type: 'input', sort: 'form1', title: '输入框', option: '' },
          { type: 'select', sort: 'form2', title: '下拉框', option: ['苹果', '香蕉', '橘子'] },
       { type: 'checkbox', sort: 'form3', title: '复选框', option: ['苹果', '香蕉', '橘子'] },
       { type: 'radio', sort: 'form4', title: '单选框', option: ['苹果', '香蕉', '橘子'] },
      ],
  errorInfo: { type: 'checkbox', sort: 'errorInfo', title: '错误类型', option: ['错误1', '错误2', '错误3'] },
});
playlist.load([{ src: 'media/audio/0.wav', name: 'Guitar' }]);
