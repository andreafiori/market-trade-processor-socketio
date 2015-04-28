Market trade processor
=============================

[![Build Status](https://travis-ci.org/andreafiori/market-trade-processor-socketio.svg?branch=master)](https://travis-ci.org/andreafiori/market-trade-processor-socketio)

This socket.io application will list messages posted using a REST POST call.

Posted messages will be added to the frontend table and paginated dynamically with datatable.

Install and run the node server 
---------------------------------

To install the application, you need node.js and run:

	npm install

This will install socket.io and express modules.

To run the web server:

	node server.js

The HTTP server will be:

	http://localhost:3000/

Frontend
-----------------------------

I'm using swig template engine. All html views are in the views directory.

POST endpoint
-----------------------------

This endpoint will accept a raw POST string in JSON format:

	http://localhost:3000/api/messsage

Tests
-----------------------------

Unit tests are written with Mocha:

	mocha

TODO
-----------------------------

- 
- Transform data into some graphs
