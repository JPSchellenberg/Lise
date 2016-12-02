import _data from '../../core/data';


let fdata = [];

class ReconstructionData {
	constructor() {
		_data.on('data', this.handleData);
		_data.on('reset', () => {
			fdata = [];
		});

		this.mData = new Array();
	}

	mData: any;
	listeners_xaxis: any;
	listeners_yaxis: Array<string>;
	mChannel_list: Array<any>;

	handleData(data) {
		fdata.push( (data['ads1115'][0]) );
	}

	getData(): Array<number> {
		return fdata;
	}

	setXAxis(sensor: string, channel: number) {
		let a = {};
		a[sensor] = channel;
		this.listeners_xaxis = a; 
	}

	addChannel(sensor: string, channel: number) {

	}

}

export default new ReconstructionData();