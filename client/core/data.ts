import * as EventEmitter from 'eventemitter3';
import * as socketio	 from 'socket.io-client';


class Data extends EventEmitter {
	constructor() {
		super();

		this.connection = new WebSocket( 'ws://'+window.location.hostname+':3001');

		this.connection.onmessage = (data) => {
				if (this.mRecording) {
					data = data.data.split(" ");
					if (this.mRecordingStartTime === null) { this.mRecordingStartTime = JSON.parse(data[1]).time[0] }
					this.emit(data[0], JSON.parse(data[1]));
				}
		}

		this.mRecording = false;
		this.mRecordingStartTime = null;

	}

	private connection: WebSocket;
	private mRecording: boolean;
	private mRecordingStartTime: number;

	public startRecording() { this.mRecording = true; this.emit('start'); }
	public stopRecording() { this.mRecording = false; this.mRecordingStartTime = null; this.emit('stop'); }
	public get recordingStartTime(): any { return this.mRecordingStartTime; }
	public reset() { this.stopRecording() ; this.emit('reset'); }
}

export default new Data();