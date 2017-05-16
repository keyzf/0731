import React from 'react'
import ReactDom from 'react-dom'

// 引入less文件
require('../less/index.less')

class Home extends React.Component {
  render () {
    return (
      <div style={{padding: 50}}>
        快看url，你已经跳转到了新的页面！
        有的时候我们不希望把所有内容都放在一个页面（html）里，比如需要一个能够快速展现的轻量主页的时候。另外，这个页面采用了es6的语法来写。
      </div>
    )
  }
}

ReactDom.render(<Home />, document.getElementById('react'))
