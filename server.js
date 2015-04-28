var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var MessageValidator = require("./lib/model/MessageValidator");

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

	try {
		var MsgValidator = new MessageValidator();

		// decode message checking if the message is a valid JSON string
		MsgValidator.checkMessageIsNotEmpty(rawBody);
		MsgValidator.decodeMessage(rawBody);
		MsgValidator.validateUserId();
		MsgValidator.validateCurrencyFrom();
		MsgValidator.validateCurrencyTo();
		MsgValidator.validateAmountSell();
		MsgValidator.validateAmountBuy();
		MsgValidator.validateRate();
		MsgValidator.validateTimePlaced();
		MsgValidator.validateOriginatingCountry();

		io.emit('container message', MsgValidator.decodedMessage);

		res.statusCode = 200;
		res.type('application/json');
		return res.send('{"message": "The message has been sent"}');

	} catch (e) {
		res.statusCode = 400;
		res.type('application/json');
		return res.send('{"message": "'+ e.message+'"}');
	}

});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
