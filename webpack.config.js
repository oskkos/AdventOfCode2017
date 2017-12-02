const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

  module.exports = {
    entry: './src/main.ts',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.ts$/,
          enforce: 'pre',
          loader: 'tslint-loader',
          options: { fix: false }
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
    plugins: [
      new UglifyJsPlugin({ sourceMap: true }),
      new HtmlWebpackPlugin({title: 'AdventOfCode 2017'})
    ],
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'aoc17.js',
    },
    watch: true
  };