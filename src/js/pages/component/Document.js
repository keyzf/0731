var React = require('react')
var Highlight = require('react-highlight')
var Remarkable = require('remarkable');

module.exports = React.createClass({
  render: function () {
    var md = new Remarkable({
      html:         false,        // Enable HTML tags in source
      xhtmlOut:     false,        // Use '/' to close single tags (<br />)
      breaks:       false,        // Convert '\n' in paragraphs into <br>
      langPrefix:   'language-',  // CSS language prefix for fenced blocks
      linkify:      false,        // Autoconvert URL-like text to links

      // Enable some language-neutral replacement + quotes beautification
      typographer:  false,

      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
      quotes: '“”‘’',

      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed
      highlight: function (/*str, lang*/) { return ''; }
    });

    var str = md.render(require('!raw-loader!../../../wiki/' + this.props.src))
    return (
      <div className='markdown'>
        <div dangerouslySetInnerHTML={{__html: str}} />
      </div>
    )
  }
})
