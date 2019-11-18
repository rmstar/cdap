/*
 * Copyright © 2019 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

let pathsToClean = ['server_dist_test'];
let cleanOptions = {
  verbose: true,
  dry: false,
};

var webpackConfig = {
  context: __dirname,
  mode: 'development',
  entry: {
    server: ['@babel/polyfill', './server.js'],
  },
  output: {
    filename: 'index.js',
    path: __dirname + '/server_dist_test/',
    publicPath: '/server_dist_test/',
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new CaseSensitivePathsPlugin(),
    new CopyWebpackPlugin([
      {
        from: './graphql',
        to: './graphql',
      },
    ]),
  ],
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: [/node_modules/, /lib/],
        include: [path.join(__dirname, 'server'), path.join(__dirname, 'graphql')],
      },
    ],
  },
};

module.exports = webpackConfig;
