var React = require('react');
var ReactDom = require('react-dom');

/**
 * 递归处理data的多层数据结构，但这里不考虑显示多少层，显示多少层由render处理
 * url 当前页面的hash url
 * data 导航配置数据，包含的属性值有：，url，alias，className，open，selected，sub_selected
 *   text：内容
 *   url：跳转链接，字符串或数组
 *   alias：唯一名称
 *   className：className名称，一般用于加图标
 *   open：打开状态
 *   selected：选中状态
 *   sub_selected: 子项选中状态
 *   其它自定义属性如light，lock等
 * init 是否第一次进入界面
 * params 组件外部传入的参数集合
 * url 比对函数，url相符的判断不是简单的相等，过程比较复杂
 */
module.exports.parseDataByUrl = function (data, params, url, init, onEqualFunc) {
  var parseData = function(data, dataLayerIndex) {
    var config = null;

    for (var key in data) {
      data[key].selected = false;
      if (onEqualFunc(url, data[key].url)) {
        if (typeof data[key].value === 'undefined' || data[key].value == null || data[key].value.length === 0) {
          data[key].selected = true;

          config = data
        }
      }

      data[key].sub_selected = false;
      if (parseData(data[key].value, dataLayerIndex + 1)) {
        data[key].sub_selected = true;

        // 特殊处理，当页面初始化时，包含被选中项的父级应为打开状态
        if (init) {
          data[key].open = true;
        }

        config = data;
      }
    }

    return config
  };

  // 返回要显示的data结构
  return parseData(data, 1) || data
};

/**
 * TODO: 非常混乱的一坨代码，需要彻底重构，没用的参数过多
 */
module.exports.render = function (data, params, config, onRedirect, onInitComplete) {
  if (!data) {
    return <div />
  }
  var that = this;

  var menuEle = Object.keys(data).map(function (key, i) {
    var refName = 'layer2-box' + key;
    var value = data[key].value;
    var subMenuEle = null;
    var subMenuHide = true;
    // 没有子节点或当前只响应一级配置就不会构造子节点
    if (typeof value != 'undefined' && value != null && value !== '' && params.dataLayerRange != 1) {
      var ele = Object.keys(value).map(function (k, ii) {
        var v = value;
        var __handleClick = function () {
          onRedirect(v[k].url, v[k].alias)
        };
        var className = 'layer2';
        if (typeof v[k].selected != 'undefined' && v[k].selected === true) {
          className += ' active';
          subMenuHide = false;
        }
        return (
          <li key={i + '-' + ii} className={className} style={{paddingTop: 0}}>
            <a onClick={__handleClick}><span>{v[k].text}</span></a>
          </li>
        )
      });
      var count = ele.length ? ele.length : 0;
      subMenuEle = (
        <ul className={'submenu-ele ' + (subMenuHide ? 'hidden-ul' : '')} ref={refName}>
          {ele}
        </ul>
      )
    }

    var _handleClick = function (open) {
      // 没有子节点是不能打开的，或者当前只响应第一级配置则也是不能打开的
      if (params.alwaysOpen) {
      } else if (typeof data[key].value === 'undefined' || data[key].value == null || data[key].value.length === 0 || params.dataLayerRange == 1) {
        data[key].open = false
      } else {
        if (open === true) {
          data[key].open = true
        } else if (open === false) {
          data[key].open = false
        } else {
          if (data[key].lock) {
            if (typeof params.onClickLock === 'function') {
              params.onClickLock()
            }
            return
          }
          data[key].open = !data[key].open
        }
        if (!data[key].open) {
          ReactDom.findDOMNode(that.refs[refName]).style.height = '0px';
        } else {
          //ReactDom.findDOMNode(that.refs[refName]).style.height = params.cellHeight * count + count - 1 + 'px'
          ReactDom.findDOMNode(that.refs[refName]).style.height = 'auto';//zee 20170309 修改让高度自动
        }
      }

      that.forceUpdate();

      if (params.alwaysOpen) {
        // 常开情况下 有子项的情况下只有点击子项才能跳转
        if (typeof data[key].value === 'undefined' || data[key].value == null || data[key].value.length === 0) {
          onRedirect(data[key].url, data[key].alias)
        }
      } else if (typeof data[key].url != 'undefined' && data[key].url != null && (typeof data[key].value === 'undefined' || data[key].value == null || data[key].value.length === 0 || params.dataLayerRange == 1)) {
        onRedirect(data[key].url, data[key].alias)
      }
    }

    var _handleMouseOver = function () {
      data[key].eye = true

      // 第一次操作时关闭初始化状态，使open属性不再依赖url的变化
      onInitComplete()

      that.forceUpdate()
    }

    var _handleMouseOut = function (e) {
      data[key].eye = false

      that.forceUpdate()
    }

    var _handleEyeClick = function (event) {
      event.stopPropagation()

      data[key].lock = !data[key].lock
      if (data[key].lock === true) {
        _handleClick(false)
      }

      if (typeof params.onClickEye === 'function') {
        params.onClickEye(data[key].text, data[key].alias, data[key].lock)
      }

      that.forceUpdate()
    }

    var className = 'layer1'
    var icon = data[key].icon?data[key].icon:(data[key].className ? <i className={data[key].className} /> : null);

    var textClassName = '' // data[key].className
    if (typeof data[key].selected != 'undefined' && data[key].selected === true) {
      className += ' active'
      if (typeof textClassName != 'undefined') {
        textClassName += ' active'
      }
    }

    if (data[key].lock === true) {
      className += ' dark'
      if (typeof textClassName != 'undefined') {
        textClassName += ' dark'
      }
    } else {
      if (data[key].light) {
        className += ' light'
        if (typeof textClassName != 'undefined') {
          textClassName += ' light'
        }
      }
      if (data[key].sub_selected) {
        className += ' active'
        if (typeof textClassName != 'undefined') {
          textClassName += ' active'
        }
      }
    }

    return (
      <li
        ref={data[key].alias}
        className={className}
        onMouseEnter={_handleMouseOver}
        onMouseLeave={_handleMouseOut}
        key={i}>
        <a onClick={_handleClick}>
          {icon} <span>{data[key].text}</span>
          {data[key].lock === true || (data[key].eye && data[key].lock === false) ?
             <div className={data[key].lock ? 'eye-no-button' : 'eye-button'} title={data[key].lock ? '点击开启模块' : '点击关闭模块，关闭后大屏幕将不会显示此模块'} onClick={_handleEyeClick}></div>
             : null}
        </a>
        {subMenuEle}
      </li>
    )
  })
  return (
    <ul className={'navigation navigation-main navigation-accordion'}>
      {menuEle}
    </ul>
  )
}

/**
 * render完成后还要做一些处理，加在这里
 */
module.exports.renderComplete = function (data, params) {
  var that = this;
  Object.keys(data).map(function (key, i) {
    var refName = 'layer2-box' + key;
    var value = data[key].value;
    if (typeof value != 'undefined' && value != null && value !== '' && params.dataLayerRange != 1) {
      var ele = Object.keys(value).map(function (k, ii) {
        return (
          <div key={i + '-' + ii} className='layer2'>
            {value[k].text}
          </div>
        )
      });
      var count = ele.length ? ele.length : 0;

      if (!data[key].open && !params.alwaysOpen) {
        ReactDom.findDOMNode(that.refs[refName]).style.height = '0px'
      } else {
        //ReactDom.findDOMNode(that.refs[refName]).style.height = params.cellHeight * count + count - 1 + 'px';
        ReactDom.findDOMNode(that.refs[refName]).style.height =  'auto';//zee 20170309 修改让高度自动
      }
    }
  })
};
