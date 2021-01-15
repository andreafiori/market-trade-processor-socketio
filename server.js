const express = require('express');
const app = express();
// const helmet = require('helmet');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('./model/utils/FileSystemUtils');
require('./model/utils/Date.prototype.toMysqlTimeStamp');
const swig = require('swig');

const MessageValidator = require('./model/MessageValidator');

// app.use(helmet()); // Error loading CDN...

io.on('connection', function (socket) {
  socket.on('container message', function (msg) {
    io.emit('container message', msg);
  });
});

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);

app.use(function (req, res, next) {

  var contentType = req.headers['content-type'] || '';
  var mime = contentType.split(';')[0];

  if (mime !== 'text/plain') {
    return next();
  }

  var data = '';
  req.setEncoding('utf8');
  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', function () {
    req.rawBody = data;
    next();
  });
});

app.get('/', async (req, res) => {
  const dirPath = './app/messages';
  const fileContents = [];

  /**
   * Read all json files in the directory, filter out those needed to process.
   * Using Promise.all to time when all async readFiles has completed
   */
  fs.readdirAsync(dirPath).then(function (filenames) {
    filenames = filenames.filter(function isValidMsgFile(filename) {
      return (filename.split('.')[1] === 'json');
    });

    return Promise.all(filenames.map(function (filename) {
      return fs.readFileAsync(dirPath + '/' + filename, 'utf8');
    }));

  }).then(function (files) {

    files.forEach(function(file) {
      var jsonFile = JSON.parse(file);
      fileContents.push(jsonFile);
    });

    res.render('index', {
      fileContents: fileContents,
    });

  }).catch(err => {
    console.log('Error reading files messages', err);

    res.render('index', {
      error: err,
      fileContents: fileContents,
    });
  });

});

app.post('/api/messsage', function (req, res) {

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

    /* save files on file system */
    var outputFilename = './app/messages/' + new Date().toMysqlTimeStamp() + '_msg.json';
    fs.writeFile(outputFilename, JSON.stringify(MsgValidator.decodedMessage, null, 4), function (err) {
      if (err) {
        throw new Error('Error writing file on file system: ' + err);
      }

      // Trigger event for socket and frontend
      io.emit('container message', MsgValidator.decodedMessage);
    });

    res.statusCode = 200;
    res.type('application/json');
    return res.send('{"message": "The message has been sent"}');

  } catch (e) {
    res.statusCode = 400;
    res.type('application/json');
    return res.send('{"message": "' + e.message + '"}');
  }

});

app.engine('html', swig.renderFile);
swig.setDefaults({
  cache: false
});

app.locals.appTitle = 'Market trade processor';
app.locals.tableTitle = 'Messages';

http.listen(3000, function () {
  console.log('listening on *:3000');
});
