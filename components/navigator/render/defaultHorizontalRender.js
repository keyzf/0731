var React = require('react')
var ReactDom = require('react-dom')

/**
 * 根据当前url获取渲染数据，使用默认值
 */
module.exports.parseDataByUrl = null

module.exports.render = function (data, params, config, onRedirect, onInitComplete) {
  var menuEle = []

  if (data instanceof Array) {
    data.map(function(d, key) {
      var _onClick = function() {
        onRedirect(d.url, d.alias)
      }

      menuEle.push(
        <li key={key} className={'dropdown mega-menu mega-menu-wide' + (d.selected == true || d.sub_selected == true ? ' active' : '')}>
          <a className='dropdown-toggle' onClick={_onClick}>
            {d.text}
          </a>
        </li>
      )
    })
  }

  return (
    <ul className='nav navbar-nav'>
      {menuEle}
    </ul>
  )
}

/**
 * render完成后还要做一些处理，使用默认值
 */
module.exports.renderComplete = null
