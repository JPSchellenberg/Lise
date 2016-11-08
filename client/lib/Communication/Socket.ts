import * as socketio from 'socket.io-client';
export default socketio.connect( window.location.href );