import * as socket from 'socket.io-client';
import Store from '../../core/store';

import {
	set_os
} from './actions';

declare var window: any;

const channel = {
	'system': socket.connect(window.location.href + 'system')
};

export default function() {
	channel['system'].on('os', (os) => {
		Store.dispatch( set_os(os) );
	});

}