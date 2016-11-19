/// <reference path="../typings/index.d.ts" />

require('file?name=[name].[ext]!./index.html');
require('file?name=[name].[ext]!./assets/js/flotr2.js');
require('file?name=[name].[ext]!./assets/js/x3dom.js');
require('file?name=[name].[ext]!./assets/css/x3dom.css');
import boot from './boot';
declare var window: any;

import * as jquery from 'jquery';
window.$ = window.jQuery = jquery;
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;



boot();