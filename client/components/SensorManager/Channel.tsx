///<reference path='../../../typings/index.d.ts'/>
import * as React from 'react';
import * as classnames from 'classnames';

import { Table, FormGroup, ControlLabel, FormControl, InputGroup, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

import sensors from '../../core/sensors';
import Parameter from './Parameter';

interface ChannelProps {
	channel: any;
	write: (command: string) => void;
}

interface ChannelState {
}

export default class Channel extends React.Component<ChannelProps, ChannelState> {
	constructor(props: ChannelProps) {
		super(props);
	}

	render() {
		return (
			<tr>
				<td>{this.props.channel.name}</td>
				<td>{this.props.channel.unit}</td>
				{ this.props.channel.parameter.map(param => <td><Parameter param={param} write={this.props.write} /></td>)}
			</tr>
		);
	}
};