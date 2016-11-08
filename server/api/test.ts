import * as express 		from 'express';

import test 				from '../core/test';

export function get_test(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		res.status(200).end( test.test );
	} catch (err) {
		res.json(err);
	}
}

export function post_test(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		test.test = req.body.test;
		res.status(200).end( test.test );
	} catch (err) {
		res.json(err);
	}
}