build:
	make clear
	make copyassets
	NODE_ENV=production VERSION=$(shell git describe) ./node_modules/.bin/webpack -p --config './webpack.js' --progress --colors

yun:
	make build
	mkdir -p dist/yun
	cp -r client/server/yun/* dist/yun
	cp -r app dist/yun
	cd dist/yun; npm install

mac:
	make build
	./node_modules/.bin/build -m

server:
	./node_modules/.bin/tsc server/index.ts --sourceMap --inlineSources --module commonjs --outDir build/server

server-dist:
	make clear
	make server
	mkdir -p dist/server
	cp -r build/server dist/
	cp -r sketch/hex dist/server
	rsync -r ~/dev/lise/dist/server/ root@arduino.local:/mnt/sda1/srv/node/lise/server

.PHONY: test test-watch server server-dist
test:
	NODE_ENV=test ./node_modules/.bin/mocha --require ts-node/register --recursive $(TEST_FILES) #./build/**/*.test.js --recursive

test-watch: 
	NODE_ENV=test ./node_modules/.bin/mocha --watch --watch-extensions tsx,ts,test.ts --require ts-node/register --recursive ./client/**/*.test.ts 

copyassets:
	mkdir -p app/
	cp client/index.html app/index.html
	cp ./client/electron/* app/
	cp -r assets/* app/

dev:
	make clear
	make copyassets
	NODE_ENV=development VERSION=$(shell git describe --dirty) ./node_modules/.bin/webpack-dev-server --port 8080 --config './webpack.js' --progress --colors

clear:
	rm -rf dist
	rm -rf build

install:
	npm install

uninstall:
	make clear
	rm -rf node_modules
	rm -rf typings

.PHONY: build clear