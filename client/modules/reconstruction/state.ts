export default class LineChartState {
	constructor() {
		this.showSettings = false;
		this.settings = {
			General: {
				Zeitdifferenz: 8,
				'Anzahl der Messpunkte': 200,
				'Kugelradius': 0.1,
				'Farbe': '#2980b9'
			}
		};
	}

	showSettings: boolean;
	settings: {
		General: {
			Zeitdifferenz: number;
			'Anzahl der Messpunkte': number;
			'Kugelradius': number;
			'Farbe': string;
		};
	}
}
