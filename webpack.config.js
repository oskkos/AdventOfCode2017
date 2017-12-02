const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

  module.exports = {
    entry: './src/main.ts',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.ts$/,
          enforce: 'pre',
          loader: 'tslint-loader',
          options: { fix: true }
        },
        {
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts' ]
    },
    // Add minification
    plugins: [
      new UglifyJsPlugin({ sourceMap: true })
    ],
    output: {
      filename: './dist/app.js',
    }
  };