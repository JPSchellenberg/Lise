///<reference path='../../../typings/index.d.ts'/>
import * as React from 'react';
import * as classnames from 'classnames';

import { Alert, Button, Table, FormGroup, ControlLabel, FormControl, InputGroup, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

import Channel from './Channel';
import _sensors from '../../core/sensors';

interface SensorProps {
	sensor: string;
	sketch_version: string;
	write?: (command: string) => void;
}

interface SensorState {
}

export default class Sensor extends React.Component<SensorProps, SensorState> {
	constructor(props: SensorProps) {
		super(props);
	}

	render() {
			return (
				<Panel header={_sensors[this.props.sketch_version][this.props.sensor].name}>
					<Table striped bordered condensed hover>
						<thead>
							<tr>
								<th>Name</th>
								<th>Unit</th>
								<th>Settings</th>
							</tr>
						</thead>
						<tbody>
						{ _sensors[this.props.sketch_version][this.props.sensor].channel.map(channel => <Channel channel={channel} write={this.props.write} />) }
						</tbody>
					</Table>
				</Panel>);
		
		
	}
};