var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var swig  = require('swig');

var MessageValidator = require("./model/MessageValidator");

function twoDigits(d) {
	if(0 <= d && d < 10) return "0" + d.toString();
	if(-10 < d && d < 0) return "-0" + (-1*d).toString();
	return d.toString();
}

Date.prototype.toMysqlFormat = function() {
	return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

Date.prototype.toMysqlTimeStamp = function() {
	return this.getUTCFullYear() + "_" + twoDigits(1 + this.getUTCMonth()) + "_" + twoDigits(this.getUTCDate()) + "-" + twoDigits(this.getUTCHours()) + "" + twoDigits(this.getUTCMinutes()) + "" + twoDigits(this.getUTCSeconds());
};


io.on('connection', function(socket) {
    socket.on('container message', function(msg) {
        io.emit('container message', msg);
    });
});


app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });

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
	res.render('index', {
		appTitle: 'Market trade processor',
		tableTitle: 'Messages'
	});
});

app.post('/api/messsage', function(req, res) {

	var rawBody = req.rawBody;

	try {
		var MsgValidator = new MessageValidator();

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

		/* save files on file system */
		var fs = require('fs');
		var outputFilename = './app/messages/'+new Date().toMysqlTimeStamp()+'_msg.json';

		fs.writeFile(outputFilename, JSON.stringify(rawBody, null, 4), function(err) {
			if(err) {
				throw new Error('Error writing file on file system: '+err);
			}
		});

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
