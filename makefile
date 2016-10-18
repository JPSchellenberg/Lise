build:
	make clear
	make copyassets
	NODE_ENV=production VERSION=$(shell git describe) ./node_modules/.bin/webpack -p --config './webpack.production.js' --progress --colors
	./node_modules/.bin/build -m
	cp -r app dist/web

.PHONY: test test-watch
test:
	NODE_ENV=test ./node_modules/.bin/mocha --require ts-node/register --recursive $(TEST_FILES) #./build/**/*.test.js --recursive

test-watch: 
	NODE_ENV=test ./node_modules/.bin/mocha --watch --watch-extensions tsx,ts,test.ts --require ts-node/register --recursive ./src/**/*.test.ts 

copyassets:
	mkdir -p app/
	cp src/index.html app/index.html
	cp ./src/electron/* app/
	cp -r assets/* app/

dev:
	make clear
	make copyassets
	./node_modules/.bin/concurrently "NODE_ENV=development VERSION=$(shell git describe --dirty) ./node_modules/.bin/webpack-dev-server --port 8080 --config './webpack.development.js' --progress --colors" "NODE_ENV=development ./node_modules/.bin/electron ./app"

clear:
	rm -rf dist
	rm -rf app

install:
	npm install

uninstall:
	make clear
	rm -rf node_modules
	rm -rf typings

.PHONY: build clear