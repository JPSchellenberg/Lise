import * as page from 'page';

import Store from './store';

import {
	setPath
} from '../state/page/actions';

export default function() {
	try {
		page('*', function(ctx, next) {
			Store.dispatch(setPath(ctx.path));
		});

		page.start();
	} catch (err) {}

}