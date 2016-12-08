///<reference path='../../../typings/index.d.ts'/>
import * as React from 'react';
import { connect } from 'react-redux'; 
import * as classnames from 'classnames';

import { Alert, Col, Modal, Table, FormGroup, ControlLabel, FormControl, InputGroup, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

import Sensor from './Sensor';
import _sensors from '../../core/sensors';

interface SensorManagerModalProps {
	sketch_version: string;
	showModal: boolean;
  sensor_list: Array<string>;
	toggle_modal: () => void;
  settings: any;
  write: (command: string) => void;
}

interface SensorManagerModalState {
	samplerate: number;
}

export default class SensorManagerModal extends React.Component<SensorManagerModalProps, SensorManagerModalState> {
	constructor(props: SensorManagerModalProps) {
		super(props);

    this.state = {
      samplerate: 20
    };

    this.handleInput = this.handleInput.bind(this);
	}

  handleInput(event) {
    this.setState({ samplerate: event.target.value });
  }

	render() {
		return (
			<Modal show={this.props.showModal} onHide={this.props.toggle_modal}>
			<div>  
				<div className="modal-header">
        			<button 
					onClick={this.props.toggle_modal}
					type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        				<h4 className="modal-title" id="myModalLabel">Sensor Einstellungen</h4>
  				</div>
      			<div className="modal-body">
              { _sensors[this.props.sketch_version] 
								? 
								this.props.sensor_list.map(sensor => <Sensor sketch_version={this.props.sketch_version} sensor={sensor} write={this.props.write} />) 
								:
								<Alert bsStyle="danger">
  								<h4>No sensorlist found for {this.props.sketch_version}</h4>
         					<p>The Arduino runs a sketch with version {this.props.sketch_version} which is not supported. Please update the sketch to the latest version.</p>
        				</Alert>
						}
							<Panel header="Samplerate">
									<FormGroup controlId="formHorizontalEmail">
      							<Col componentClass={ControlLabel} sm={2}>
        						Samplerate
      							</Col>
      							<Col sm={10}>
        							<FormControl 
											value={this.state.samplerate} 
											onChange={this.handleInput} 
											onBlur={() => { this.props.write('samplerate='+this.state.samplerate)}}
											type="number" />
      							</Col>
    							</FormGroup>
							</Panel>
				    </div>
 				<div className="modal-footer">
				 <button type="button" className="btn btn-danger" onClick={this.props.toggle_modal}>Abbrechen</button>
        		 <button onClick={() => { this.props.toggle_modal(); }
             } type="button" className="btn btn-success">Speichern</button>
      			</div>
			</div>
		</Modal>);
	}
};