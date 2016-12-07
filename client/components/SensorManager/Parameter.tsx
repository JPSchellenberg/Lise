///<reference path='../../../typings/index.d.ts'/>
import * as React from 'react';
import * as classnames from 'classnames';

import { Table, FormGroup, ControlLabel, FormControl, InputGroup, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

import sensors from '../../core/sensors';

interface ParameterProps {
	param: any;
	write: (command: string) => void;
}

interface ParameterState {
}

export default class Parameter extends React.Component<ParameterProps, ParameterState> {
	constructor(props: ParameterProps) {
		super(props);

		this.handleSelect = this.handleSelect.bind(this);
	}

	handleSelect(event) {
		this.props.write( this.props.param.command(event.target.value) );
	}

	render() {
		if (this.props.param.type === 'enum') {
			return (
				<FormGroup controlId="formControlsSelect">
      				<ControlLabel>{this.props.param.name}</ControlLabel>
      					<FormControl 
						  onChange={this.handleSelect}
						  componentClass="select" 
						  placeholder="select">
        					{ 
								this.props.param.options.map((opt,index) => 
								<option 
								key={opt.name} 
								value={index}>{opt.name}
								</option>) }
      					</FormControl>
    			</FormGroup>
			);
		} else {
			return <div></div>;
		}
	}
}