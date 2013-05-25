var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var catchPhrases = [
    'Why i oughta...',
    'Nyuk Nyuk!',
    'Poifect!',
    'spread out!',
    'Say a few syllables!',
    'Soitenly!'
];

app.set('view engine', 'jade');
app.set('view options', {layout: true});
app.set('views', __dirname + '/views');

app.get('/stooges/chat', function(req,res,next){
    res.render('chat');
});

app.get('/js/jquery.js', function(req,res,next){
    res.sendfile(__dirname + '/lib/jquery/jquery-1.9.1.min.js');
});

io.sockets.on('connection', function(socket){
    var sendChat = function(title, text){   
        socket.emit('chat',{
            title: title,
            contents: text
        });
    };
    setInterval(function(){
        var randomIndex = Math.floor(Math.random()*catchPhrases.length);
        sendChat('Stooge', catchPhrases[randomIndex]);
    }, 5000);
    sendChat('Welcome to Stooge Chat', 'The Stooges are on the line');
    socket.on('chat', function(data){
        sendChat('You', data.text);
    });
});

app.get('/?', function(req,res){
    res.render('index');
});

var port = 8080;
server.listen(port);

console.log('Listening on port ' + port);