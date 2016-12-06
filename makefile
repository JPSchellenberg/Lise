openwrt:
	npm run build:server:production
	npm run build:client
	rm -r dist/openWRT
	mkdir -p dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/resources 
	cp -r dist/client dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/
	cp -r dist/server dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/
	gzip dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/client/app.js
	gzip dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/client/x3dom.js
	gzip dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/client/flotr2.js
	cp -r resources/openWRT/* dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/resources
	mv dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/resources/install dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/install
	cp docs/Installation/openWRT.md dist/openWRT/Lise-openWRT-v$(shell git describe)/README.md
	mkdir -p dist/openWRT/Lise-openWRT-v$(shell git describe)/sketch
	cp sketch/lise_yun/lise_yun.ino dist/openWRT/Lise-openWRT-v$(shell git describe)/sketch/sketch.ino
	mv dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/resources/lib/node_modules/serialport dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/server/node_modules/
	cd dist/openWRT/Lise-openWRT-v$(shell git describe)/; tar -czf openwrt.tar.gz openwrt/; rm -r openwrt/
	cd dist/openWRT; tar -czf Lise-openWRT-v$(shell git describe).tar.gz Lise-openWRT-v$(shell git describe)/  

.PHONY: openwrt