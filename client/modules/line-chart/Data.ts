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
	}

	mData: any;

	handleData(data) {
		this.mData.forEach( (channel, index) => {
			channel.data.push(  [ (data['time'][0] - _data.recordingStartTime)/1000 , (data[channel.sensor][channel.channel]/1000) ] )
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