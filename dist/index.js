'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.it = exports.describe = exports.InfoAddon = exports.Story = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Story2 = require('./components/Story');

var _Story3 = _interopRequireDefault(_Story2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Story = exports.Story = _Story3.default;

var defaultOptions = {
  inline: false,
  header: true,
  source: true
};

var currentStory = "";
var results = {};

var InfoAddon = exports.InfoAddon = {
  addWithInfo: function addWithInfo(storyName, info, storyFn, _options) {
    var options = (0, _extends3.default)({}, defaultOptions, _options);

    this.add(storyName, function (context) {
      if (!_.isUndefined(_options) && !_.isUndefined(_options.specs)) {
        options.specs();
      }
      var _info = info;
      var _storyFn = storyFn;

      if (typeof storyFn !== 'function') {
        if (typeof info === 'function') {
          _storyFn = info;
          _info = '';
        } else {
          throw new Error('No story defining function has been specified');
        }
      }
      var props = {
        _info: _info,
        context: context,
        showInline: Boolean(options.inline),
        showHeader: Boolean(options.header),
        showSource: Boolean(options.source),
        propTables: options.propTables,
        specs: results[storyName]
      };

      return _react2.default.createElement(
        Story,
        props,
        _storyFn(context)
      );
    });
  }
};

var describe = exports.describe = function describe(desc, func) {
  currentStory = desc;
  results[currentStory] = {
    goodResults: [],
    wrongResults: []
  };
  func();
};

var it = exports.it = function it(desc, func) {
  try {
    func();
    results[currentStory].goodResults.push(desc);
  } catch (e) {
    results[currentStory].wrongResults.push({ spec: desc, e: e });
  }
};