export default class LineChartState {
	constructor() {
		this.showSettings = false;
		this.settings = {
			xAxis: new AxisSettings('Time [s]'),
			yAxis: new AxisSettings('Y', -10, 10)
		};
	}

	showSettings: boolean;
	settings: {
		xAxis: AxisSettings;
		yAxis : AxisSettings;
	}
}

class AxisSettings {
	constructor(title: string, min?: number, max?: number) {
		this.title = title;
		this.showLabels = true;
		this.min = min || null;
		this.max = max || null;
	}

	title: string;
	showLabels: boolean;
	min: number;
	max: number;
}

