var express = require('express');
var app = express();
var cors = require('cors')
var exphbs  = require('express-handlebars');
var richText = require('rich-text');
var WebSocket = require('ws');
var WebSocketJSONStream = require('websocket-json-stream');
var path = require('path')
var Hashids = require('hashids')
var axios = require('axios')
var fs = require('fs');
var session = require('express-session')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

//require("@babel/polyfill");
//var S = require('./lib/utils')
var ClientOAuth2 = require('client-oauth2')
 
var githubAuth = new ClientOAuth2({
  clientId: 'pO4KY0nZD8kiwkWf9ygYPD1O8bXmzYBu1gxlLV5F',
  clientSecret: 'bp8Ofj8BMLuKmXASCiySFDRFAkOwuIK5fhx64C8a2O9Ip5OSi7ZIFkRquX4Vd9XMBZbtCqMtQyv7OYNYKm7fNjmi1IE3n7Jgk7OA9G9mKiMhRedE5NXRglvsFhGOATJZ',
  accessTokenUri: 'http://140.136.150.93/o/token/',
  authorizationUri: 'http://140.136.150.93/o/authorize/',
  redirectUri: 'http://140.136.150.93:3000/auth/github/callback',
  scopes: ['notifications', 'gist']
})
var editorhtml = fs.readFileSync("./views/Editor/main.html")
var plannerhtml= fs.readFileSync("./views/Planner/main.html")

var ShareDB = require('sharedb');
var backend = new ShareDB();
ShareDB.types.register(richText.type);

app.set('ip', '140.136.150.93')
app.set('views', path.join(__dirname, '/views'))
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('port',process.env.PORT||3000);
app.use(express.static(__dirname +'/public'))
app.use(cors());

var server = app.listen(app.get('port'),app.get('ip'));
//var io = require('socket.io')(server);

var wss = new WebSocket.Server({server: server});
wss.on('connection', function(ws, req) {
  var stream = new WebSocketJSONStream(ws)
  backend.listen(stream);
});


app.get('/api/:id',function(req,res){
    res.cookie('user', req.params.id);
    res.send("User" + req.params.id)
})

app.get("/auth/github/",function(req,res){
    var uri = githubAuth.code.getUri()
        console.log("/auth/github/")
        res.redirect(uri)
})

   
app.get('/auth/github/callback', function (req, res) {
    console.log("CALLBACK")
    console.log(req.originalUrl)
    githubAuth.code.getToken(req.originalUrl)
      .then(function(user) {
        console.log("USER")
        //console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... }
       // axios.defaults.headers = {'Authorization' :"Bearer "+user.accessToken};
        // Refresh the current users access token.
        //user.refresh().then(function (updatedUser) {
         // console.log(updatedUser !== user) //=> true
          //console.log(updatedUser.accessToken)

        // Sign API requests on behalf of the current user.
        user.sign({
          method: 'get',
          url: 'http://localhost:8000/upload/note/12',
        })
       //var r =  req.query.code  
       axios.defaults.headers.common['Authorization'] = 'Baerer '+user.accessToken
       console.log(user.accessToken)

       //localStorage.setItem('myFirstKey', user.accessToken);
       //console.log(localStorage.getItem('myFirstKey'));
      
       return user.accessToken
      
       
    }).then((tok)=>{
        res.cookie('accesstoken', tok,{domain:'140.136.150.93', maxAge: 1000000 });
        res.redirect('http://140.136.150.93/upload/index')
    })
    

})



app.get('/', function (req, res) {
    res.send('Hello World!');
});
  
app.get('/note/:noteid/1/',function(req,res,next){

    var hashids = new Hashids("",6)
    var newhash1 = hashids.encode(req.params.noteid)
    //console.log(newhash1)
    //console.log(newhash2)
    var newhash2 = hashids.encode(req.params.noteid*100 + 1) 
    res.redirect('../../'+ newhash1+'/'+ newhash2)
})


app.get('/note/:noteid/:id',function(req,res,next){
    /*if(req.session.islogin == 0 || req.session.islogin == null){
        console.log("YES!!")
        req.session.islogin = "/note/"+req.params.noteid+'/'+req.params.id
        console.log(req.session.islogin)
        var uri = githubAuth.code.getUri()
        console.log("/auth/github/")
        res.redirect(uri)
    } */
   // else{
         res.cookie('some_cross_domain_cookie', 'http://mysubdomain.example.com',{domain:'140.136.150.93:3000'});
        console.log(req.session.islogin)
        next();
    //}
    
},function(req,res,next){
    createDoc(req.params.noteid,req.params.id)
    console.log(req.params.noteid +" "+req.params.id);
    res.writeHeader(200,{'Content-Type':'text/html'});
    res.write(editorhtml); // response board.html
    res.end()
})

/*
app.get('/auth/github', function (req, res) {
    var uri = githubAuth.code.getUri()
    console.log("/auth/github/")
    res.redirect(uri)
})*/

app.get('/message/:id',function(req,res,next){
    
    createMessageDoc(req.params.id)
    res.writeHeader(200,{'Content-Type':'text/html'});
    res.write(plannerhtml); // response board.html
    res.end();
})

app.use(function(req,res){
    res.status(404);
    res.type('text/plain');
    res.send('404-Notfound');
})

// New Note
function createDoc(noteid,id) 
{
    var connection = backend.connect();

    var doc = connection.get(noteid, id);
    var commentdoc = connection.get('comment', noteid);

    doc.fetch(function(err) {
      if (err) throw err;
      if (doc.type === null) {
        doc.create([], 'rich-text');
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
    console.log("comment"+commentdoc.id+ " "+　noteid+ doc.id);
}
function createMessageDoc(teamid){

    var connection = backend.connect();
    var mdoc = connection.get('message', teamid);
    console.log(teamid)

    mdoc.fetch(function(err) {
        if (err) throw err;
        if (mdoc.type === null) {
            mdoc.create({message:[]});
        return;
      }
    });
}

/*
var service = new S.Service()
service.get('/upload/RESTdetail/27/',init)

function init(a,b){
    console.log("----a--b---")
    console.log(a)
    console.log(b)
    console.log("----a--b---")
}*/


/*
axios.get('/upload/RESTdetail/27/')
.then((response)=> {
  console.log("Node App")
  console.log(response.data)
    
})
.catch(function (error) {
    console.log("Get Detail error"+ error);
});*/