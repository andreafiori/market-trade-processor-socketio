REPORTER = spec

test:
		@./node_modules/.bin/mocha \
			--reporter $(REPORTER) \
			test/*Test.js

test-all: test

.PHONY: test-all