'use strict';

module.exports = class MessageValidator {

  constructor() {
    this.decodedMessage = null;
  }

  checkMessageIsNotEmpty(message) {
    if (!message || typeof message == 'undefined') {
      throw new Error('The message is empty');
    }
  }

  decodeMessage(message) {
    try {
      this.decodedMessage = JSON.parse(message);
      return this.decodedMessage;
    } catch (e) {
      throw new Error("Wrong format: the message is not a valid JSON string");
    }
  }

  getDecodedMessage() {
    return this.decodedMessage;
  }

  validateUserId() {
    if (!this.decodedMessage.userId) {
      throw new Error('The userId is not set');
    }
  }

  validateCurrencyFrom() {
    if (!this.decodedMessage.currencyFrom) {
      throw new Error('Insert CurrencyFrom');
    }
  }

  validateCurrencyTo() {
    if (!this.decodedMessage.currencyTo) {
      throw new Error('Insert CurrencyTo');
    }
  }

  validateAmountSell() {
    if (!this.decodedMessage.amountSell) {
      throw new Error('Insert amountSell');
    }
  }

  validateAmountBuy() {
    if (!this.decodedMessage.amountBuy) {
      throw new Error('Insert amountBuy');
    }
  }

  validateRate() {
    if (!this.decodedMessage.rate) {
      throw new Error('Insert rate');
    }
  }

  validateTimePlaced() {
    if (!this.decodedMessage.timePlaced) {
      throw new Error('Insert timePlaced');
    }
  }

  validateOriginatingCountry() {
    if (!this.decodedMessage.originatingCountry) {
      throw new Error('Insert originatingCountry');
    }
  }
}

