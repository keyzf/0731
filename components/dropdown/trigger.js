import React, { createClass, PropTypes } from 'react'

const Trigger = createClass({
  displayName: 'Trigger',

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
    const { children, className } = this.props

    return (
      <a {...this.props}>
        {children}
      </a>
    )
  }
})

export default Trigger
