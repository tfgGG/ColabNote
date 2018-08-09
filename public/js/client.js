import '../css/quill.snow.css';

import $ from 'jquery'
import sharedb from 'sharedb/lib/client'
import richText from 'rich-text'
import Quill from 'quill'
 require('./comment')


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
var noteid = $("#editor").attr('class');
console.log(noteid);
// Create local Doc instance mapped to 'examples' collection document with id 'richtext'
var doc = connection.get('examples', noteid);
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






       