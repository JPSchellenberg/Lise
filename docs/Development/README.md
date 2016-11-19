# Getting Started

## Setup development

1.	Make sure you have `git`, `node` and `npm` installed. See [Software](/docs/Development/Software.md)
2.	Clone this repository locally with `git clone https://github.com/JPSchellenberg/Lise.git`
3.	Run `npm install` in your local folder.
4.  Start the client-webpack-development-server with `npm run dev`.
5.  Build the main-server with `npm run build:server`. For information on how to start and debug the server via Visual Studio Code see [Server](/docs/Development/Server.md).
6.  Start the main-server with `node build/server`.
5.	Open `http://localhost:8080` in your browser.

## Technologies

### Client

* [redux](http://redux.js.org)
* [react](https://facebook.github.io/react/)

### Server
* [express](http://expressjs.com)
* [socket.io](http://socket.io)
* [event-emitter](https://nodejs.org/api/events.html)

### Serialport and communication with Arduino
* [serialport](https://github.com/EmergingTechnologyAdvisors/node-serialport)

### Development
* [webpack](http://webpack.github.io)
* [typescript](https://www.typescriptlang.org)

### Desktop
* [electron](http://electron.atom.io)
