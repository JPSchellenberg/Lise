# Client

To understand how the client works you need to understand React and Redux. (See [Techonologies](/docs/Development/README.md))

### Boot

The `/boot` folder contains the booting file that sets up the application. 
Important: It also boots and sets up all websocket-communcation by binding Redux-Store-Dispatch-functions to websocket-events.
For example:
```ts
channel['serialport'].on('update_ports', (ports) => {
	Store.dispatch( updatePorts(ports) );
});
```
### Core

The `/core` folder holds all singleton-instances of core-modules such as the Redux-Store or the Root-Reducer which are required by other parts of the application. 
It also contains the root.tsx which is the root of the application.

### Components

The `/components` folder holds all the internal React components used to build the client.

### State

The `/state` folder holds the structure of the application global state and data flows.