import '../css/quill.snow.css';

import sharedb from 'sharedb/lib/client'
import richText from 'rich-text'
import Quill from 'quill'
sharedb.types.register(richText.type);

var socket = new WebSocket('ws://' + window.location.host);
var connection = new sharedb.Connection(socket);
alert("In client");
//socket = io.connect();
// For testing reconnection
/*
window.disconnect = function() {
  connection.close();
};
window.connect = function() {
  var socket = new WebSocket('ws://' + window.location.host);
  connection.bindToSocket(socket);
};*/

// Create local Doc instance mapped to 'examples' collection document with id 'richtext'
var doc = connection.get('examples', 'richtext');
doc.subscribe(function(err) {
  if (err) throw err;
  var quill = new Quill('#editor', {theme: 'snow'});
  quill.setContents(doc.data);
  quill.on('text-change', function(delta, oldDelta, source) {
    if (source !== 'user') return;
    doc.submitOp(delta, {source: quill});
  });
  doc.on('op', function(op, source) {
    if (source === quill) return;
    quill.updateContents(op);
  });
});