var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var client = require('socket.io-client');

io.on('connection', function(socket) {
    socket.on('container message', function(msg) {
        io.emit('container message', msg);
    });
});

app.use(function(req, res, next) {

    var contentType = req.headers['content-type'] || '', mime = contentType.split(';')[0];

    if (mime != 'text/plain') {
        return next();
    }

    var data = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        data += chunk;
    });
    req.on('end', function() {
        req.rawBody = data;
        next();
    });
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/api/messsage', function(req, res) {
    
	io.emit('container message', JSON.parse(req.rawBody));
	
	res.statusCode = 200;
    res.type('application/json');
    return res.send(JSON.parse(req.rawBody));
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
