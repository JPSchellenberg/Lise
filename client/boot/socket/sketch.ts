import * as socket from 'socket.io-client';
import Store from '../../core/store';
import { update_sketch } from '../../state/sketch/actions';

const sketch: SocketIOClient.Socket = socket.connect(window.location.href + 'sketch');

export default function() {
	sketch.on('version', (version) => {
		Store.dispatch( update_sketch(version) );
	});

	sketch.on('flash', (flash) => {

	});
}
