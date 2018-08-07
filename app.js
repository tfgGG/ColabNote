var express = require('express');
var app = express();
var io = require('socket.io');
var Client = require('node-rest-client').Client;
var exphbs  = require('express-handlebars');
var richText = require('rich-text');
var WebSocket = require('ws');
var WebSocketJSONStream = require('websocket-json-stream');
var path = require('path')

var data = require('./lib/getdata')

var ShareDB = require('sharedb');
var backend = new ShareDB();
ShareDB.types.register(richText.type);

app.set('views', path.join(__dirname, '/views'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('port',process.env.PORT||3000);
app.use(express.static(__dirname +'/public'))

var server = app.listen(app.get('port'));

var wss = new WebSocket.Server({server: server});
wss.on('connection', function(ws, req) {
  var stream = new WebSocketJSONStream(ws);
  backend.listen(stream);
});




app.get('/', function (req, res, next) {
    res.render('home', {layout: false});
});

app.get('/note/:id', function (req, res, next) {
    //opnen new doc on sharejs
    var newid = req.params.id;
    createDoc(newid);
    var comment =  data.getcomment(newid);
    res.render('home', {layout: false,name:newid, comment:comment });
});


app.use(function(req,res){
    res.status(404);
    res.type('text/plain');
    res.send('404-Notfound');
})

/*
app.listen(app.get('port'),function(){
    console.log("Started on server"+ app.get('port'));
})*/


function createDoc(newid) 
{
    var connection = backend.connect();
    var doc = connection.get('examples', newid);
    doc.fetch(function(err) {
      if (err) throw err;
      if (doc.type === null) {
        doc.create([{insert: 'Hi!'}], 'rich-text');
        return;
      }
      //callback();
    });
}

