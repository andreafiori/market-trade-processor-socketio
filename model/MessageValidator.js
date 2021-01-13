function MessageValidator() {

  var decodedMessage;

  this.checkMessageIsNotEmpty = function (message) {
    if (!message || typeof message == 'undefined') {
      throw new Error('The message is empty');
    }
  }

  this.decodeMessage = function (message) {
    try {
      this.decodedMessage = JSON.parse(message);

      return this.decodedMessage;
    } catch (e) {
      throw new Error("Wrong format: the message is not a valid JSON string");
    }
  }

  this.getDecodedMessage = function () {
    return this.decodedMessage;
  }

  this.assertDecodedMessage = function () {
    if (!this.decodedMessage) {
      throw new Error('The message is not dedoded into a JSON parsed message');
    }
  }

  this.validateUserId = function () {
    if (!this.decodedMessage.userId) {
      throw new Error('The userId is not set');
    }
  }

  this.validateCurrencyFrom = function () {
    if (!this.decodedMessage.currencyFrom) {
      throw new Error('Insert CurrencyFrom');
    }
  }

  this.validateCurrencyTo = function () {
    if (!this.decodedMessage.currencyTo) {
      throw new Error('Insert CurrencyTo');
    }
  }

  this.validateAmountSell = function () {
    if (!this.decodedMessage.amountSell) {
      throw new Error('Insert amountSell');
    }
  }

  this.validateAmountBuy = function () {
    if (!this.decodedMessage.amountBuy) {
      throw new Error('Insert amountBuy');
    }
  }

  this.validateRate = function () {
    if (!this.decodedMessage.rate) {
      throw new Error('Insert rate');
    }
  }

  this.validateTimePlaced = function () {
    if (!this.decodedMessage.timePlaced) {
      throw new Error('Insert timePlaced');
    }
  }

  this.validateOriginatingCountry = function () {
    if (!this.decodedMessage.originatingCountry) {
      throw new Error('Insert originatingCountry');
    }
  }
}

module.exports = MessageValidator;
