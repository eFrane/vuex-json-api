const merge = require('webpack-merge')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

let common = {
  externals: [
    'vue'
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
    ]
  },
  output: {
    path: resolve('/dist')
  }
}

module.exports = [
  // browser build
  merge(common, {
    mode: 'production',
    entry: resolve('/src/main.js'),
    output: {
      filename: 'browser/vuex-json-api.min.js',
    },
  }),

  // node module build
  merge(common, {
    mode: 'production',
    entry: resolve('/src/main.js'),
    output: {
      filename: 'vuex-json-api.umd.js',
      libraryTarget: 'umd',

      library: 'vuex-json-api',
      umdNamedDefine: true
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: './src/**/*',
          to: ''
        }
      ]),
    ]
  })
];
