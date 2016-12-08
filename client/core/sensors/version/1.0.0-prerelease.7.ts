export default {
	"time": {
		"name": "Time",
		"channel": [{
			"name": "time",
			"unit": "ms",
			"description": "milliseconds since started recording",
			"parameter": []
		}]
	},
	"ads1115": {
		"name": "Adafruit ADS1115",
		"channel": [
			{
				"name": "differential_0_1",
				"unit": "mV",
				"description": "differential voltage between pin 0 and 1",
				"parameter": [
					{
						"name": "gain",
						"command": (gain: number) => { return "gain="+gain; },
						"defaultValue": 1,
						"type": "enum",
						"options": [
							{ "name": "2/3x" },
							{ "name": "1x" },
							{ "name": "2x" },
							{ "name": "4x" },
							{ "name": "8x" },
							{ "name": "16x" }
						]
					}
				]
			},
			{
				"name": "differential_2_3",
				"unit": "mV",
				"description": "differential voltage between pin 2 and 3",
				"parameter": [
					{
						"name": "gain",
						"command": (gain: number) => { return "gainh="+gain; },
						"defaultValue": 1,
						"type": "enum",
						"options": [
							{ "name": "2/3x" },
							{ "name": "1x" },
							{ "name": "2x" },
							{ "name": "4x" },
							{ "name": "8x" },
							{ "name": "16x" }
						]
					}
				]
			}
		]
	},
	"rtc": {
		"name": "Velleman RTC",
		"channel": [{
			"name": "rtc",
			"unit": "s",
			"description": "seconds since 1970 (unixtime)",
			"parameter": []
		}]
	}
};