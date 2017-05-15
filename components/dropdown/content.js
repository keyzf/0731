import React, { createClass, PropTypes } from 'react'

const Content = createClass({
  displayName: 'Content',

  propTypes: {
    children: PropTypes.node,
    className: PropTypes.string
  },

  getDefaultProps() {
    return {
      className: ''
    }
  },

  render() {
    return (
      <ul className='dropdown-menu dropdown-menu-right'>
        {this.props.children}
      </ul>
    )
  }
})

export default Content
