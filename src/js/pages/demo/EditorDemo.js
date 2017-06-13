var React = require('react')
var TinyMCE = require('radmin/extensions/tinymce');

module.exports = React.createClass({
	_onEditorChange: function (e) {
		console.log(e.target.getContent())
	},
	render: function () {
		return (
			<TinyMCE content='<p>This is the initial content of the editor</p>' config={{
                 menubar: false,
                 plugins: [
                 'advlist autolink lists link image charmap print preview anchor',
                 'searchreplace visualblocks code fullscreen',
                 'insertdatetime media table contextmenu paste code'
                 ],
                 toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
                 }} onChange={this._onEditorChange}
                />
        )
	}

})