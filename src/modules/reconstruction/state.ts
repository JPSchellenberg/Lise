export default class LineChartState {
	constructor() {
		this.showSettings = false;
		this.settings = {
			General: {
				Zeitdifferenz: 8,
				'Anzahl der Messpunkte': 200
			}
		};
	}

	showSettings: boolean;
	settings: {
		General: {
			Zeitdifferenz: number;
			'Anzahl der Messpunkte': number;
		};
	}
}
