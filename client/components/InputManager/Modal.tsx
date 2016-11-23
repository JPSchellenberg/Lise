///<reference path='../../../typings/index.d.ts'/>
import * as React from 'react';
import { connect } from 'react-redux'; 
import * as classnames from 'classnames';

import { Modal, Table, FormGroup, ControlLabel, FormControl, InputGroup } from 'react-bootstrap';

import { 
	Input 
} from '../../lib/Input';

interface InputManagerModalProps {
	showModal?: boolean;
	input_list?: Array<Input>;
	toggle_modal?: () => void;
}

interface InputManagerModalState {
}

export default class InputManagerModal extends React.Component<InputManagerModalProps, InputManagerModalState> {
	constructor(props: InputManagerModalProps) {
		super(props);
	}

	render() {
		return (
			<Modal show={this.props.showModal} onHide={this.props.toggle_modal}>
			<div>  
				<div className="modal-header">
        			<button 
					onClick={this.props.toggle_modal}
					type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        				<h4 className="modal-title" id="myModalLabel">Input Einstellungen</h4>
  				</div>
      			<div className="modal-body">
				<Table striped bordered condensed hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Input</th>
        <th>Settings</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>ADS1115 Channel 1</td>
        <td><FormGroup controlId="formControlsSelect">
      <ControlLabel>Gain</ControlLabel>
      <FormControl componentClass="select" placeholder="select">
        <option value="g0">2/3x</option>
        <option value="g1">1x</option>
		<option value="g2">2x</option>
		<option value="g3">4x</option>
		<option value="g4">8x</option>
		<option value="g5">16x</option>
      </FormControl>
    </FormGroup></td>
      </tr>
      <tr>
        <td>2</td>
        <td>ADS1115 Channel 2</td>
        <td><FormGroup controlId="formControlsSelect">
      <ControlLabel>Gain</ControlLabel>
      <FormControl componentClass="select" placeholder="select">
        <option value="h0">2/3x</option>
        <option value="h1">1x</option>
		<option value="h2">2x</option>
		<option value="h3">4x</option>
		<option value="h4">8x</option>
		<option value="h5">16x</option>
      </FormControl>
    </FormGroup></td>
      </tr>
    </tbody>
  </Table>

  <Table striped bordered condensed hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Settings</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Samplerate</td>
        <td><FormGroup>
      <InputGroup>
        <FormControl type="number" />
        <InputGroup.Addon>1/s</InputGroup.Addon>
      </InputGroup>
    </FormGroup></td>
      </tr>
    </tbody>
  </Table>
				</div>
 				<div className="modal-footer">
				 <button type="button" className="btn btn-danger" onClick={this.props.toggle_modal}>Abbrechen</button>
        		 <button type="button" className="btn btn-success">Speichern</button>
      			</div>
			</div>
		</Modal>);
	}
};