# Market trade processor

[![Build Status](https://travis-ci.com/andreafiori/market-trade-processor-socketio.svg?branch=master)](https://travis-ci.com/andreafiori/market-trade-processor-socketio)

A NodeJS \ Express \ Socket.io application that receives JSON messages sent via HTTP POST request.
JSON input messages are validated before the request is completed.
Posted messages will be added to a frontend table and paginated dynamically with Datatable.
Messages are store in json files and their names have the format of a MySQL timestamp.

## Install and run the node server

To install the application, you need node.js and run:

    npm install

This will install socket.io and express modules.

Run the web server:

    npm start

Access the web server:

    http://localhost:3000/

## Frontend

I'm using swig template engine. All html views are in the views directory.

## Send message

This endpoint will accept a raw POST string in JSON format:

    http://localhost:3000/api/messsage

JSON string message format:

    {
        "userId": "1235",
        "currencyFrom": "AUD",
        "currencyTo": "USD",
        "amountSell": 1250,
        "amountBuy": 830.20,
        "rate": 0.5431,
        "timePlaced": "10-APR-15 11:00:24",
        "originatingCountry" : "US"
    }

## Tests

Unit tests are written with Mocha:

    npm test

If you need to install Mocha:

    npm install --global mocha
