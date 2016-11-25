# Structure

The basic structure consists of the client and the server. The client communicates with the server via http and websockets (socket.io). 
When running the Desktop-App electron starts a local webserver (express-server) and an electron-chrome-browser which displays the webpage delivered by the webserver.

When developing the app you spawn an client-development-server for the client which uses hot-loading to update changes. 
It is important to distinguish between the client-development-server, which uses webpack-development-server, and the express-webserver. 

* client-development-server: http-server to display client on `localhost:8080` with instant updates. This server proxies all api-request to `/api/v0` and `/socket.io` to `localhost:3000`.
* express-server: api-server. 