declare var page: any;
declare var window: any;

import Store from './store';

import {
	setPath
} from '../state/page/actions';

export default {
	boot: (cb) => {
		try {
			page('*', function(ctx, next) {
				Store.dispatch(setPath(ctx.path));
			});

			page.start();

			cb('success');
		} catch(err) {
			cb('danger', err);
		}
		
	},
	getName: () => 'Page'
};