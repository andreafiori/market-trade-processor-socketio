var io = require('socket.io-client'),
  expect = require('expect.js');

describe('Suite of unit tests', function () {

  var socket;

  beforeEach(function (done) {
    socket = io.connect('http://localhost:3000', {
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection': true
    });
    socket.on('connect', function () {
      console.log('worked...');
      done();
    });
    socket.on('disconnect', function () {
      console.log('disconnected...');
    });

    done();
  });

  afterEach(function (done) {
    // Clean up
    if (socket.connected) {
      console.log('disconnecting...');
      socket.disconnect();
    } else {
      console.log('No connection to break...');
    }
    done();
  });

  describe('First (hopefully useful) test', function () {

    it('Doing some things with indexOf()', function (done) {
      expect([1, 2, 3].indexOf(5)).to.be.equal(-1);
      expect([1, 2, 3].indexOf(0)).to.be.equal(-1);
      done();
    });

    it('Doing something else with indexOf()', function (done) {
      expect([1, 2, 3].indexOf(5)).to.be.equal(-1);
      expect([1, 2, 3].indexOf(0)).to.be.equal(-1);
      done();
    });

  });

});