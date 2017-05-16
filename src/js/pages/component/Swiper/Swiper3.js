var React = require('react')

var Swiper = require('radmin').Swiper

module.exports = React.createClass({
  render: function () {
    var params = {
      slidesPerView: 3,
      spaceBetween: 30,
      grabCursor: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
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
        <div className='demo-slide'>
          Slide 6
        </div>
        <div className='demo-slide'>
          Slide 7
        </div>
        <div className='demo-slide'>
          Slide 8
        </div>
        <div className='demo-slide'>
          Slide 9
        </div>
      </Swiper>
    )
  }
})
