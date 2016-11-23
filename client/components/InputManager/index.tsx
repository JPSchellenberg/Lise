///<reference path='../../../typings/index.d.ts'/>
import * as React from 'react';
import { connect } from 'react-redux'; 
import * as classnames from 'classnames';

import Modal from './Modal';

import {
	toggle_modal
} from '../../state/input/actions';

interface InputManagerProps {
	input?: any;

	toggle_modal?: () => void;
}

interface InputManagerState {
}

export class InputManager extends React.Component<InputManagerProps, InputManagerState> {
	constructor(props: InputManagerProps) {
		super(props);
	}

	render() {
		if ( this.props.input.status === 'ok' ) {
			return (
				<div 
				onClick={() => { this.props.toggle_modal() }}
				className="btn btn-default"> 
					<i className="glyphicon glyphicon-cog"></i> 
					<Modal toggle_modal={() => { this.props.toggle_modal() }} showModal={this.props.input.showModal} input_list={this.props.input.input_list} />
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
	  toggle_modal: () => dispatch( toggle_modal() )
  };
}

export default connect<InputManagerProps, {}, {}>(
  mapStateToProps,
  mapDispatchToProps
)(InputManager);