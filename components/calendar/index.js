var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')
var classnames = require('classnames')
var deepEqual = require('deep-equal')

var moment = require('moment');
require('moment-range');

moment.locale('zh-cn', {
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
  longDateFormat: {
    LT: 'Ah点mm分',
    LTS: 'Ah点m分s秒',
    L: 'YYYY-MM-DD',
    LL: 'YYYY年MMMD日',
    LLL: 'YYYY年MMMD日Ah点mm分',
    LLLL: 'YYYY年MMMD日ddddAh点mm分',
    l: 'YYYY-MM-DD',
    ll: 'YYYY年MMMD日',
    lll: 'YYYY年MMMD日Ah点mm分',
    llll: 'YYYY年MMMD日ddddAh点mm分'
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour: function (hour, meridiem) {
    if (hour === 12) {
      hour = 0
    }
    if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
      return hour
    } else if (meridiem === '下午' || meridiem === '晚上') {
      return hour + 12
    } else {
      // '中午'
      return hour >= 11 ? hour : hour + 12
    }
  },
  meridiem: function (hour, minute, isLower) {
    var hm = hour * 100 + minute;
    if (hm < 600) {
      return '凌晨'
    } else if (hm < 900) {
      return '早上'
    } else if (hm < 1130) {
      return '上午'
    } else if (hm < 1230) {
      return '中午'
    } else if (hm < 1800) {
      return '下午'
    } else {
      return '晚上'
    }
  },
  calendar: {
    sameDay: function () {
      return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT'
    },
    nextDay: function () {
      return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT'
    },
    lastDay: function () {
      return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT'
    },
    nextWeek: function () {
      var startOfWeek, prefix;
      startOfWeek = moment().startOf('week');
      prefix = this.unix() - startOfWeek.unix() >= 7 * 24 * 3600 ? '[下]' : '[本]';
      return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm'
    },
    lastWeek: function () {
      var startOfWeek, prefix;
      startOfWeek = moment().startOf('week');
      prefix = this.unix() < startOfWeek.unix() ? '[上]' : '[本]';
      return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm'
    },
    sameElse: 'LL'
  },
  ordinalParse: /\d{1,2}(日|月|周)/,
  ordinal: function (number, period) {
    switch (period) {
      case 'd':
      case 'D':
      case 'DDD':
        return number + '日';
      case 'M':
        return number + '月';
      case 'w':
      case 'W':
        return number + '周';
      default:
        return number
    }
  },
  relativeTime: {
    future: '%s内',
    past: '%s前',
    s: '几秒',
    m: '1 分钟',
    mm: '%d 分钟',
    h: '1 小时',
    hh: '%d 小时',
    d: '1 天',
    dd: '%d 天',
    M: '1 个月',
    MM: '%d 个月',
    y: '1 年',
    yy: '%d 年'
  },
  week: {
    // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
    dow: 1, // Monday is the first day of the week.
    doy: 4 // The week that contains Jan 4th is the first week of the year.
  }
});

moment.locale('zh-cn');

// 单元格
var Cell = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    classes: React.PropTypes.string
  },
  render: function () {
    var classes = this.props.classes + ' cell';
    return (
      <div className={classes} style={this.props.style || {}}>
        {this.props.value}
      </div>
    )
  }
});

var ThCell = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    classes: React.PropTypes.string,
    colSpan: React.PropTypes.number
  },
  render: function () {
    var classes = this.props.classes + ' cell';
    return (
      <th colSpan={this.props.colSpan} className={classes} style={this.props.style || {}}>
        {this.props.value}
      </th>
    )
  }
});

var TdCell = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    classes: React.PropTypes.string,
    colSpan: React.PropTypes.number
  },
  render: function () {
    var classes = this.props.classes + ' cell';
    return (
      <td colSpan={this.props.colSpan} className={classes} style={this.props.style || {}}>
        {this.props.value}
      </td>
    )
  }
});

// 日历头
var ViewHeader = React.createClass({
  propTypes: {
    next: React.PropTypes.func,
    prev: React.PropTypes.func,
    titleAction: React.PropTypes.func,
    data: React.PropTypes.string,
    colSpan: React.PropTypes.number
  },
  render: function () {
    var prop = this.props;
    return (
      <tr className='navigation-wrapper'>
        <th className='prev' onClick={prop.prev}>
          <i className="icon-arrow-left32"></i>
        </th>
        <th className='month' colSpan={this.props.colSpan} onClick={prop.titleAction} style={{cursor: 'pointer'}}>{prop.data}</th>
        <th className='next' onClick={prop.next}>
          <i className="icon-arrow-right32"></i>
        </th>
      </tr>
    )
  }
});

// 日界面
var DaysView = React.createClass({
  propTypes: {
    date: React.PropTypes.object.isRequired,
    minDate: React.PropTypes.any,
    maxDate: React.PropTypes.any,
    setDate: React.PropTypes.func,
    nextView: React.PropTypes.func
  },
  getDaysTitles: function () {
    if (moment.locale() === 'zh-cn') {
      return moment.weekdaysMin().map(item => ({
        val: item,
        label: item
      }))
    } else {
      return 'Mon_Tues_Wed_Thur_Fri_Sat_Sun'.split('_').map(item => ({
        val: item,
        label: item
      }))
    }
  },
  next: function () {
    var nextDate = this.props.date.clone().add(1, 'months');
    if (this.props.maxDate && nextDate.isAfter(this.props.maxDate)) {
      nextDate = this.props.maxDate
    } else if (this.props.minDate && nextDate.isBefore(this.props.minDate)) {
      nextDate = this.props.minDate
    }
    this.props.setDate(nextDate)
  },
  prev: function () {
    var prevDate = this.props.date.clone().subtract(1, 'months');
    if (this.props.minDate && prevDate.isBefore(this.props.minDate)) {
      prevDate = this.props.minDate
    } else if (this.props.maxDate && prevDate.isAfter(this.props.maxDate)) {
      prevDate = this.props.maxDate
    }
    this.props.setDate(prevDate)
  },
  cellClick: function (e) {
    var cell = e.target,
      date = parseInt(cell.innerHTML, 10),
      newDate = this.props.date ? this.props.date.clone() : moment();

    if (isNaN(date)) return;

    if (cell.className.indexOf('prev') > -1) {
      newDate.subtract(1, 'months')
    } else if (cell.className.indexOf('next') > -1) {
      newDate.add(1, 'months')
    }

    newDate.date(date);
    this.props.setDate(newDate, true)
  },
  getDays: function () {
    var now = this.props.date ? this.props.date : moment(),
      start = now.clone().startOf('month').weekday(0),
      end = now.clone().endOf('month').weekday(6),
      minDate = this.props.minDate,
      maxDate = this.props.maxDate,
      month = now.month(),
      today = moment(),
      currDay = now.date(),
      year = now.year(),
      days = [];

    moment()
      .range(start, end)
      .by('days', day => {
        var curr = day.date() === currDay && day.month() === month
        if(minDate){
          curr = curr && day.isSameOrAfter(minDate)
        }
        if(maxDate){
          curr = curr && day.isSameOrBefore(maxDate)
        }
        
        days.push({
          label: day.format('D'),
          prev: (day.month() < month && !(day.year() > year)) || day.year() < year,
          next: day.month() > month || day.year() > year,
          disabled: day.isBefore(minDate) || day.isAfter(maxDate),
          curr: curr,
          today: day.date() === today.date() && day.month() === today.month()
        })
      });
    return days
  },
  render: function () {
    var titles = this.getDaysTitles().map((item, i) => {
      return <ThCell classes='day title' key={i} value={item.label} />
    });
    var _class;

    var days = this.getDays().map((item, i) => {
      _class = classnames({
        'day': true,
        'next': item.next,
        'prev': item.prev,
        'disabled': item.disabled,
        'active': item.curr,
        'today': item.today,
        'off': item.prev || item.next
      });
      return <TdCell classes={_class} key={i} value={item.label} />
    });

    var daysWithTr = [];
    for (var i = 0; i < days.length / 7; i++) {
      var daysCell = [];
      for (var j = i * 7; j < i * 7 + 7; j++) {
        daysCell.push(days[j])
      }
      daysWithTr.push(<tr key={i}>{daysCell}</tr>)
    }

    if (daysWithTr.length < 6) {
      daysWithTr.push(<tr key={i} style={{height: 33}}></tr>)
    }

    if (moment.locale() === 'zh-cn') {
      var currentDate = this.props.date ? this.props.date.format('YYYY年 MMM') : moment().format('YYYY年 MMM')
    } else {
      var currentDate = this.props.date ? this.props.date.format('YYYY MMM') : moment().format('YYYY MMM')
    }

    return (
      <table className='table-condensed' style={{width: 252}} onKeyDown={this.keyDown}>
        <thead>
          <ViewHeader
            data={currentDate}
            next={this.next}
            prev={this.prev}
            titleAction={this.props.nextView}
            colSpan={5}
          />
          <tr>
            {titles}
          </tr>
        </thead>
        <tbody onClick={this.cellClick}>
          {daysWithTr}
        </tbody>
      </table>
    )
  }
});

// 月界面
var MonthsView = React.createClass({
  propTypes: {
    date: React.PropTypes.object.isRequired,
    minDate: React.PropTypes.any,
    maxDate: React.PropTypes.any
  },
  checkIfMonthDisabled: function (month) {
    var now = this.props.date;

    return now.clone().month(month).endOf('month').isBefore(this.props.minDate) || now.clone().month(month).startOf('month').isAfter(this.props.maxDate)
  },
  next: function () {
    var nextDate = this.props.date.clone().add(1, 'years');

    if (this.props.maxDate && nextDate.isAfter(this.props.maxDate)) {
      nextDate = this.props.maxDate
    }

    this.props.setDate(nextDate)
  },
  prev: function () {
    var prevDate = this.props.date.clone().subtract(1, 'years');

    if (this.props.minDate && prevDate.isBefore(this.props.minDate)) {
      prevDate = this.props.minDate
    }

    this.props.setDate(prevDate)
  },
  cellClick: function (e) {
    var month = e.target.innerHTML,
      date = this.props.date.clone().month(month);

    if (this.checkIfMonthDisabled(month)) {
      return
    }

    this.props.prevView(date, 'month')
  },
  getMonth: function () {
    var now = this.props.date,
      month = now.month();

    return moment.monthsShort().map(function (item, i) {
      return {
        label: item,
        disabled: this.checkIfMonthDisabled(i),
        curr: i === month
      }
    }.bind(this))
  },
  render: function () {
    var currentDate = this.props.date.format('YYYY'),
      _class;
    var months = this.getMonth().map(function (item, i) {
      _class = classnames({
        'month': true,
        'disabled': item.disabled,
        'active': item.curr
      });
      if (i % 3 == 1) {
        return <TdCell colSpan={1} classes={_class} key={i} value={item.label} style={{color: item.disabled ? '#ccc' : 'inherit'}} />
      } else {
        return <TdCell classes={_class} key={i} value={item.label} style={{color: item.disabled ? '#ccc' : 'inherit'}} />
      }
    });

    var monthsWithTr = [];

    monthsWithTr.push(<tr key={-1} style={{height: 25}}></tr>)
    
    for (var i = 0; i < months.length / 3; i++) {
      var monthsCell = [];
      for (var j = i * 3; j < i * 3 + 3; j++) {
        monthsCell.push(months[j])
      }
      monthsWithTr.push(<tr key={i}>{monthsCell}</tr>)
    }

    monthsWithTr.push(<tr key={i} style={{height: 25}}></tr>)

    return (
      <table className='table-condensed' style={{width: 252}} onKeyDown={this.keyDown}>
        <thead>
          <ViewHeader
            data={currentDate}
            next={this.next}
            prev={this.prev}
            titleAction={this.props.nextView}
            colSpan={1}
          />
        </thead>
        <tbody onClick={this.cellClick}>
          {monthsWithTr}
        </tbody>
      </table>
    )
  }
});

// 年界面
var YearsView = React.createClass({
  propTypes: {
    date: React.PropTypes.object,
    minDate: React.PropTypes.any,
    maxDate: React.PropTypes.any,
    changeView: React.PropTypes.func
  },
  years: [],
  checkIfYearDisabled: function (year) {
    return year.clone().endOf('year').isBefore(this.props.minDate) || year.clone().startOf('year').isAfter(this.props.maxDate)
  },
  next: function () {
    var nextDate = this.props.date.clone().add(10, 'years');

    if (this.props.maxDate && nextDate.isAfter(this.props.maxDate)) {
      nextDate = this.props.maxDate
    }

    this.props.setDate(nextDate)
  },
  prev: function () {
    var prevDate = this.props.date.clone().subtract(10, 'years');

    if (this.props.minDate && prevDate.isBefore(this.props.minDate)) {
      prevDate = this.props.minDate
    }

    this.props.setDate(prevDate)
  },
  rangeCheck: function (currYear) {
    if (this.years.length === 0) {
      return false
    }

    return this.years[0].label <= currYear && this.years[this.years.length - 1].label >= currYear
  },
  getYears: function () {
    var now = this.props.date,
      start = now.clone().subtract(5, 'year'),
      end = now.clone().add(6, 'year'),
      currYear = now.year(),
      items = [],
      inRange = this.rangeCheck(currYear);

    if (this.years.length > 0 && inRange) {
      return this.years
    }

    moment()
      .range(start, end)
      .by('years', function (year) {
        items.push({
          label: year.format('YYYY'),
          disabled: this.checkIfYearDisabled(year),
          curr: currYear === year.year()
        })
      }.bind(this));

    this.years = items;
    return items
  },
  cellClick: function (e) {
    var year = parseInt(e.target.innerHTML, 10),
      date = this.props.date.clone().year(year);

    if (this.checkIfYearDisabled(date)) {
      return
    }

    this.props.prevView(date, 'year')
  },
  render: function () {
    var currentYears = this.getYears(),
      currYear = this.props.date.year(),
      _class;

    var years = currentYears.map(function (item, i) {
      _class = classnames({
        'year': true,
        'month': true,    //使用month一样的样式
        'disabled': item.disabled,
        'active': item.label == currYear
      });
      return <TdCell value={item.label} classes={_class} key={i} style={{color: (item.disabled ? '#ccc' : 'inherit')}} />
    });
    var yearsWithTr = [];

    yearsWithTr.push(<tr key={-1} style={{height: 25}}></tr>)

    for (var i = 0; i < years.length / 3; i++) {
      var yearsCell = [];
      for (var j = i * 3; j < i * 3 + 3; j++) {
        yearsCell.push(years[j])
      }
      yearsWithTr.push(<tr key={i}>{yearsCell}</tr>)
    }

    yearsWithTr.push(<tr key={i} style={{height: 25}}></tr>)

    var currentDate = [currentYears[0].label, currentYears[currentYears.length - 1].label].join('-');

    return (
      <table className='table-condensed' style={{width: 252}} onKeyDown={this.keyDown}>
        <thead>
          <ViewHeader
            data={currentDate}
            next={this.next}
            prev={this.prev}
            titleAction={this.props.nextView}
            colSpan={1}
          />
        </thead>
        <tbody onClick={this.cellClick}>
          {yearsWithTr}
        </tbody>
      </table>
    )
  }
});

// 日历
var Calendar = React.createClass({
  propTypes: {
    computableFormat: React.PropTypes.string,
    date: React.PropTypes.any,
    minDate: React.PropTypes.any,
    maxDate: React.PropTypes.any,
    format: React.PropTypes.string,
    minView: React.PropTypes.number,
    onChange: React.PropTypes.func,
    closeOnSelect: React.PropTypes.func,
    readonly: React.PropTypes.bool
  },
  getDefaultProps: function(){
    return{
      readonly: false
    }
  },
  getInitialState: function () {
    var date = this.props.date ? moment(this._stringToDate(this.props.date)) : moment(),
      minDate = this.props.minDate ? moment(this._stringToDate(this.props.minDate)) : null,
      maxDate = this.props.maxDate ? moment(this._stringToDate(this.props.maxDate, true)) : null,
      format = this.props.format || 'YYYY-MM-DD',
      minView = parseInt(this.props.minView, 10) || 0,
      computableFormat = this.props.computableFormat || 'YYYY-MM-DD';

    return {
      date: date,
      minDate: minDate,
      maxDate: maxDate,
      format: format,
      computableFormat: computableFormat,
      inputValue: date ? date.format(format) : null,
      views: ['days', 'months', 'years'],
      minView: minView,
      currentView: minView || 0
    }
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({
      date: nextProps.date ? moment(this._stringToDate(nextProps.date)) : this.state.date,
      inputValue: nextProps.date ? moment(this._stringToDate(nextProps.date)).format(this.state.format) : null
    })
  },
  _stringToDate: function (date, max) {
    var newDate = date;
    if (!(newDate instanceof Date)) {
      newDate = new Date(newDate)
    }
    if (max === true) {
      newDate.setHours(23);
      newDate.setMinutes(59);
      newDate.setSeconds(59)
    } else {
      newDate.setHours(0);
      newDate.setMinutes(0);
      newDate.setSeconds(0)
    }
    return newDate
  },
  keyDown: function (e) {
    var _keyDownViewHelper = [{
      prev: false,
      next: true,
      exit: true,
      unit: 'day',
      upDown: 7
    }, {
      prev: true,
      next: true,
      unit: 'months',
      upDown: 3
    }, {
      prev: true,
      next: false,
      unit: 'years',
      upDown: 3
    }];

    const KEYS = {
      backspace: 8,
      enter: 13,
      esc: 27,
      left: 37,
      up: 38,
      right: 39,
      down: 40
    };

    var _viewHelper = _keyDownViewHelper[this.state.currentView];
    var unit = _viewHelper.unit;

    switch (e.keyCode) {
      case KEYS.left:
        this.setDate(this.state.date.subtract(1, unit));
        break;
      case KEYS.right:
        this.setDate(this.state.date.add(1, unit));
        break;
      case KEYS.up:
        this.setDate(this.state.date.subtract(_viewHelper.upDown, unit));
        break;
      case KEYS.down:
        this.setDate(this.state.date.add(_viewHelper.upDown, unit));
        break;
      case KEYS.enter:
        if (_viewHelper.prev)
          this.prevView(this.state.date);
        if (_viewHelper.exit)
          this.setState({
            isVisible: false
          });
        break;
      case KEYS.esc:
        this.setState({
          isVisible: false
        });
        break
    }
  },
  checkIfDateDisabled: function (date) {
    if (this.state.minDate && date.isBefore(this.state.minDate)) {
      return true
    }
    return !!(this.state.maxDate && date.isAfter(this.state.maxDate));

  },
  nextView: function () {
    /*
    if (this.checkIfDateDisabled(this.state.date)) {
      return
    }
    */
    this.setState({
      currentView: ++this.state.currentView
    })
  },
  prevView: function (date, isMonthOrYearView) {
    if (this.state.minDate && date.isBefore(this.state.minDate)) {
      date = this.state.minDate.clone()
    }
    if (this.state.maxDate && date.isAfter(this.state.maxDate)) {
      date = this.state.maxDate.clone()
    }
    if (this.state.currentView === this.state.minView) {
      this.setState({
        date: date,
        inputValue: date.format(this.state.format)
      });
      if (this.props.onChange) {
        this.props.onChange(date.format(this.state.computableFormat))
      }
    } else {
      this.setState({
        date: date,
        currentView: --this.state.currentView
      })
    }

    if (((isMonthOrYearView === 'month' && this.props.minView == 1) || (isMonthOrYearView === 'year' && this.props.minView == 2)) && this.props.closeOnSelect) {
      this.props.closeOnSelect()
    }
  },
  setDate: function (date, isDayView) {
    if(this.props.readonly){
      return
    }

    if (this.checkIfDateDisabled(date)) {
      return
    }

    this.setState({
      date: date,
      inputValue: date.format(this.state.format)
    });
    if (this.props.onChange) {
      this.props.onChange(date.format(this.state.computableFormat))
    }
    if (isDayView && this.props.closeOnSelect) {
      this.props.closeOnSelect()
    }
  },
  todayClick: function () {
    var today = moment().startOf('day');

    if (this.checkIfDateDisabled(today)) {
      return
    }
    this.setState({
      date: today,
      inputValue: today.format(this.state.format),
      currentView: this.state.minView
    });
    if (this.props.onChange) {
      this.props.onChange(today.format(this.state.computableFormat))
    }
  },
  render: function () {
    // 默认值为今天
    var calendarDate = this.state.date || moment(),
      view;

    switch (this.state.currentView) {
      case 0:
        view = <DaysView
                 date={calendarDate}
                 nextView={this.nextView}
                 maxDate={this.state.maxDate}
                 minDate={this.state.minDate}
                 setDate={this.setDate} />;
        break;
      case 1:
        view = <MonthsView
                 date={calendarDate}
                 nextView={this.nextView}
                 maxDate={this.state.maxDate}
                 minDate={this.state.minDate}
                 prevView={this.prevView}
                 setDate={this.setDate} />;
        break;
      case 2:
        view = <YearsView
                 date={calendarDate}
                 maxDate={this.state.maxDate}
                 minDate={this.state.minDate}
                 prevView={this.prevView}
                 setDate={this.setDate} />;
        break
    }

    var todayText = moment.locale() === 'zh-cn' ? '今天' : 'Today';
    var calendar =
    <div className={'calendar'} onClick={this.calendarClick}>
      {view}
      {this.props.minView == 0 ?
        <div className={(this.checkIfDateDisabled(moment().startOf('day')) ? ' disabled' : '')} onClick={this.todayClick} style={{textAlign: 'center', cursor: 'pointer', paddingTop: 8, paddigBottom: 4}}>{todayText}</div>
      : null}
    </div>;

    return (
      <div
        className={classnames({'daterangepicker': true, 'show-calendar': true}, this.props.className)}
        style={assign({}, this.props.style)}>
        {calendar}
      </div>
    )
  }
});

module.exports = Calendar;
