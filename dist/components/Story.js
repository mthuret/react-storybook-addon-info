'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _markdownToReactComponents = require('markdown-to-react-components');

var _markdownToReactComponents2 = _interopRequireDefault(_markdownToReactComponents);

var _PropTable = require('./PropTable');

var _PropTable2 = _interopRequireDefault(_PropTable);

var _Node = require('./Node');

var _Node2 = _interopRequireDefault(_Node);

var _markdown = require('./markdown');

var _theme = require('./theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_markdownToReactComponents2.default.configure({
  h1: _markdown.H1,
  h2: _markdown.H2,
  h3: _markdown.H3,
  h4: _markdown.H4,
  h5: _markdown.H5,
  h6: _markdown.H6,
  code: _markdown.Code,
  // pre: Pre,
  p: _markdown.P,
  a: _markdown.A,
  li: _markdown.LI,
  ul: _markdown.UL
});

var stylesheet = {
  link: {
    base: {
      fontFamily: 'sans-serif',
      fontSize: 12,
      display: 'block',
      position: 'fixed',
      textDecoration: 'none',
      background: '#28c',
      color: '#fff',
      padding: '5px 15px',
      cursor: 'pointer'
    },
    topRight: {
      top: 0,
      right: 0,
      borderRadius: '0 0 0 5px'
    }
  },
  info: {
    position: 'absolute',
    background: 'white',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: '0 40px',
    overflow: 'auto'
  },
  children: {
    position: 'relative',
    zIndex: 0
  },
  infoBody: (0, _extends3.default)({}, _theme.baseFonts, {
    fontWeight: 300,
    lineHeight: 1.45,
    fontSize: 15
  }),
  infoContent: {
    marginBottom: 0
  },
  header: {
    h1: {
      margin: '20px 0 0 0',
      padding: 0,
      fontSize: 35
    },
    h2: {
      margin: '0 0 10px 0',
      padding: 0,
      fontWeight: 400,
      fontSize: 22
    },
    body: {
      borderBottom: '1px solid #eee',
      marginBottom: 10
    }
  },
  source: {
    h1: {
      margin: '20px 0 0 0',
      padding: '0 0 5px 0',
      fontSize: 25,
      borderBottom: '1px solid #EEE'
    }
  },
  propTableHead: {
    margin: '20px 0 0 0'
  },
  specs: {
    errors: {
      color: 'red',
      message: {
        backgroundColor: '#fafafa',
        padding: '10px'
      }
    },
    pass: {
      color: 'green'
    }
  }
};

var Story = function (_React$Component) {
  (0, _inherits3.default)(Story, _React$Component);

  function Story() {
    var _Object$getPrototypeO;

    (0, _classCallCheck3.default)(this, Story);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(Story)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    _this.state = { open: false };
    return _this;
  }

  (0, _createClass3.default)(Story, [{
    key: '_renderStory',
    value: function _renderStory() {
      return _react2.default.createElement(
        'div',
        null,
        this.props.children
      );
    }
  }, {
    key: '_renderInline',
    value: function _renderInline() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: stylesheet.infoPage },
          _react2.default.createElement(
            'div',
            { style: stylesheet.infoBody },
            this._getInfoHeader()
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          this._renderStory()
        ),
        _react2.default.createElement(
          'div',
          { style: stylesheet.infoPage },
          _react2.default.createElement(
            'div',
            { style: stylesheet.infoBody },
            this._getInfoContent(),
            this._getSpecifications(),
            this._getSourceCode(),
            this._getPropTables()
          )
        )
      );
    }
  }, {
    key: '_renderOverlay',
    value: function _renderOverlay() {
      var _this2 = this;

      var linkStyle = (0, _extends3.default)({}, stylesheet.link.base, stylesheet.link.topRight);

      var infoStyle = (0, _assign2.default)({}, stylesheet.info);
      if (!this.state.open) {
        infoStyle.display = 'none';
      }

      var openOverlay = function openOverlay() {
        _this2.setState({ open: true });
        return false;
      };

      var closeOverlay = function closeOverlay() {
        _this2.setState({ open: false });
        return false;
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: stylesheet.children },
          this.props.children
        ),
        _react2.default.createElement(
          'a',
          { style: linkStyle, onClick: openOverlay },
          '?'
        ),
        _react2.default.createElement(
          'div',
          { style: infoStyle },
          _react2.default.createElement(
            'a',
            { style: linkStyle, onClick: closeOverlay },
            '×'
          ),
          _react2.default.createElement(
            'div',
            { style: stylesheet.infoPage },
            _react2.default.createElement(
              'div',
              { style: stylesheet.infoBody },
              this._getInfoHeader(),
              this._getInfoContent(),
              this._getSpecifications(),
              this._getSourceCode(),
              this._getPropTables()
            )
          )
        )
      );
    }
  }, {
    key: '_getInfoHeader',
    value: function _getInfoHeader() {
      if (!this.props.context || !this.props.showHeader) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { style: stylesheet.header.body },
        _react2.default.createElement(
          'h1',
          { style: stylesheet.header.h1 },
          this.props.context.kind
        ),
        _react2.default.createElement(
          'h2',
          { style: stylesheet.header.h2 },
          this.props.context.story
        )
      );
    }
  }, {
    key: '_getInfoContent',
    value: function _getInfoContent() {
      if (!this.props.info) {
        return '';
      }
      var lines = this.props.info.split('\n');
      while (lines[0].trim() === '') {
        lines.shift();
      }
      var padding = 0;
      var matches = lines[0].match(/^ */);
      if (matches) {
        padding = matches[0].length;
      }
      var source = lines.map(function (s) {
        return s.slice(padding);
      }).join('\n');
      return _react2.default.createElement(
        'div',
        { style: stylesheet.infoContent },
        (0, _markdownToReactComponents2.default)(source).tree
      );
    }
  }, {
    key: '_getSourceCode',
    value: function _getSourceCode() {
      if (!this.props.showSource) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { style: stylesheet.source.h1 },
          'Story Source'
        ),
        _react2.default.createElement(
          _markdown.Pre,
          null,
          _react2.default.Children.map(this.props.children, function (root, idx) {
            return _react2.default.createElement(_Node2.default, { key: idx, depth: 0, node: root });
          })
        )
      );
    }
  }, {
    key: '_getSpecifications',
    value: function _getSpecifications() {
      if (!_lodash2.default.isEmpty(this.props.specs)) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            { style: stylesheet.source.h1 },
            'Specifications'
          ),
          _react2.default.createElement(
            'ul',
            null,
            this.props.specs.wrongResults.map(function (r, idx) {
              return _react2.default.createElement(
                'li',
                { key: idx },
                _react2.default.createElement(
                  'p',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: stylesheet.specs.errors },
                    'Error :'
                  ),
                  ' ',
                  r.spec
                ),
                _react2.default.createElement(
                  'p',
                  { style: stylesheet.specs.errors.message },
                  r.e.message
                )
              );
            }),
            this.props.specs.goodResults.map(function (r, idx) {
              return _react2.default.createElement(
                'li',
                { key: idx },
                _react2.default.createElement(
                  'span',
                  { style: stylesheet.specs.pass },
                  'Pass : '
                ),
                r
              );
            })
          )
        );
      } else {
        return null;
      }
    }
  }, {
    key: '_getPropTables',
    value: function _getPropTables() {
      if (this.props.propTables === false) {
        return null;
      }

      if (!this.props.children) {
        return null;
      }

      var types = new _map2.default();

      if (this.props.propTables) {
        this.props.propTables.forEach(function (type) {
          types.set(type, true);
        });
      }

      function extract(children) {

        if (Array.isArray(children)) {
          children.forEach(extract);
          return;
        }
        if (typeof children === 'string' || typeof children.type === 'string') {
          return;
        }

        var type = children.type;
        var name = type.displayName || type.name;
        if (!types.has(type)) {
          types.set(type, true);
        }
        if (children.props.children) {
          extract(children.props.children);
        }
      }

      // extract components from children
      extract(this.props.children);

      var array = (0, _from2.default)(types.keys());
      array.sort(function (a, b) {
        return (a.displayName || a.name) > (b.displayName || b.name);
      });

      var propTables = array.map(function (type, idx) {
        return _react2.default.createElement(
          'div',
          { key: idx },
          _react2.default.createElement(
            'h2',
            { style: stylesheet.propTableHead },
            '"',
            type.displayName || type.name,
            '" Component'
          ),
          _react2.default.createElement(_PropTable2.default, { type: type })
        );
      });

      if (!propTables || propTables.length === 0) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { style: stylesheet.source.h1 },
          'Prop Types'
        ),
        propTables
      );

      return;
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.showInline) {
        return this._renderInline();
      }

      return this._renderOverlay();
    }
  }]);
  return Story;
}(_react2.default.Component);

exports.default = Story;


Story.displayName = 'Story';
Story.propTypes = {
  context: _react2.default.PropTypes.object,
  info: _react2.default.PropTypes.string,
  propTables: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.func),
  showInline: _react2.default.PropTypes.bool,
  showHeader: _react2.default.PropTypes.bool,
  showSource: _react2.default.PropTypes.bool,
  specs: _react2.default.PropTypes.object,
  children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.object, _react2.default.PropTypes.array])
};

Story.defaultProps = {
  showInline: false,
  showHeader: true,
  showSource: true
};