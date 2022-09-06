const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./src/static" }]
    })
  ],
  module:{
    rules: [
      {
        test: /\.(png|jpe?g|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.ttf$/,
        type: 'asset/inline'
      }
    ]
  }
}