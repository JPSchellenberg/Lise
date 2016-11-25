///<reference path='../../../typings/index.d.ts'/>
import * as React from 'react';
import { connect } from 'react-redux'; 
import * as classnames from 'classnames';

import Modal from './Modal';

import {
	toggle_modal
} from '../../state/input/actions';

import {
	write
} from '../../state/serialport/actions';

interface InputManagerProps {
	input?: any;

	toggle_modal?: () => void;
	write?: (command: string) => void;
}

interface InputManagerState {
}

export class InputManager extends React.Component<InputManagerProps, InputManagerState> {
	constructor(props: InputManagerProps) {
		super(props);
	}

	render() {
		if ( this.props.input.status === 'success' ) {
			return (
				<div 
				onClick={() => { this.props.toggle_modal() }}
				className="btn btn-default"> 
					<i className="glyphicon glyphicon-cog"></i> 
					<Modal write={this.props.write} settings={this.props.input.settings} toggle_modal={() => { this.props.toggle_modal() }} showModal={this.props.input.showModal} input_list={this.props.input.input_list} />
				</div>
			);
		} else {
			return (<div></div>);
		}
		
	}
};

function mapStateToProps(state): InputManagerProps {   
    return {   
			input: state.input
    };
}

function mapDispatchToProps(dispatch) {
  return {
	  toggle_modal: () => dispatch( toggle_modal() ),
		write: (command) => dispatch ( write(command) )
  };
}

export default connect<InputManagerProps, {}, {}>(
  mapStateToProps,
  mapDispatchToProps
)(InputManager);