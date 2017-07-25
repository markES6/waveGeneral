module.exports = {
  entry: __dirname + "/src/app.js",
  output: {
    path:  __dirname + "/dist/waveGeneral/js",
    publicPath: "/waveGeneral/js/",
    filename: 'waveGeneral.var.js',
    library: 'WaveGeneral',
    libraryTarget: 'var'
  },
  devtool: "#source-map",
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};