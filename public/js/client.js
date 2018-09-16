/*

import $ from 'jquery';
import sharedb from 'sharedb/lib/client';
import richText from 'rich-text';
import Quill from 'quill';
require('./main');*/

/*
sharedb.types.register(richText.type);

var socket = new WebSocket('ws://' + window.location.host);
var connection = new sharedb.Connection(socket);

//Get note page hash index
var noteid = $("#editor").attr('class');
console.log("awdawd"+noteid);

var doc = connection.get('note', noteid);
//var commentdoc = connection.get('comment',noteid);

//console.log("comment:"+commentdoc.id);

doc.subscribe(function(err) {
  
  if (err) throw err;
  var quill = new Quill('#editor', {theme: 'snow'});
  quill.setContents(doc.data);
  quill.on('text-change', function(delta, oldDelta, source) {
    if (source !== 'user') return;
    doc.submitOp(delta, {source: quill});
  });

  quill.on('editor-change', function(eventName, ...args) {
    var range = quill.getSelection();
 
    var text = quill.getText(range.index, range.length);
    console.log('position ', range.index);
  });

  doc.on('op', function(op, source) {
    if (source === quill) return;
    quill.updateContents(op);
  });
});
*/

/*---
comment broadcast
----*/
/*
commentdoc.subscribe(function(err){

    if (err) throw err;
    commentdoc.on('op',function(op){
        console.log()
    });
});

function sendcomment(user,comment){
  commnentdoc.submitOp([{p: ['comment','0'], si:$("#comment").text}]);
}
*/
//export {commentdoc};




       