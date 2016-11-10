client:
	make copyassets
	NODE_ENV=production VERSION=$(shell git describe) ./node_modules/.bin/webpack -p --config './webpack.js' --progress --colors

server:
	./node_modules/.bin/tsc server/index.ts --sourceMap --inlineSources --module commonjs --target es5 --outDir build/server
	mkdir -p build/server/hex
	cp sketch/hex/* build/server/hex/
	# ./node_modules/.bin/tsc server/index.ts --project tsconfig.json --outDir build/server

electron:
	cp electron/* build/

mac:
	make clear
	make client
	make server
	cp electron/* build/
	mv build app
	./node_modules/.bin/build -m

openwrt:
	make client
	make server
	mkdir -p dist/openWRT/server
	cp -r build/server dist/openWRT
	cp -r build/client/ dist/openWRT/client
	cp -r bin/openWRT/ dist/openWRT/bin/
	cp -r lib/openWRT/ dist/openWRT/lib/
	mkdir -p dist/openWRT/sketch/
	cp sketch/ino/adafruit_differential_yun/adafruit_differential_yun.ino dist/openWRT/sketch/sketch.ino
	cp script/openWRT/install dist/openWRT/install
	cp server/package.json dist/openWRT/server
	cd dist/openWRT/server; npm install

.PHONY: test test-watch server server-dist openwrt client electron
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
	rm -rf app

install:
	npm install

uninstall:
	make clear
	rm -rf node_modules
	rm -rf typings

.PHONY: build clear