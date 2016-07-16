// IMPORTANT
// ---------
// This is an auto generated file with React CDK.
// Do not modify this file.
// Use `.storybook/user/modify_webpack_config.js instead`.

const path = require('path');
const updateConfig = require('./user/modify_webpack_config');

const config = {
  module: {
    loaders: [
      {
        test: /\.css?$/,
        loaders: ['style', 'raw'],
        include: path.resolve(__dirname, '../'),
      },
      {
        test: /\.json?$/,
        loaders: ['json'],
        include: path.resolve(__dirname, '../'),
      }
    ],
  },

  //if using enzyme for testings/specs part, you'll need this configuration
  //to make it works with storybook
  externals: {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react/addons': 'window',
    'text-encoding': 'window'
  }
};

updateConfig(config);
module.exports = config;
