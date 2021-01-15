# Market trade processor

JSON messages will be POSTed to a REST endpoint.

Posted messages will be added to the frontend table and paginated dynamically with datatable.

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
