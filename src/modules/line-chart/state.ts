export class TimeSeriesState {
	constructor() {
		this.showSettings = false;
		this.xAxisTitle = 'Time [s]';
		this.yAxisTitle = 'y';
		this.yAxisMin = -10;
		this.yAxisMax = 10;
		this.width = "100%";
		this.height = "100%";

	}

	showSettings: boolean;
	xAxisTitle: string;
	yAxisTitle: string;
	yAxisMin: number;
	yAxisMax: number;
	width: string;
	height: string;
}