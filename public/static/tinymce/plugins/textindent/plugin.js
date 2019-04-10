;(function(tinymce) {
  tinymce.PluginManager.add('textindent', function(editor, url) {
    var _editor         = tinymce.activeEditor,
      bfontSize         = document.body.currentStyle ? document.body.currentStyle['fontSize'] : document.defaultView.getComputedStyle(document.body, false)['fontSize'],
      iu,
      iv;
    editor.addButton('textindent', {
      icon: 'indent',
      tooltip: 'Text Indent',
      onclick: function() {
        var _selection     = _editor.selection,
          _dom                = _editor.dom,
          _selectionStyle = _selection.getNode().style,
          allinline            = _dom.select('p'),
          _content           = _selection.getContent();
        // console.log(allinline)
        // console.log(_selectionStyle)
        iu = /[a-z%]+$/i.exec(bfontSize)
        iv = parseInt(bfontSize) * 2
        if (_selectionStyle.textIndent === '' || _selectionStyle.textIndent === 'undefined') {
          _dom.setStyle(allinline, 'text-indent', iv + iu)
        } else {
          _dom.setStyle(allinline, 'text-indent', '')
        }
      }
    });
  })
})(tinymce)