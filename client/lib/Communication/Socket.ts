import * as EventEmitter from 'eventemitter3';

declare var window: any;

export default window['io'].connect( window.electron ? 'http://localhost:1337' : window.location.href );