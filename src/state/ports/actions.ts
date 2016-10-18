import {
	PORTS_UPDATEPORTS,
	PORTS_SELECTPORT,
	PORTS_CONNECTIONSTATUS,
	PORTS_CONNECTIONINFO
} from '../action-types';

export function updatePorts(ports: any) {
	return {
		type: PORTS_UPDATEPORTS,
		ports
	}
}

export function selectPort(comName: string) {
	return {
		type: PORTS_SELECTPORT,
		comName
	}
}

export function connectionStatus(status: string) {
	return {
		type: PORTS_CONNECTIONSTATUS,
		status
	}
}

export function connectionInfo(info: any) {
	return {
		type: PORTS_CONNECTIONINFO,
		info
	}
}