var express = require('express');
var app = express();

var Client = require('node-rest-client').Client;
var exphbs  = require('express-handlebars');
var richText = require('rich-text');
var WebSocket = require('ws');
var WebSocketJSONStream = require('websocket-json-stream');
var path = require('path')


var ShareDB = require('sharedb');
var backend = new ShareDB();
ShareDB.types.register(richText.type);

app.set('views', path.join(__dirname, '/views'))
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('port',process.env.PORT||3000);
app.use(express.static(__dirname +'/public'))

var server = app.listen(app.get('port'));
//var io = require('socket.io')(server);

var wss = new WebSocket.Server({server: server});
wss.on('connection', function(ws, req) {
  var stream = new WebSocketJSONStream(ws)
  backend.listen(stream);
});

  
app.get('/note/:id', function (req, res, next) {
    
    createDoc(req.params.id);
    res.render('main',{layout: false });
});

app.get('/note/:noteid/:id',function(req,res,next){
    createDoc(req.params.noteid,req.params.id);
    res.render('main',{layout: false });
});


app.use(function(req,res){
    res.status(404);
    res.type('text/plain');
    res.send('404-Notfound');
})

function createDoc(noteid,id) 
{
    var connection = backend.connect();
    var doc = connection.get(noteid, id);
    var commentdoc = connection.get('comment', id);
    doc.fetch(function(err) {
      if (err) throw err;
      if (doc.type === null) {
        doc.create([{insert: 'Hi!'}], 'rich-text');
        return;
      }
      //callback();
    });
    
    commentdoc.fetch(function(err) {
        if (err) throw err;
        if (commentdoc.type === null) {
            commentdoc.create({comment:[]});
        return;
      }
    });
    console.log("comment"+commentdoc.id+" note"+ doc.id);
}

