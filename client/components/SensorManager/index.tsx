///<reference path='../../../typings/index.d.ts'/>
import * as React from 'react';
import { connect } from 'react-redux'; 
import * as classnames from 'classnames';

import Modal from './Modal';

import {
	toggle_modal
} from '../../state/sensors/actions';

import {
	write
} from '../../state/serialport/actions';

interface SensorManagerProps {
	sensors?: any;

	connection?: any;
	sketch?: any;

	toggle_modal?: () => void;
	write?: (command: string) => void;
}

interface SensorManagerState {
}

export class SensorManager extends React.Component<SensorManagerProps, SensorManagerState> {
	constructor(props: SensorManagerProps) {
		super(props);
	}

	render() {
		if ( this.props.connection !== null && this.props.sketch !== null ) {
				return (
					<div 
					onClick={() => { this.props.toggle_modal() }}
					className="btn btn-default"> 
						<i className="glyphicon glyphicon-cog"></i> 
						<Modal sketch_version={this.props.sketch.version} write={this.props.write} settings={"test"} toggle_modal={() => { this.props.toggle_modal() }} showModal={this.props.sensors.showModal} sensor_list={this.props.sensors.sensor_list} />
					</div>
			);
		
			
		} else {
			return (<div></div>);
		}
		
	}
};

function mapStateToProps(state): SensorManagerProps {   
    return {   
			sensors: state.sensors,
			connection: state.serialport.connection,
			sketch: state.serialport.sketch
    };
}

function mapDispatchToProps(dispatch) {
  return {
	  toggle_modal: () => dispatch( toggle_modal() ),
	  write: (command) => dispatch ( write(command) )
  };
}

export default connect<SensorManagerProps, {}, {}>(
  mapStateToProps,
  mapDispatchToProps
)(SensorManager);