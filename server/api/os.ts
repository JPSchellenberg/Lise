/// <reference path="../../typings/index.d.ts" />
import * as express from 'express';
import * as os from 'os';

export function get_os(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		res.status(200).json({
			"arch": os.arch(),
			"platform": os.platform()
		});
	} catch (err) {
		res.status(503).json(err);
	}
}