/// <reference path="../typings/index.d.ts" />

import* as _debug from 'debug';

var debug = _debug('boot');

debug('loading boot-files');
import boot from './boot';

boot();