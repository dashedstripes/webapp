const webpack = require('webpack')
const path = require('path')

const config = {

  entry: [
    './client/src/index.js'
  ],

  output: {
    path: path.join(__dirname, './client/dist'),
    filename: 'bundle.js',
    publicPath: '/dist'
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
}

if(process.env.NODE_ENV == 'development') {
  config.entry = [
    'webpack-hot-middleware/client',
    './client/src/index.js'
  ]

  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}

module.exports = config