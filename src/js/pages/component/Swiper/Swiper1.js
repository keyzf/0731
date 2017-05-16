var React = require('react')

var Swiper = require('radmin').Swiper

module.exports = React.createClass({
  render: function () {
    var params = {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      spaceBetween: 30
    }
    return (
      <Swiper {...params}>
        <div className='demo-slide'>
          Slide 1
        </div>
        <div className='demo-slide'>
          Slide 2
        </div>
        <div className='demo-slide'>
          Slide 3
        </div>
        <div className='demo-slide'>
          Slide 4
        </div>
        <div className='demo-slide'>
          Slide 5
        </div>
      </Swiper>
    )
  }
})
