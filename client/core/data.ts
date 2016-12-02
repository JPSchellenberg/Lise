import * as EventEmitter from 'eventemitter3';
import * as socketio	 from 'socket.io-client';


class Data extends EventEmitter {
	constructor() {
		super();

		this.connection = socketio.connect( window.location.href + 'serialport' );

		this.connection.on('data', (data) => {
				if (this.mRecordingStartTime === null) { this.mRecordingStartTime = data.time[0] }
				if (this.mRecording) {
					this.emit('data', data);
				}
				
		});

		this.mRecording = false;
		this.mRecordingStartTime = null;

	}

	private connection: SocketIOClient.Socket;
	private mRecording: boolean;
	private mRecordingStartTime: number;

	public startRecording() { this.mRecording = true; this.emit('start'); }
	public stopRecording() { this.mRecording = false; this.mRecordingStartTime = null; this.emit('stop'); }
	public get recordingStartTime(): any { return this.mRecordingStartTime; }
	public reset() { this.stopRecording() ; this.emit('reset'); }
}

export default new Data();