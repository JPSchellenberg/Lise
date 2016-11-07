client:
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

openwrt:
	make client
	make server
	mkdir -p dist/openWRT/server
	cp -r build/server dist/openWRT
	cp -r app/ dist/openWRT/app
	cp -r bin/openWRT/ dist/openWRT/bin/
	cp -r lib/openWRT/ dist/openWRT/lib/
	cp script/openWRT/install dist/openWRT/install
	cp server/package.json dist/openWRT/server
	cd dist/openWRT/server; npm install

.PHONY: test test-watch server server-dist openwrt client
test:
	NODE_ENV=test ./node_modules/.bin/mocha --require ts-node/register --recursive $(TEST_FILES) #./build/**/*.test.js --recursive

test-watch: 
	NODE_ENV=test ./node_modules/.bin/mocha --watch --watch-extensions tsx,ts,test.ts --require ts-node/register --recursive ./client/**/*.test.ts 

copyassets:
	mkdir -p build/client
	cp client/index.html build/client/index.html
	cp -r client/assets/* build/client/

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