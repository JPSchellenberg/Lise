export default class LineChartState {
	constructor() {
		this.showSettings = false;
		this.settings = {
			General: {
				title: ''
			},
			XAxis: new AxisSettings('Time [s]'),
			YAxis: new AxisSettings('Y', -10, 10)
		};
	}

	showSettings: boolean;
	settings: {
		General: {};
		XAxis: AxisSettings;
		YAxis : AxisSettings;
	}
}

class AxisSettings {
	constructor(title: string, min?: number, max?: number) {
		this.title = title;
		this.showLabels = true;
		this.min = min || null;
		this.max = max || null;
		this.titleAngle = 0;
	}

	title: string;
	showLabels: boolean;
	min: number;
	max: number;
	titleAngle: number;
}

