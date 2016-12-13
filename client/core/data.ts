import * as EventEmitter from 'eventemitter3';
import * as socketio	 from 'socket.io-client';


class Data extends EventEmitter {
	constructor() {
		super();

		this.connection = socketio.connect( window.location.href );

		this.connection.on('data', (data) => {
				if (this.mRecording) {
					data = data.split(" ");
					if (this.mRecordingStartTime === null) { this.mRecordingStartTime = JSON.parse(data[1]).time[0] }
					this.emit(data[0], JSON.parse(data[1]));
					
					// this.emit('data', data);
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