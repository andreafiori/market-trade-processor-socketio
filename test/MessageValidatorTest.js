var assert = require("assert");

MessageValidator = require("../model/MessageValidator.js");

describe('MessageValidator tests', function() {

	beforeEach(function(done) {
		this.testMessageValidator = new MessageValidator();
		done();
	});

	afterEach(function(done) {
		done();
	});

	describe('Message Validator string decode and validation', function() {

		it('decode a valid JSON string', function() {
			assert.notDeepEqual(
				this.testMessageValidator.decodeMessage('{"name": "John"}'),
				'{"name": "John"}'
			);
		});

		it('should get the userId from the decoded JSON string', function() {
			this.testMessageValidator.decodeMessage('{"userId": "123"}');

			assert.throws(
				this.testMessageValidator.validateUserId(),
				Error
			);
		});

		it('should get the userId from the decoded JSON string', function() {
			this.testMessageValidator.decodeMessage('{"userId": "123"}');

			assert.throws(
				this.testMessageValidator.validateUserId(),
				Error
			);
		});

		it('assertDecodedMessage should throw Error exception', function() {
			this.testMessageValidator.decodeMessage('{"userId": "123"}');

			assert.throws(
				this.testMessageValidator.assertDecodedMessage(),
				Error
			);
		});

		it('userId value should be in the JSON string', function() {
			this.testMessageValidator.decodeMessage('{"userId": "123"}');

			assert.throws(
				this.testMessageValidator.validateUserId(),
				Error
			);
		});

		it('currencyFrom value should be in the JSON string', function() {
			this.testMessageValidator.decodeMessage('{"currencyFrom": "USD"}');

			assert.throws(
				this.testMessageValidator.validateCurrencyFrom(),
				Error
			);
		});

		it('currencyTo value should be in the JSON string', function() {
			this.testMessageValidator.decodeMessage('{"currencyTo": "EUR"}');

			assert.throws(
				this.testMessageValidator.validateCurrencyTo(),
				Error
			);
		});

		it('amountBuy value should be in the JSON string', function() {
			this.testMessageValidator.decodeMessage('{"amountBuy": "1245"}');

			assert.throws(
				this.testMessageValidator.validateAmountBuy(),
				Error
			);
		});

		it('amountSell value should be in the JSON string', function() {
			this.testMessageValidator.decodeMessage('{"amountSell": "1245"}');

			assert.throws(
				this.testMessageValidator.validateAmountSell(),
				Error
			);
		});

		it('rate value should be in the JSON string', function() {
			this.testMessageValidator.decodeMessage('{"rate": "0.4211"}');

			assert.throws(
				this.testMessageValidator.validateRate(),
				Error
			);
		});

		it('timePlaced value should be in the JSON string', function() {
			this.testMessageValidator.decodeMessage('{"timePlaced": "10-APR-15 11:00:24"}');

			assert.throws(
				this.testMessageValidator.validateTimePlaced(),
				Error
			);
		});

		it('originatingCountry value should be in the JSON string', function() {
			this.testMessageValidator.decodeMessage('{"originatingCountry": "IT"}');

			assert.throws(
				this.testMessageValidator.validateOriginatingCountry(),
				Error
			);
		});
	});

});