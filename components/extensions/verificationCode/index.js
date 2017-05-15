'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import assign from 'object-assign'
import classnames from 'classnames'
import deepEqual from 'deep-equal'

const t_url = 'http://captcha.qq.com/template/TCapIframeApi.js'
const t_ssl_url = 'https://ssl.captcha.qq.com/template/TCapIframeApi.js'

/**
 * 验证码
 */
class VerificationCode extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.getScript()
  }

  componentWillUnmount () {
    global.capDestroy()
  }

  componentWillReceiveProps (nextProps) {
    if (!(deepEqual(this.props, nextProps))) {
      this.props = nextProps
    }
  }

  getUrlFromObject (obj) {
    let url = ''
    if (typeof obj === 'undefined' || obj == null) {
      return url
    }

    for (let key in obj) {
      url.length > 0 && (url += '&')
      url += key + '=' + obj[key]
    }
    return url
  }

  // 获取验证码模块js
  getScript () {
    if (typeof global.capInit === 'function') {
      this.init()
    } else {
      let node = document.createElement('script')
      node.type = 'text/javascript'
      node.charset = 'utf-8'
      let url = this.props.url || (this.props.ssl ? t_ssl_url : t_url)
      if (url.indexOf('?') == -1) {
        url += '?' + this.getUrlFromObject(this.props.urlOptions)
      } else {
        url += '&' + this.getUrlFromObject(this.props.urlOptions)
      }
      node.src = url
      node.addEventListener('load', () => {
        this.init()
      }, false)
      // node.addEventListener('load', this.onScriptLoadError, false)
      document.getElementsByTagName('head')[0].appendChild(node)
    }
  }

  init() {
    global.capDestroy()
    global.capInit(ReactDom.findDOMNode(this.refs.verification_code), {callback: (result) => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(result)
      }
    }, themeColor: this.props.themeColor || '2196F3', type: this.props.type || 'point'})
  }

  // 获取已验证成功的ticket
  capGetTicket() {
    return global.capGetTicket()
  }

  // 刷新验证码
  capRefresh() {
    return global.capRefresh()
  }

  capGetTicket() {
    return global.capGetTicket()
  }

  render () {
    return (
      <div className={classnames({}, this.props.className)} style={assign({}, this.props.style)}>
        <div ref='verification_code'></div>
      </div>
    )
  }
}

VerificationCode.propTypes = {
  /**
   * 业务id，例：111111
   */
  appid: React.PropTypes.string,
  /**
   * 配置项，例：{aid: 4007203, clientype: 2, apptype: 1, lang, captype, disturblevel}
   */
  urlOptions: React.PropTypes.object,
  /**
   * 是否使用https，例：false
   */
  ssl: React.PropTypes.bool,
  /**
   * 主题颜色，例：'ff0000'
   */
  themeColor: React.PropTypes.string,
  /**
   * 样式风格，'point'：点触样式，'embed'：内嵌样式，'popup'：弹窗样式
   */
  type: React.PropTypes.string
}

VerificationCode.defaultProps = {
  ssl: false
}

module.exports = VerificationCode
