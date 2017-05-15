'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var t_url = 'http://captcha.qq.com/template/TCapIframeApi.js';
var t_ssl_url = 'https://ssl.captcha.qq.com/template/TCapIframeApi.js';

/**
 * 验证码
 */

var VerificationCode = function (_React$Component) {
  _inherits(VerificationCode, _React$Component);

  function VerificationCode(props) {
    _classCallCheck(this, VerificationCode);

    var _this = _possibleConstructorReturn(this, (VerificationCode.__proto__ || Object.getPrototypeOf(VerificationCode)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(VerificationCode, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getScript();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      global.capDestroy();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!(0, _deepEqual2.default)(this.props, nextProps)) {
        this.props = nextProps;
      }
    }
  }, {
    key: 'getUrlFromObject',
    value: function getUrlFromObject(obj) {
      var url = '';
      if (typeof obj === 'undefined' || obj == null) {
        return url;
      }

      for (var key in obj) {
        url.length > 0 && (url += '&');
        url += key + '=' + obj[key];
      }
      return url;
    }

    // 获取验证码模块js

  }, {
    key: 'getScript',
    value: function getScript() {
      var _this2 = this;

      if (typeof global.capInit === 'function') {
        this.init();
      } else {
        var node = document.createElement('script');
        node.type = 'text/javascript';
        node.charset = 'utf-8';
        var url = this.props.url || (this.props.ssl ? t_ssl_url : t_url);
        if (url.indexOf('?') == -1) {
          url += '?' + this.getUrlFromObject(this.props.urlOptions);
        } else {
          url += '&' + this.getUrlFromObject(this.props.urlOptions);
        }
        node.src = url;
        node.addEventListener('load', function () {
          _this2.init();
        }, false);
        // node.addEventListener('load', this.onScriptLoadError, false)
        document.getElementsByTagName('head')[0].appendChild(node);
      }
    }
  }, {
    key: 'init',
    value: function init() {
      var _this3 = this;

      global.capDestroy();
      global.capInit(_reactDom2.default.findDOMNode(this.refs.verification_code), { callback: function callback(result) {
          if (typeof _this3.props.onChange === 'function') {
            _this3.props.onChange(result);
          }
        }, themeColor: this.props.themeColor || '2196F3', type: this.props.type || 'point' });
    }

    // 获取已验证成功的ticket

  }, {
    key: 'capGetTicket',
    value: function capGetTicket() {
      return global.capGetTicket();
    }

    // 刷新验证码

  }, {
    key: 'capRefresh',
    value: function capRefresh() {
      return global.capRefresh();
    }
  }, {
    key: 'capGetTicket',
    value: function capGetTicket() {
      return global.capGetTicket();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)({}, this.props.className), style: (0, _objectAssign2.default)({}, this.props.style) },
        _react2.default.createElement('div', { ref: 'verification_code' })
      );
    }
  }]);

  return VerificationCode;
}(_react2.default.Component);

VerificationCode.propTypes = {
  /**
   * 业务id，例：111111
   */
  appid: _react2.default.PropTypes.string,
  /**
   * 配置项，例：{aid: 4007203, clientype: 2, apptype: 1, lang, captype, disturblevel}
   */
  urlOptions: _react2.default.PropTypes.object,
  /**
   * 是否使用https，例：false
   */
  ssl: _react2.default.PropTypes.bool,
  /**
   * 主题颜色，例：'ff0000'
   */
  themeColor: _react2.default.PropTypes.string,
  /**
   * 样式风格，'point'：点触样式，'embed'：内嵌样式，'popup'：弹窗样式
   */
  type: _react2.default.PropTypes.string
};

VerificationCode.defaultProps = {
  ssl: false
};

module.exports = VerificationCode;