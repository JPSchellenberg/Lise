DIST_DIR=dist/openWRT/Lise-openWRT-v$(shell git describe)

openwrt:
	DIST_DIR=dist/openWRT/Lise-openWRT-v$(shell git describe)
	# npm run build:server:production
	# mkdir -p dist/server
	# cp server/server.js dist/server/index.js; cp server/package.json dist/server/package.json; cd dist/server/; npm install
	npm run build:client
	mkdir -p dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/resources 
	cp -r dist/client dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/
	# cp -r dist/server dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/
	gzip dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/client/app.js
	gzip dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/client/x3dom.js
	gzip dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/client/flotr2.js
	cp -r resources/openWRT/* dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/resources
	mv dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/resources/install dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/install
	cp docs/Installation/openWRT.md dist/openWRT/Lise-openWRT-v$(shell git describe)/README.md
	mkdir -p dist/openWRT/Lise-openWRT-v$(shell git describe)/sketch
	cp sketch/lise_yun/lise_yun.ino dist/openWRT/Lise-openWRT-v$(shell git describe)/sketch/sketch.ino
	# mv dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/resources/lib/node_modules/serialport dist/openWRT/Lise-openWRT-v$(shell git describe)/openwrt/server/node_modules/
	cd dist/openWRT/Lise-openWRT-v$(shell git describe)/; tar -czf openwrt.tar.gz openwrt/; rm -r openwrt/
	cd dist/openWRT; tar -czf Lise-openWRT-v$(shell git describe).tar.gz Lise-openWRT-v$(shell git describe)/  

openwrt-core:
	make openwrt-clean
	make openwrt-client
	make openwrt-bin
	make openwrt-lib
	make openwrt-etc
	make openwrt-control
	make openwrt-ipk
	cp docs/Installation/openWRT.md $(DIST_DIR)/README.md
	mkdir -p dist/openWRT/Lise-openWRT-v$(shell git describe)/sketch
	cp sketch/lise_yun/lise_yun.ino $(DIST_DIR)/sketch/sketch.ino
	tar czvf dist/Lise-openWRT-v$(shell git describe).tar.gz $(DIST_DIR)

openwrt-clean:
	rm -rf dist/openWRT

openwrt-client:
	npm run build:client
	mkdir -p $(DIST_DIR)/ipk/data/srv/lise
	cp -r dist/client $(DIST_DIR)/ipk/data/srv/lise/
	gzip $(DIST_DIR)/ipk/data/srv/lise/client/app.js
	gzip $(DIST_DIR)/ipk/data/srv/lise/client/x3dom.js
	gzip $(DIST_DIR)/ipk/data/srv/lise/client/flotr2.js

openwrt-bin:
	mkdir -p $(DIST_DIR)/ipk/data/usr/bin
	mkdir -p $(DIST_DIR)/ipk/data/usr/sbin
	# copy specific binaries
	cp resources/openWRT/bin/nginx $(DIST_DIR)/ipk/data/usr/sbin
	cp resources/openWRT/bin/webserial $(DIST_DIR)/ipk/data/usr/bin

openwrt-lib:
	mkdir -p $(DIST_DIR)/ipk/data/usr/lib
	cp resources/openWRT/lib/libstdc++.so.6 $(DIST_DIR)/ipk/data/usr/lib
	cp resources/openWRT/lib/libstdc++.so.6.0.16 $(DIST_DIR)/ipk/data/usr/lib

openwrt-etc:
	mkdir -p $(DIST_DIR)/ipk/data/etc
	# init.d
	mkdir -p $(DIST_DIR)/ipk/data/etc/init.d
	mkdir -p $(DIST_DIR)/ipk/data/etc/rc.d
	# copy specific config-files
	cp resources/openWRT/etc/init.d/nginx $(DIST_DIR)/ipk/data/etc/init.d
	cp resources/openWRT/etc/init.d/webserial $(DIST_DIR)/ipk/data/etc/init.d
	# inittab
	# cp resources/openWRT/etc/inittab $(DIST_DIR)/ipk/data/etc
	# nginx-config
	cp -r resources/openWRT/etc/nginx $(DIST_DIR)/ipk/data/etc

openwrt-ipk:
	cd $(DIST_DIR)/ipk/data; tar -czvf ../data.tar.gz *;
	rm -r $(DIST_DIR)/ipk/data
	cd $(DIST_DIR)/ipk/control; tar czvf ../control.tar.gz *;
	rm -r $(DIST_DIR)/ipk/control
	echo 2.0 > $(DIST_DIR)/ipk/debian-binary
	ar r $(DIST_DIR)/Lise-core-v$(shell git describe).ipk $(DIST_DIR)/ipk/control.tar.gz $(DIST_DIR)/ipk/data.tar.gz  $(DIST_DIR)/ipk/debian-binary
	rm -r $(DIST_DIR)/ipk

openwrt-control:
	mkdir -p $(DIST_DIR)/ipk/control
	cp resources/openWRT/control/* $(DIST_DIR)/ipk/control

PHONY: openwrt