var assert = require('assert');

const MessageValidator = require("../model/MessageValidator");

describe('MessageValidator tests', function () {

  beforeEach(function (done) {
    this.msgValidator = new MessageValidator();
    done();
  });

  afterEach(function (done) {
    done();
  });

  describe('Message Validator string decode and validation', function () {

    it('decode a valid JSON string', function () {
      assert.notDeepStrictEqual(
        this.msgValidator.decodeMessage('{"name": "John"}'), '{"name": "John"}');
    });

    it('should get the userId from the decoded JSON string', function () {
      this.msgValidator.decodeMessage('{"notId": "123"}');

      assert.throws(
        () => this.msgValidator.validateUserId(),
        Error
      );
    });

    it('currencyFrom value should be in the JSON string', function () {
      this.msgValidator.decodeMessage('{"currencyFromWRONG": "USD"}');

      assert.throws(
        () => this.msgValidator.validateCurrencyFrom(),
        Error
      );
    });

    it('currencyTo value should be in the JSON string', function () {
      this.msgValidator.decodeMessage('{"currencyToWRONG": "EUR"}');

      assert.throws(
        () => this.msgValidator.validateCurrencyTo(),
        Error
      );
    });

    it('amountBuy value should be in the JSON string', function () {
      this.msgValidator.decodeMessage('{"amountBuyWRONG": "1245"}');

      assert.throws(
        () => this.msgValidator.validateAmountBuy(),
        Error
      );
    });

    it('amountSell value should be in the JSON string', function () {
      this.msgValidator.decodeMessage('{"amountSellWRONG": "1245"}');

      assert.throws(
        () => this.msgValidator.validateAmountSell(),
        Error
      );
    });

    it('rate value should be in the JSON string', function () {
      this.msgValidator.decodeMessage('{"rateWRONG": "0.4211"}');

      assert.throws(
        () => this.msgValidator.validateRate(),
        Error
      );
    });

    it('timePlaced value should be in the JSON string', function () {
      this.msgValidator.decodeMessage('{"timePlacedWRONG": "10-APR-15 11:00:24"}');

      assert.throws(
        () => this.msgValidator.validateTimePlaced(),
        Error
      );
    });

    it('originatingCountry value should be in the JSON string', function () {
      this.msgValidator.decodeMessage('{"originatingCountryWRONG": "IT"}');

      assert.throws(
        () => this.msgValidator.validateOriginatingCountry(),
        Error
      );
    });
  });

});
