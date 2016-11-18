/// <reference path="../typings/index.d.ts" />

import boot from './boot';
declare var window: any;

import * as jquery from 'jquery';
window.$ = window.jQuery = jquery;
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;



boot();