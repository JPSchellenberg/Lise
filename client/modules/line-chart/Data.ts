import _data from '../../core/data';

class LineChartData {
	constructor() {
		_data.on('data', (data) => { this.handleData(data) });
		_data.on('reset', () => {
			this.mData.forEach( (channel, index) => {
				channel.data = [];
			});
		});

		this.mData = new Array();

		this.addChannel('ads1115', 'Differential 1', 0);
		this.addChannel('ads1115', 'Differential 2', 1);
	}

	mData: any;

	handleData(data) {
		this.mData.forEach( (channel, index) => {
			channel.data.push(  [ (data['time'][0] - _data.recordingStartTime)/1000 , (data[channel.sensor][channel.channel]/1000) ] )
			if (channel.data.length > 300) { channel.data.shift(); }
		});
	}

	getData() {
		return this.mData;
	}

	addChannel(sensor: string, label: string, channel: number) {
		this.mData.push({
			data: [],
			label: label,
			channel: channel,
			sensor: sensor
		});
	}

}

export default new LineChartData();