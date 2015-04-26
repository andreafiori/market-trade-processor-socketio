var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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
    
	var rawBody = req.rawBody;
	var jsonParse = '';
	var error = '';
	
	// check if the message is not empty
	if (!rawBody || 0 === rawBody.length) {
		res.statusCode = 400;
		res.type('application/json');
		return res.send('{"message": "The message is empty"}');
	}
	
	// check if the message is a valid JSON string
	try {
		var rawBodyJson = JSON.parse(rawBody);
	} catch (e) {
		res.statusCode = 400;
		res.type('application/json');
		return res.send('{"message": "Wrong format: the message is not a valid JSON string"}');
	}
	
	/* Validate JSON values */
	if (!rawBodyJson.userId) {
		res.statusCode = 400;
		res.type('application/json');
		return res.send('{"message": "Insert UserId"}');
	}
	
	if (!rawBodyJson.currencyFrom) {
		res.statusCode = 400;
		res.type('application/json');
		return res.send('{"message": "Insert CurrencyFrom"}');
	}
	
	if (!rawBodyJson.currencyTo) {
		res.statusCode = 400;
		res.type('application/json');
		return res.send('{"message": "Insert CurrencyTo"}');
	}
	
	if (!rawBodyJson.amountSell) {
		res.statusCode = 400;
		res.type('application/json');
		return res.send('{"message": "Insert amountSell"}');
	}
	
	if (!rawBodyJson.amountBuy) {
		res.statusCode = 400;
		res.type('application/json');
		return res.send('{"message": "Insert amountBuy"}');
	}
	
	if (!rawBodyJson.rate) {
		res.statusCode = 400;
		res.type('application/json');
		return res.send('{"message": "Insert rate"}');
	}
	
	if (!rawBodyJson.timePlaced) {
		res.statusCode = 400;
		res.type('application/json');
		return res.send('{"message": "Insert timePlaced"}');
	}
	
	if (!rawBodyJson.originatingCountry) {
		res.statusCode = 400;
		res.type('application/json');
		return res.send('{"message": "Insert originatingCountry"}');
	}
	
	io.emit('container message', rawBodyJson);
	
	res.statusCode = 200;
	res.type('application/json');
	return res.send('{"message": "The message has been sent"}');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
