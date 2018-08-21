const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/js', 'index.jsx'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
    // alias: {
    //   assets: path.resolve('./app/assets')
    // }
  }
};
