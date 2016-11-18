import * as socket from 'socket.io-client';

const sketch = socket.connect(window.location.href + 'sketch');

export default function() {
	sketch.on('version', (version) => {
		debugger;
	});
}
