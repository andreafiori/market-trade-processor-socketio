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

POST endpoint
-----------------------------

This endpoint will accept a raw POST string in JSON format:

	http://localhost:3000/api/messsage

TODO
-----------------------------

- Validate posted messages data and JSON string
- Save posted messages on file system after the POST call on the endpoint
- Read files and transform contents into table rows on datatable for the first data listing
- Transform data and build some graphs
- Testing with Jasmine, Mocha or Chai frameworks
