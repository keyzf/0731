import React from 'react'
import { findDOMNode } from 'react-dom'
import isEqual from 'deep-equal'
import clone from 'clone'
import uuid from '../helpers/uuid'
import ucFirst from '../helpers/ucFirst'
import zh_CN from '../helpers/zh_CN'

const EVENTS = [
  'focusin', 'focusout', 'click', 'dblclick', 'mousedown', 'mouseup',
  'mousemove', 'mouseover', 'beforepaste', 'paste', 'cut', 'copy',
  'selectionchange', 'mouseout', 'mouseenter', 'mouseleave', 'keydown',
  'keypress', 'keyup', 'contextmenu', 'dragend', 'dragover', 'draggesture',
  'dragdrop', 'drop', 'drag', 'BeforeRenderUI', 'SetAttrib', 'PreInit',
  'PostRender', 'init', 'deactivate', 'activate', 'NodeChange',
  'BeforeExecCommand', 'ExecCommand', 'show', 'hide', 'ProgressState',
  'LoadContent', 'SaveContent', 'BeforeSetContent', 'SetContent',
  'BeforeGetContent', 'GetContent', 'VisualAid', 'remove', 'submit', 'reset',
  'BeforeAddUndo', 'AddUndo', 'change', 'undo', 'redo', 'ClearUndos',
  'ObjectSelected', 'ObjectResizeStart', 'ObjectResized', 'PreProcess',
  'PostProcess', 'focus', 'blur', 'dirty'
]

// Note: because the capitalization of the events is weird, we're going to get
// some inconsistently-named handlers, for example compare:
// 'onMouseleave' and 'onNodeChange'
const HANDLER_NAMES = EVENTS.map((event) => {
  return 'on' + ucFirst(event)
})

const TinyMCE = React.createClass({
  propTypes: {
    config: React.PropTypes.object,
    content: React.PropTypes.string,
    id: React.PropTypes.string,
    className: React.PropTypes.string
  },
  getInitialState() {
    return {
      loaded: false
    }
  },
  getDefaultProps() {
    return {
      config: {},
      content: ''
    }
  },

  componentWillMount() {
    this.id = this.id || this.props.id || uuid()
    var self = this
    const script = document.createElement('script')

    script.src = '//cdn.tinymce.com/4/tinymce.min.js'
    script.async = true
    script.onload = function () {
      self.state.loaded = true
      self.forceUpdate()
      tinymce.addI18n('zh_CN', zh_CN)
      const config = clone(self.props.config)
      self._init(config)
    }
    document.body.appendChild(script)
  },

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.config, nextProps.config)) {
      this._init(nextProps.config, nextProps.content)
    }
    if (!isEqual(this.props.id, nextProps.id)) {
      this.id = nextProps.id
    }
  },

  shouldComponentUpdate(nextProps) {
    return (
      !isEqual(this.props.content, nextProps.content) ||
      !isEqual(this.props.config, nextProps.config)
    )
  },

  componentWillUnmount() {
    this._remove()
  },

  render() {
    return this.props.config.inline ? (
      <div id={this.id} className={this.props.className} dangerouslySetInnerHTML={{__html: this.props.content}} />
      ) : (
      this.state.loaded ? <textarea id={this.id} className={this.props.className} defaultValue={this.props.content} />
        : <div />)
  },

  _init(config, content) {
    if (this._isInit) {
      this._remove()
    }

    // hide the textarea that is me so that no one sees it
    findDOMNode(this).style.hidden = 'hidden'

    const setupCallback = config.setup
    const hasSetupCallback = (typeof setupCallback === 'function')

    config.selector = '#' + this.id
    config.setup = (editor) => {
      EVENTS.forEach((event, index) => {
        const handler = this.props[HANDLER_NAMES[index]]
        if (typeof handler !== 'function') return
        editor.on(event, (e) => {
          // native DOM events don't have access to the editor so we pass it here
          handler(e, editor)
        })
      })
      // need to set content here because the textarea will still have the
      // old `this.props.content`
      if (content) {
        editor.on('init', () => {
          editor.setContent(content)
        })
      }
      if (hasSetupCallback) {
        setupCallback(editor)
      }
    }

    tinymce.init(config)

    findDOMNode(this).style.hidden = ''

    this._isInit = true
  },

  _remove() {
    tinymce.EditorManager.execCommand('mceRemoveEditor', true, this.id)
    this._isInit = false
  }
})

// add handler propTypes
HANDLER_NAMES.forEach((name) => {
  TinyMCE.propTypes[name] = React.PropTypes.func
})

module.exports = TinyMCE
