var React = require('react')

var Dropdown = require('radmin').Dropdown
var DropdownTrigger = Dropdown.Trigger
var DropdownContent = Dropdown.Content

module.exports = React.createClass({
  render: function () {
    return (
      <Dropdown className='btn-group'>
        <DropdownTrigger>
          <button className='btn btn-default dropdown-toggle'>
            Dropmenu Button <span className='caret'></span>
          </button>
        </DropdownTrigger>
        <DropdownContent>
          <li>
            <a href='#'><i className='icon-menu7'></i> Action</a>
          </li>
          <li>
            <a href='#'><i className='icon-screen-full'></i> Another action</a>
          </li>
          <li>
            <a href='#'><i className='icon-mail5'></i> One more action</a>
          </li>
          <li className='divider'></li>
          <li>
            <a href='#'><i className='icon-gear'></i> Separated line</a>
          </li>
        </DropdownContent>
      </Dropdown>
    )
  }
})
